import React, { useMemo } from "react";
import { Checkbox } from "carbon-components-react";

import dynamic from 'next/dynamic'
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { FocusFields, closeModal, submitModal, updateModal } from "@/redux/formSlice";
import { Choice } from "@/type";
const ModalWrapper = dynamic(import('carbon-components-react').then(mod => mod.Modal), { ssr: false }) // disable ssr

const MultiplesEssentialExpensesFields = ({selections}: {selections: Choice[]}) => {

    const { modal } = useSelector((state: RootState) => state.form);
    const dispatch = useDispatch();

    const title = useMemo(() => {
        if (!modal) return "";
        const name: FocusFields = modal.name as any;
        switch(name) {
            case "fixedIncome":
                return "Active income";
            case "passiveIncome":
                return "Passive income";
            case "expenses":
                return "Essential expenses";
            case "nonExpenses":
                return "Non-essential expenses";
            default:
                return "";
        }
    },[modal]);
    return <div >
        <ModalWrapper
            className="modal-wrapper"
            modalHeading={`Add multiples ${title.toLocaleLowerCase()} fields`}
            primaryButtonText="Add"
            secondaryButtonText="Cancel"
            onRequestSubmit={e => {
                dispatch(submitModal());
            }}
            onSecondarySubmit={e => dispatch(closeModal())}
            onRequestClose={e => dispatch(closeModal())}
            open={modal != null}
        >
            <div></div>
            <p className="block body-01 pt-1 pb-4 sticky left-0 top-[4px] bg-background z-10">Remaining fields: {modal ? modal.remain: 0}</p>
            <p className="pb-6">Select the {title.toLocaleLowerCase()} name that you want to add</p>
            <div>
                {modal !== null && <fieldset className="cds--fieldset">
                    <legend className="cds--label label-02">Suggestion</legend>
                    {selections.map((field, index) => {
                        const foundedIndex = modal.items.findIndex(i => i.id === field.id);
                        const shouldDisabled = modal.disabledList.findIndex(i => i.id ===field.id) >= 0;
                        return <Checkbox 
                        key={index}
                        disabled = {(modal.remain === 0 && foundedIndex === -1) || shouldDisabled}
                        onChange={ (_: React.ChangeEvent<HTMLInputElement>, data: {
                            checked: boolean;
                            id: string;
                        }) => {
                            dispatch(updateModal({
                                item: {
                                    checked: data.checked,
                                    id: field.id,
                                    name: field.name
                                },
                                checked: data.checked
                            }));
                        }}
                        labelText={field.name} 
                        id={field.id + ""} />
                    })}
                </fieldset>}
            </div>
        </ModalWrapper>
    </div>
}


export default MultiplesEssentialExpensesFields;
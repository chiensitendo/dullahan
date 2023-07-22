import React from "react";
import { Checkbox } from "carbon-components-react";

import dynamic from 'next/dynamic'
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { closeModal, submitModal, updateModal } from "@/redux/formSlice";
import { Choice } from "@/type";
const ModalWrapper = dynamic(import('carbon-components-react').then(mod => mod.Modal), { ssr: false }) // disable ssr

const MultiplesEssentialExpensesFields = ({selections}: {selections: Choice[]}) => {

    const { modal } = useSelector((state: RootState) => state.form);
    const dispatch = useDispatch();
    return <div >
        <ModalWrapper
            className="modal-wrapper"
            modalHeading="Add multiples essential expenses fields"
            primaryButtonText="Add"
            secondaryButtonText="Cancel"
            onRequestSubmit={e => {
                dispatch(submitModal());
            }}
            onSecondarySubmit={e => dispatch(closeModal())}
            onRequestClose={e => dispatch(closeModal())}
            open={modal != null}
        >
            <p className="block body-01 mt-1 mb-4">Remaining fields: {modal ? modal.remain: 0}</p>
            <p className="pb-6">Select the expenses name that you want to add</p>
            <div>
                {modal !== null && <fieldset className="cds--fieldset">
                    <legend className="cds--label label-02">Suggestion</legend>
                    {selections.map((field, index) => {
                        const foundedIndex = modal.items.findIndex(i => i.id === field.id);

                        return <Checkbox 
                        key={index}
                        disabled = {modal.remain === 0 && foundedIndex === -1}
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
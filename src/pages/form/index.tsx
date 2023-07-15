import CustomTabs, { TabProps } from "@/components/CustomTabs";
import FinancialInformation from "@/components/financial-information";
import MultiplesEssentialExpensesFields from "@/components/financial-information/multiplesEssentialExpensesFields";
import SummaryInfo from "@/components/information/summary-info";
import withAuth from "@/components/with-auth";
import withLoading from "@/components/with-loading";
import { RootState } from "@/redux/store";
import { SECTION_TABS, setIsAdvanceAction } from "@/redux/tabSlice";
import { Toggle } from "carbon-components-react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


const tabs: TabProps[] = [
    {
        name: "Income",
        isActive: true,
        id: SECTION_TABS.INCOME
    },
    {
        name: "Expenses",
        isActive: false,
        id: SECTION_TABS.EXPENSE
    },
    {
        name: "Current balance",
        isActive: false,
        id: SECTION_TABS.CURRENT_BALANCE
    },
    {
        name: "Debt",
        isActive: false,
        id: SECTION_TABS.DEBT
    }
]

const AdvanceOption = ({ checked, onToggle }: { checked: boolean, onToggle: (checked: boolean) => void }) => {
    return <Toggle
        aria-label="toggle button"
        // defaultToggled
        id="toggle-advance-option"
        labelText="Show advanced action"
        labelA=""
        labelB=""
        toggled={checked}
        onToggle={(checked, id, event) => {
            onToggle(checked);
        }}
    />
}



const HomePage: NextPage = (props) => {
    const {authData, loading} = props as any;

    const { form, tab } = useSelector((state: RootState) => state);
    const {code} = form;
    const dispatch = useDispatch();
    const {push} = useRouter();
    const handleOnToggle = (checked: boolean) => {
        dispatch(setIsAdvanceAction(checked));
    }

    // useEffect(() => {
    //     window.onbeforeunload = function(){
    //         return '';
    //       };
    //       window.close = function(){
    //         return '';
    //        };
    // }, []);

    useEffect(() => {
        if (code) {
            push("/info?code=" + code);
        }
    },[code, push]);

    return <div className="h-full w-full bg-background">
        <div className="sticky top-16 left-0 w-full flex items-center justify-center z-10">
            <div className="h-container h-container-no-padding bg-white py-5 px-8">
                <p className="heading-03">Personal financial information</p>
            </div>
        </div>
        <div className="cds--grid h-container py-8">
            <div className="adv-action mobile"><AdvanceOption 
            checked={tab.isAdvanceAction} 
            onToggle={handleOnToggle} /></div>
            <div className="cds--row flex justify-center relative">
                <div className="cds--col-max-4 cds--col-xlg-4 cds--col-lg-4 cds--col-md-0 cds--col-sm-0 sticky left-0 pl-0 pt-6 h-fit"
                    style={{ top: (68 + 64), height: 'calc(100vh - 68px - 64px - 2rem)' }}>
                    <CustomTabs items={tabs} activeTab={tab.activeTab} />
                    <div className="summary-adv-action adv-action large"><AdvanceOption 
                    checked={tab.isAdvanceAction} 
                    onToggle={handleOnToggle} /></div>
                </div>
                <div className="cds--col-max-8 cds--col-xlg-8 cds--col-lg-8 cds--col-md-6 cds--col-sm-3 bg-white">
                    <FinancialInformation form={form} isAdvanceAction={tab.isAdvanceAction} auth={authData} 
                    loading = {loading} />
                    <MultiplesEssentialExpensesFields />
                </div>
                <div className="cds--col-max-4 cds--col-xlg-4 cds--col-lg-4 cds--col-md-2 cds--col-sm-1 sticky right-0 h-fit"
                    style={{ top: 'calc(68px + 64px + 32px)', paddingLeft: 0, paddingRight: 0 }}>
                    <SummaryInfo />
                </div>
            </div>
        </div>
    </div>
}

export default withLoading(withAuth(HomePage));
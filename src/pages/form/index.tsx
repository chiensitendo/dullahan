import CustomTabs, { TabProps } from "@/components/CustomTabs";
import WarningModal from "@/components/WarningModal";
import FinancialInformation from "@/components/financial-information";
import MultiplesEssentialExpensesFields from "@/components/financial-information/multiplesEssentialExpensesFields";
import SummaryInfo from "@/components/information/summary-info";
import withAuth from "@/components/with-auth";
import withLoading from "@/components/with-loading";
import { clearForm } from "@/redux/formSlice";
import { RootState } from "@/redux/store";
import { SECTION_TABS } from "@/redux/tabSlice";
import { Toggle } from "carbon-components-react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


const tabs: TabProps[] = [
    {
        name: "Current balance",
        isActive: false,
        id: SECTION_TABS.CURRENT_BALANCE
    },
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
    const {authData, loading, setIsNew} = props as any;

    const { form, tab, notification } = useSelector((state: RootState) => state);
    const {code, selections, isChanged} = form;
    const {codeModal} = notification;
    const {isSuccess} = codeModal;
    const dispatch = useDispatch();
    const {push} = useRouter();

    useEffect(() => {
        if (code) {
            setIsNew(false);
            push("/result");
            dispatch(clearForm());
        }
    },[code, push, setIsNew, dispatch]);

    useEffect(() => {
        
        let listenter: any = null;
          if (isChanged) {
            listenter = function (e: any) {
                // Cancel the event
                e.preventDefault(); // If you prevent default behavior in Mozilla Firefox prompt will always be shown
                // Chrome requires returnValue to be set
                e.returnValue = '';
              };
              window.addEventListener('beforeunload', listenter);
          }
          if (isSuccess && listenter) {
            window.removeEventListener("beforeunload", listenter);
          }
        return () => {
            if (listenter) {
                window.removeEventListener("beforeunload", listenter);
            }
        }
    },[isChanged, isSuccess]);


    return <div className="h-full w-full bg-background">
        <div className="sticky top-16 left-0 w-full flex items-center justify-center z-10">
            <div className="w-full h-container-no-padding bg-white py-5 px-8">
                <p className="heading-03">Input your current financial information</p>
            </div>
        </div>
        <div className="cds--grid h-container py-8">
            <div className="cds--row flex justify-center relative">
                <div className="cds--col-max-4 cds--col-xlg-4 cds--col-lg-4 cds--col-md-0 cds--col-sm-0 sticky left-0 pl-0 pt-6 h-fit"
                    style={{ top: (68 + 64), height: 'calc(100vh - 68px - 64px - 2rem)' }}>
                    <CustomTabs items={tabs} activeTab={tab.activeTab} />
                </div>
                <div className="cds--col-max-8 cds--col-xlg-8 cds--col-lg-8 cds--col-md-6 cds--col-sm-3 bg-white">
                    <FinancialInformation form={form} auth={authData} />
                    <MultiplesEssentialExpensesFields selections={selections} />
                </div>
                <div className="cds--col-max-4 cds--col-xlg-4 cds--col-lg-4 cds--col-md-2 cds--col-sm-1 sticky right-0 h-fit"
                    style={{ top: 'calc(68px + 64px + 32px)', paddingLeft: 0, paddingRight: 0 }}>
                    <SummaryInfo />
                </div>
            </div>
        </div>
        <WarningModal/>
    </div>
}

export default withLoading(withAuth(HomePage));
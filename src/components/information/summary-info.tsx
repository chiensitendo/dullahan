import { numberWithCommas } from "@/pages/result";
import {
  CurrentBalance,
  DebtData,
  ExpenseData,
  IncomeData,
} from "@/redux/formSlice";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

const SummaryInfoItemValue = (props: { value?: string }) => (
  <p className={`heading-03 ${!props.value ? 'text-placeholder': 'text-black'} break-words`}>
    ${!props.value ? "--" : props.value}
  </p>
);

const SummaryInfoItem = (props: SummaryInfoItemProps) => {
  const { title, child, value } = props;
  
  return (
    <div className="mb-6">
      <p className="label-02 mb-2">{title}</p>
      {!child && <SummaryInfoItemValue value={!value || isNaN(+value) ? undefined:  numberWithCommas(+value)} />}
      {child && (
        <div className="flex justify-between flex-wrap summary-info-item-wrap-child">
          {child.map((item, index) => {
            return (
              <div key={index} className="pr-4 summary-info-item-child">
                <p className="label-01">{item.title}</p>
                <SummaryInfoItemValue value={!item.value || isNaN(+item.value) ? undefined:  numberWithCommas(+item.value)} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

interface SummaryInfoItemProps {
  title: string;
  value?: string;
  child?: Summaryitem[];
}

interface Summaryitem {
  title: string;
  value?: string;
}

const SummaryInfo = () => {
  const {
    fixedIncome,
    passiveIncome,
    expenses,
    nonExpenses,
    currentBalance,
    debts
  } = useSelector((state: RootState) => state.form);
  return (
    <div className="w-full">
      <div>
        <p className="heading-01 text-white p-4 background">Summary</p>
      </div>
      <div className="p-4">
        <SummaryInfoItem
          title="Income"
          child={[
            { title: "Fixed income", value: getIncomeSummary(fixedIncome) },
            { title: "Passive income", value: getIncomeSummary(passiveIncome) },
          ]}
        />
        <SummaryInfoItem
          title="Expenses"
          child={[
            { title: "Essential expenses", value: getExpenseSummary(expenses) },
            {
              title: "Non-essential expenses",
              value: getExpenseSummary(nonExpenses),
            },
          ]}
        />
        <SummaryInfoItem
          title="Current balance"
          value={getCurrentBalance(currentBalance)}
        />
        <SummaryInfoItem
          title={`Debt${
            debts.length === 0 ? "" : ` (Total of ${debts.length})`
          }`}
          child={[
            { title: "Debt paid off each month", value: getDebtMonth(debts) },
            {
              title: "Interest paid off each month",
              value: getInterestPaid(debts),
            },
          ]}
        />
      </div>
    </div>
  );
};

const getIncomeSummary = (items: IncomeData[]): string => {
  const filteredItems = items
  .filter((item) => !!item.amount)
  .map((item) => item.amount)
  .filter((amount) => !isNaN(+amount));

  if (filteredItems.length === 0) return "--";
  return filteredItems
    .reduce((accumulator, currentValue) => accumulator + +currentValue, 0)
    .toFixed(0)
    .toString();
};

const getExpenseSummary = (items: ExpenseData[]): string => {
  const filteredItems = items
  .filter((item) => !!item.amount)
  .map((item) => item.amount)
  .filter((amount) => !isNaN(+amount));
  if (filteredItems.length === 0) return "--";
  return filteredItems
    .reduce((accumulator, currentValue) => accumulator + +currentValue, 0)
    .toFixed(0)
    .toString();
};

const getCurrentBalance = (item: CurrentBalance | undefined): string => {
  if (!item) {
    return "--";
  }
  const { value } = item;
  if (value === undefined || value === null || value === "" || isNaN(+value)) {
    return "--";
  }
  return (+value).toFixed(3).toString();
};

const getDebtMonth = (debts: DebtData[]) => {
  const filteredItems = debts
  .filter((debt) => debt.payment && !isNaN(+debt.payment));
  if (filteredItems.length === 0) return "--";
  return filteredItems
    .reduce(
      (accumulator, currentValue) => accumulator + +currentValue.payment,
      0
    )
    .toFixed(0)
    .toString();
};

const getInterestPaid = (debts: DebtData[]) => {
  const filteredItems = debts
  .filter((debt) => debt.payment && !isNaN(+debt.payment))
  .filter((debt) => debt.annual && !isNaN(+debt.annual));
  if (filteredItems.length === 0) return "--";
  return filteredItems
    .reduce(
      (accumulator, currentValue) =>
        accumulator +
        calculateInterestPaid(+currentValue.payment, +currentValue.annual),
      0
    )
    .toFixed(0)
    .toString();
};

const calculateInterestPaid = (payment: number, annual: number) => {
  return (annual / (12*100)) * payment;
};

export default SummaryInfo;

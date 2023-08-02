import {
  CustomerExpenseCreationData,
  CustomerIncomeCreationData,
  ExpenseType,
  IncomeType,
  UserSeason,
} from "@/type";
import { Close, Edit } from "@carbon/icons-react";
import {
  SideNav,
} from "carbon-components-react";
import React, { LegacyRef, useMemo, useRef } from "react";

const SideMenu = ({
  expanded,
  onExpanded,
  item,
  onEdit
}: {
  item: UserSeason;
  expanded: boolean;
  onExpanded: (expanded: boolean) => void;
  onEdit: () => void;
}) => {
  const ref: LegacyRef<HTMLDivElement> = useRef(null);

  useMemo(() => {
    // if (expanded) {
    //     ref?.current?.focus();
    // }
  }, [ref, expanded]);

  const [expenses, nonExpenses] = useMemo(() => {
    const total: CustomerExpenseCreationData[][] = [[], []];
    if (!item.expenses || item.expenses.length === 0) {
      return total;
    }
    item.expenses.forEach((i) => {
      if (i.type === ExpenseType.EXPENSE) {
        total[0].push(i);
      } else {
        total[1].push(i);
      }
    });
    return total;
  }, [item]);

  const [fixIncome, passiveIncome] = useMemo(() => {
    const total: CustomerIncomeCreationData[][] = [[], []];
    if (!item.incomes || item.incomes.length === 0) {
      return total;
    }
    item.incomes.forEach((i) => {
      if (i.type === IncomeType.FIXED_INCOME) {
        total[0].push(i);
      } else {
        total[1].push(i);
      }
    });
    return total;
  }, [item]);

  return (
    <React.Fragment>
      <SideNav
      isFixedNav
      addMouseListeners={true}
      addFocusListeners={true}
      expanded={expanded}
      isChildOfHeader={false}
      aria-label="Side navigation"
      style={{
        // right: expanded ? "0" : "-28rem",
        right: 0,
        left: "unset",
          zIndex: expanded ? '8000' : '-1',
        width: "100%",
        maxWidth: "28rem",
        overflow: "scroll",
      }}
      onToggle={(e) => {
        onExpanded(e.type === "focus");
      }}
      ref={ref}
    >
      <div className="flex items-center justify-between p-4 result-border-bottom">
        <h3 className="heading-03 text-primary">
          Financial information summary
        </h3>
        <Close className="cursor-pointer fill-text" onClick={() => onExpanded(false)} width={16} height={16} />
      </div>
      <div className="px-6 pb-6">
        <div>
          <div className="flex items-center justify-between pt-6 pb-2">
            <h3 className="heading-03 text-primary">Income</h3>
            <Edit className="cursor-pointer fill-text" width={16} height={16} onClick={() => onEdit()} />
          </div>
          <h4 className="heading-01 text-primary font-semibold pt-4">
            Fixed income
          </h4>
          <div className="side-menu-item">
            <p className="label">Name</p>
            <p className="label">Amount (USD)</p>
          </div>
          {fixIncome.map((value, index) => (
            <div className="side-menu-item" key={index}>
              <p>{value.name}</p>
              <p>{value.amount}</p>
            </div>
          ))}
          <h4 className="heading-01 text-primary font-semibold pt-4">
            Passive income
          </h4>
          <div className="side-menu-item">
            <p className="label">Name</p>
            <p className="label">Amount (USD)</p>
          </div>
          {passiveIncome.map((value, index) => (
            <div className="side-menu-item" key={index}>
              <p>{value.name}</p>
              <p>{value.amount}</p>
            </div>
          ))}
        </div>
        <div>
          <div className="flex items-center justify-between pt-6 pb-2">
            <h3 className="heading-03 text-primary">Expenses</h3>
            <Edit className="cursor-pointer fill-text" width={16} height={16}  onClick={() => onEdit()} />
          </div>
          <h4 className="heading-01 text-primary font-semibold pt-4">
            Essential expenses
          </h4>
          <div className="side-menu-item">
            <p className="label">Name</p>
            <p className="label">Amount (USD)</p>
          </div>
          {expenses.map((value, index) => (
            <div className="side-menu-item" key={index}>
              <p>{value.name}</p>
              <p>{value.amount}</p>
            </div>
          ))}
          <h4 className="heading-01 text-primary font-semibold pt-4">
            Non-essential expenses
          </h4>
          <div className="side-menu-item">
            <p className="label">Name</p>
            <p className="label">Amount (USD)</p>
          </div>
          {nonExpenses.map((value, index) => (
            <div className="side-menu-item" key={index}>
              <p>{value.name}</p>
              <p>{value.amount}</p>
            </div>
          ))}
        </div>

        <div>
          <div className="flex items-center justify-between pt-6 pb-2">
            <h3 className="heading-03 text-primary">Current balance</h3>
            <Edit className="cursor-pointer fill-text" width={16} height={16}  onClick={() => onEdit()} />
          </div>
          <div className="side-menu-item no-bottom">
            <p className="label">Amount (USD)</p>
            <p className="label"></p>
          </div>
          {item.current_balance && (
            <div className="side-menu-item">
              <p>{item.current_balance}</p>
              <p></p>
            </div>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between pt-6 pb-2">
            <h3 className="heading-03 text-primary">Debt</h3>
            <Edit className="cursor-pointer fill-text" width={16} height={16}  onClick={() => onEdit()} />
          </div>
          {item.debts &&
            item.debts.map((debt, index) => {
              return (
                <React.Fragment key={index}>
                  <div className="side-menu-item no-bottom">
                    <p className="label">Name</p>
                    <p className="label">Annual interest (%)</p>
                  </div>
                  <div className="side-menu-item">
                      <p>{debt.name}</p>
                      <p>{debt.annual_interest}</p>
                  </div>
                  <div className="side-menu-item no-bottom">
                    <p className="label">Remaining amount (USD)</p>
                    <p className="label">Monthly payment (USD)</p>
                  </div>
                  <div className="side-menu-item">
                      <p>{debt.remaining_amount}</p>
                      <p>{debt.monthly_payment}</p>
                </div>
                </React.Fragment>
              );
            })}
        </div>
      </div>      
    </SideNav>
    {expanded && <div className="fixed w-full h-full left-0 top-0 z-10 bg-modal" style={{opacity: 0.4}}></div>}
    </React.Fragment>
  );
};

export default SideMenu;

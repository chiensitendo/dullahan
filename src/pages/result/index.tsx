import {
  Add,
  DotMark,
  Subtract,
  InformationSquare,
  ArrowDown,
  ProgressBar,
  ArrowRight,
} from "@carbon/icons-react";
import { NextPage } from "next";

import { StackedBarChart } from "@carbon/charts-react";
import { BUDGET_STATUS, ExpenseType, IncomeType, UserSeason } from "@/type";
import { useMemo, useState } from "react";
import { BUDGET_STATUS_TEXTS } from "@/type/const";
import { Tag } from "carbon-components-react";
import ProBar from "@/components/result/ProBar";
import DLineBar from "@/components/result/DLineBar";
import DebtTimeline from "@/components/result/DebtTimeline";
import ResultFooter from "@/components/result/ResultFooter";
import withLoading from "@/components/with-loading";
import withResult from "@/components/with-result";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import BudgetRecommendation from "@/components/result/BudgetRecommendation";
import SideMenu from "@/components/result/SideMenu";
import { useRouter } from "next/router";
import classNames from "classnames";

const BarChar = ({ item }: { item: UserSeason }) => {
  const items = useMemo(() => {
    const list: any[] = [];
    if (item.incomes) {
      item.incomes.forEach((income) => {
        list.push({
          group:
            income.type === IncomeType.FIXED_INCOME
              ? "Active income"
              : "Passive income",
          key: "Income",
          value: income.amount,
        });
      });
    }
    if (item.expenses) {
      item.expenses.forEach((expense) => {
        list.push({
          group:
            expense.type === ExpenseType.EXPENSE
              ? "Essential expenses"
              : "Non-ssential expenses",
          key: "Expense",
          value: expense.amount,
        });
      });
    }
    if (item.debts) {
      item.debts.forEach((debt) => {
        list.push({
          group: "Debt",
          key: "Expense",
          value: debt.monthly_payment,
        });
      });
    }
    return list;
  }, [item]);
  return (
    <StackedBarChart
      data={items}
      options={{
        title: "Net Income vs Expenses comparision",
        axes: {
          left: {
            // mapsTo: 'group',
            scaleType: "labels" as any,
          },
          bottom: {
            stacked: true,
          },
        },

        height: "400px",
        tooltip: {
          enabled: false,
        },
        color: {
          scale: {
            "Active income": "#0E6027",
            "Passive income": "#74E792",
            "Essential expenses": "#6929C4",
            "Non-ssential expenses": "#DCC7FF",
            Debt: "#A2191F",
          },
        },
      }}
    />
  );
};

const DotItem = ({ text }: { text: string }) => {
  return (
    <div className="flex items-center h-fit">
      <DotMark className="fill-primary min-w-[24px]" width={24} height={24} />
      <p
        className="text-primary ml-2.5"
        style={{
          fontSize: 20,
          fontStyle: "normal",
          fontWeight: 600,
          lineHeight: "28px",
        }}
      >
        {text}
      </p>
    </div>
  );
};

const BudgetCup = ({
  show,
  title,
  content,
  isAchived,
  onShow,
}: {
  show: boolean;
  title: string;
  content: string;
  isAchived: boolean;
  onShow: () => void;
}) => {
  return (
    <div className="pr-4 pl-4 pb-4 pt-14 flex items-start justify-between">
      <div>
        <div className="flex items-start med:flex-row flex-col">
          <p
            className="heading-04 mr-2"
            style={{
              marginBottom: !show ? undefined : "1rem",
            }}
          >
            {title}
          </p>
          {isAchived === true && (
            <Tag type="green" title="Achieved">
              Achieved
            </Tag>
          )}
        </div>
        <p className={classNames("mt-4 body-02 text-primary", {
            "result-text-overfollow": !show
          })}>
            {content}
          </p>

        <span
          className="underline cursor-pointer body-02 text-primary"
          onClick={() => {
            onShow();
          }}
        >
          {!show ? "Show more" : "Show less"}
        </span>
      </div>
      <div className="pl-2.5 lar:pl-6">
        <ArrowRight width={40} height={40} />
      </div>
    </div>
  );
};

// const BudgetCup2 = ({
//   show,
//   content,
//   onShow,
// }: {
//   show: boolean;
//   content: string;
//   onShow: () => void;
// }) => {
//   return (
//     show && (
//       <div className="py-6 cds--col-max-12 cds--col-xlg-12 cds--col-lg-12 cds--col-md-6 cds--col-sm-3">
//         <p className="body-02 text-primary mb-2.5">{content}</p>
//         <span
//           className="underline cursor-pointer body-02 text-primary"
//           onClick={() => {
//             onShow();
//           }}
//         >
//           Show less
//         </span>
//       </div>
//     )
//   );
// };

const BudgetStatus = ({
  status,
  statusText,
}: {
  status: BUDGET_STATUS;
  statusText: string;
}) => {
  const budgetStatus = status.toLocaleLowerCase();

  const textColor = useMemo(() => {
    switch (status) {
      case BUDGET_STATUS.BAD:
        return "text-bad";
      case BUDGET_STATUS.WARNING:
        return "text-warning";
      default:
        return "text-good";
    }
  }, [status]);
  return (
    <div>
      <div className="pt-14 px-4 pb-6">
        <p className="result-budget-status-prefix text-primary">
          Your Financial Status is_
        </p>
        <p className={`result-budget-status ${textColor}`}>
          {statusText ? statusText : BUDGET_STATUS_TEXTS[status]}
        </p>
      </div>
      <div>
        <img
          className="w-full max-w-full"
          src={`/images/illus-${budgetStatus}.svg`}
        />
      </div>
    </div>
  );
};

export function numberWithCommas(x: number) {
  if (!x) return "0";
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function getPercentNumber(number: number, divider: number) {
  if (divider === 0) return 0;
  return +((number / divider) * 100).toFixed(0);
}

const ResultPage: NextPage = () => {
  const { item, lineChart, timelineChart } = useSelector(
    (state: RootState) => state.customer
  );
  const router = useRouter();
  const [showEmergency, setShowEmergency] = useState(false);
  const [showRainy, setShowRainy] = useState(false);
  const [showFunfund, setShowFunfund] = useState(false);
  const [showInvestment, setShowInvestment] = useState(false);

  const [showMenu, setShowMenu] = useState(false);

  const [showCopy, setShowCopy] = useState(false);

  const status = useMemo(() => {
    if (!item || !item.status) {
      return null;
    }
    switch (item?.status) {
      case "GFF":
        return BUDGET_STATUS.GOOD;
      case "LFF":
      case "PC2PC":
        return BUDGET_STATUS.WARNING;
      default:
        return BUDGET_STATUS.BAD;
    }
  }, [item]);
  const background = useMemo(() => {
    switch (item?.status) {
      case "GFF":
        return "bg-good";
      case "LFF":
      case "PC2PC":
        return "bg-warning";
      default:
        return "bg-bad";
    }
  }, [item]);

  const emergencyText =
    "Having at least six months' expenses saved up acts as a safety net for life's unexpected challenges. It provides peace of mind during tough times, like job loss or emergencies, giving you the breathing room to recover without financial worries. If you're debt-free, consider prioritizing this emergency fund to invest in your stability and resilience.";
  const rainyText = `Setting aside an additional three months' worth of expenses for a rainy day is a wise step. Picture it as a financial umbrella for those unexpected moments, like a broken laptop or sudden house repairs. Having this extra savings cushion ensures that you won't have to dip into your regular income when these situations pop up. It's a practical way to stay prepared and safeguard your financial stability.`;
  const funFundText = `When you've worked hard to clear all your debts and build up a solid emergency and rainy day fund, it's time to reward yourself and start savoring the fruits of your labor. You can allocate about 20% of your remaining money each month for some well-deserved enjoyment like new experiences, a vacation, or simply things that bring you joy, go ahead and create a budget for it. By reaching this stage, you're making significant progress toward achieving financial freedom. Enjoy the journey!`;
  const investmentText = `Now that you've set aside enough money, it's an exciting moment to explore the world of investments. Putting up to 80% of your income into investments that have the potential to grow your money and work for you. This step brings you closer to building assets for early retirement, which is an excellent goal to pursue. Keep a watchful eye on your expenses, and don't lose sight of your financial goals. Regularly reviewing your spending habits and making adjustments will help you stay on track.`;

  return (
    <div className="result-page h-full w-full bg-white">
      <div className="sticky top-16 left-0 w-full flex items-center justify-center z-10 bg-white">
        <div className="h-container h-container-no-padding py-5 px-8 flex items-center justify-between">
          <p className="heading-03">Personal finance review</p>
          <p
            className="body-compact-02 text-link_primary cursor-pointer"
            onClick={() => setShowMenu(true)}
          >
            Show financial information
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center bg-background">
        <div className="py-6 px-8 h-container h-container-no-padding result-headline">
          <p className="heading-05">Financial Performance Analysis</p>
        </div>
      </div>
      {item && (
        <div className="cds--grid result-container h-container h-container-no-padding pb-20 px-8">
          <div className="cds--row flex justify-center">
            <div className="result-left pb-6 cds--col-max-4 cds--col-xlg-4 cds--col-lg-4 cds--col-md-8 cds--col-sm-4">
              <div className="flex items-start flex-col">
                <DotItem text="Overview" />
                <p className="text-primary result-text mt-6 mb-2">
                  Monthly Financial Performance
                </p>
                <p className={classNames("heading-06 text-black mb-2", {
                  "text-secondary": item.monthly_net_flow < 0 
                })}>
                  ${numberWithCommas(item.monthly_net_flow)}
                </p>
                <p className="helper-text-02 text-helper">
                  Total Income - Total Expense + Debt Payment
                </p>
              </div>
            </div>
            <div className="result-right cds--col-max-12 cds--col-xlg-12 cds--col-lg-12 cds--col-md-8 cds--col-sm-4">
              <div className="cds--grid">
                <div className="cds--row result-income-expense-row">
                  <div className="result-right-left cds--col-max-4 cds--col-xlg-4 cds--col-lg-4 cds--col-md-8 cds--col-sm-4">
                    <div className="result-right-left-container cds--grid">
                      <div className="cds--row">
                        <div className="result-income-expense result-income chart-total cds--col-max-16 cds--col-xlg-16 cds--col-lg-16 cds--col-md-4 cds--col-sm-2">
                          <div className="button mb-4">
                            <Add className="add" width={24} height={24} />
                          </div>
                          <span className="label-01 text-primary">
                            Total income
                          </span>
                          <p className="heading-04 text-primary mb-2">
                            ${numberWithCommas(item.total_all_income)}
                          </p>
                          <p className="helper-text-02 text-helper">
                            Not including current balance
                          </p>
                          <div className="result-divider"></div>
                        </div>
                        <div className="result-income-expense result-expense chart-total cds--col-max-16 cds--col-xlg-16 cds--col-lg-16 cds--col-md-4 cds--col-sm-2">
                          <div className="button mb-4">
                            <Subtract
                              className="subtract"
                              width={24}
                              height={24}
                            />
                          </div>
                          <span className="label-01 text-primary">
                            Total expenses
                          </span>
                          <p className="heading-04 text-primary mb-2">
                            $
                            {numberWithCommas(
                              item.total_all_expense +
                                item.total_monthly_payment_debt
                            )}
                          </p>
                          <p className="helper-text-02 text-helper">
                            Including debt paid off each month
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="result-right-right cds--col-max-12 cds--col-xlg-12 cds--col-lg-12 cds--col-md-8 cds--col-sm-4">
                    <div className="result-income-expense-char">
                      <BarChar item={item} />
                    </div>
                  </div>
                </div>
                <div
                  className={`cds--row ${background} result-income-expense-row`}
                >
                  <div className="cds--col-max-8 cds--col-xlg-8 cds--col-lg-8 cds--col-md-4 cds--col-sm-2 result-budget-status-container">
                    {status && (
                      <BudgetStatus
                        statusText={item.full_status}
                        status={status}
                      />
                    )}
                  </div>
                  <div className="cds--col-max-8 cds--col-xlg-8 cds--col-lg-8 cds--col-md-4 cds--col-sm-2 result-budget-note">
                    <div className="pt-14 pl-4 pr-6">
                      <p className="text-primary">{item.description}</p>
                    </div>
                  </div>
                </div>
                <div className="cds--row ">
                  <div className="py-6 px-4 w-full flex items-center bg-black">
                    <InformationSquare
                      className="fill-white"
                      width={24}
                      height={24}
                    />
                    <p className="ml-2 heading-02 text-white">
                      Budget recommendation
                    </p>
                  </div>
                </div>
                <div className="cds--row">
                  <BudgetRecommendation item={item} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="flex items-center justify-center bg-background">
        <div className="py-6 px-8 h-container h-container-no-padding result-headline">
          <p className="heading-05">Financial Milestone Recommendation</p>
        </div>
      </div>
      {item && (
        <div className="cds--grid result-container h-container h-container-no-padding pb-20 px-8">
          <div className="cds--row flex justify-center">
            <div className="result-left pb-6 cds--col-max-4 cds--col-xlg-4 cds--col-lg-4 cds--col-md-8 cds--col-sm-4">
              <div className="flex items-start flex-col">
                <DotItem text="Saving suggestion" />
              </div>
            </div>
            <div className="result-right cds--col-max-12 cds--col-xlg-12 cds--col-lg-12 cds--col-md-8 cds--col-sm-4">
              <div className="result-target cds--grid">
                <div className="cds--row">
                  <div className="result-target-col cds--col-max-16 cds--col-xlg-16 cds--col-lg-16 cds--col-md-8 cds--col-sm-4">
                    <div className="pr-4">
                      <p className="py-6 med:px-4 px-0 result-budget-cup">
                        Budget Cup Recommendation
                      </p>
                    </div>
                  </div>
                </div>
                <div className="cds--row">
                  <div className="result-target-col cds--col-max-8 cds--col-xlg-8 cds--col-lg-8 cds--col-md-4 cds--col-sm-2">
                    <div className="pr-4">
                      <div>
                        <img src="/images/Illus-Budget-cup.svg" />
                      </div>
                    </div>
                  </div>
                  <div className="result-target-col cds--col-max-8 cds--col-xlg-8 cds--col-lg-8 cds--col-md-4 cds--col-sm-2">
                    <div className="pl-4 pb-6 flex flex-col justify-between h-full">
                      <p className="mb-14">
                        {`Budget Cup is designed to give you a general recommendation on how you should set your financial milestones. Using your current money balance and current expenses, the report will show where you currently are in the journey`}
                      </p>
                      <div className="result-border-top pt-4">
                        <p className="text-primary result-text">
                          Your current balance
                        </p>
                        <p className="heading-06 text-black">
                          ${numberWithCommas(item.current_balance)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="cds--row bg-background p-6">
                  <div className="result-target-col cds--col-max-8 cds--col-xlg-8 cds--col-lg-8 cds--col-md-4 cds--col-sm-2">
                    <div className="pr-4 pl-6 flex items-center">
                      <ArrowDown height={24} width={24} />
                      <p className="ml-1 label-02">Prioritization</p>
                    </div>
                  </div>
                  <div className="result-target-col cds--col-max-8 cds--col-xlg-8 cds--col-lg-8 cds--col-md-4 cds--col-sm-2">
                    <div className="pl-4 flex items-center">
                      <ProgressBar height={24} width={24} />
                      <p className="ml-1 label-02">Saving Target processes</p>
                    </div>
                  </div>
                </div>
                <div className="cds--row result-border-bottom">
                  <div className="result-target-col cds--col-max-8 cds--col-xlg-8 cds--col-lg-8 cds--col-md-4 cds--col-sm-2">
                    <BudgetCup
                      title="Emergency Fund"
                      show={showEmergency}
                      isAchived={item.is_achived_emergency_fund}
                      content={emergencyText}
                      onShow={() => setShowEmergency(!showEmergency)}
                    />
                  </div>
                  <div className="result-target-col cds--col-max-8 cds--col-xlg-8 cds--col-lg-8 cds--col-md-4 cds--col-sm-2">
                    <div className="pl-4 pt-12 flex items-center w-full">
                      <ProBar
                        value={getPercentNumber(
                          item.actual_emergency_fund,
                          item.expected_emergency_fund
                        )}
                        actual={numberWithCommas(item.actual_emergency_fund)}
                        expected={numberWithCommas(
                          item.expected_emergency_fund
                        )}
                      />
                    </div>
                  </div>
                  {/* <BudgetCup2
                    show={showEmergency}
                    content={emergencyText}
                    onShow={() => setShowEmergency(!showEmergency)}
                  /> */}
                </div>
                <div className="cds--row result-border-bottom">
                  <div className="result-target-col cds--col-max-8 cds--col-xlg-8 cds--col-lg-8 cds--col-md-4 cds--col-sm-2">
                    <BudgetCup
                      title="Rainy Day Fund"
                      show={showRainy}
                      isAchived={item.is_achived_rainyday_fund}
                      content={rainyText}
                      onShow={() => setShowRainy(!showRainy)}
                    />
                  </div>
                  <div className="result-target-col cds--col-max-8 cds--col-xlg-8 cds--col-lg-8 cds--col-md-4 cds--col-sm-2">
                    <div className="pl-4 pt-12 flex items-center w-full">
                      <ProBar
                        value={getPercentNumber(
                          item.actual_rainyday_fund,
                          item.expected_rainyday_fund
                        )}
                        actual={numberWithCommas(item.actual_rainyday_fund)}
                        expected={numberWithCommas(item.expected_rainyday_fund)}
                      />
                    </div>
                  </div>
                </div>
                <div className="cds--row result-border-bottom">
                  <div className="result-target-col cds--col-max-8 cds--col-xlg-8 cds--col-lg-8 cds--col-md-4 cds--col-sm-2">
                    <BudgetCup
                      title="Fun Fund"
                      show={showFunfund}
                      isAchived={false}
                      content={funFundText}
                      onShow={() => setShowFunfund(!showFunfund)}
                    />
                  </div>
                  <div className="result-target-col cds--col-max-8 cds--col-xlg-8 cds--col-lg-8 cds--col-md-4 cds--col-sm-2">
                    <div className="pl-4 pt-12 flex items-center w-full">
                      <ProBar
                        value={0}
                        isUnlimited={
                          item.is_achived_rainyday_fund &&
                          item.is_achived_emergency_fund
                        }
                        actual={numberWithCommas(item.fun_fund)}
                      />
                    </div>
                  </div>
                </div>
                <div className="cds--row result-border-bottom">
                  <div className="result-target-col cds--col-max-8 cds--col-xlg-8 cds--col-lg-8 cds--col-md-4 cds--col-sm-2">
                    <BudgetCup
                      title="Investment account"
                      show={showInvestment}
                      isAchived={item.is_achived_investment}
                      content={investmentText}
                      onShow={() => setShowInvestment(!showInvestment)}
                    />
                  </div>
                  <div className="result-target-col cds--col-max-8 cds--col-xlg-8 cds--col-lg-8 cds--col-md-4 cds--col-sm-2">
                    <div className="pl-4 pt-12 flex items-center w-full">
                      <ProBar
                        value={0}
                        isUnlimited={
                          item.is_achived_rainyday_fund &&
                          item.is_achived_emergency_fund
                        }
                        actual={numberWithCommas(item.investment)}
                      />
                    </div>
                  </div>
                </div>
                <div className="cds--row result-border-bottom result-border-left result-border-right">
                  <div className="result-target-col cds--col-max-8 cds--col-xlg-8 cds--col-lg-8 cds--col-md-4 cds--col-sm-2">
                    <div className="pr-4 pl-4 pb-4 pt-14 flex items-start justify-between">
                      <div className="flex items-start med:flex-row flex-col">
                        <p className="heading-04 mr-2">
                          Current retirement plan
                        </p>
                        {item.is_achived_retirement_plan && (
                          <Tag type="green" title="Achieved">
                            Achieved
                          </Tag>
                        )}
                      </div>
                      <div className="pl-6">
                        <ArrowRight width={40} height={40} />
                      </div>
                    </div>
                  </div>
                  <div className="result-target-col cds--col-max-8 cds--col-xlg-8 cds--col-lg-8 cds--col-md-4 cds--col-sm-2">
                    <div className="pl-4 pt-12 pb-6 flex items-center w-full">
                      <div>
                        <p className="heading-06-05 text-focus">
                          ${numberWithCommas(item.retirement_plan)}
                        </p>
                        <p className="label-02 text-helper">
                          = Essential Expenses x 12 (months) x 10 (years)
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    className="cds--col-max-16 cds--col-xlg-16 cds--col-lg-16 cds--col-md-8 cds--col-sm-4"
                    style={{ paddingLeft: 0, paddingRight: 0 }}
                  >
                    <img className="w-full" src="/images/saving.svg" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div
        className="cds--grid result-container h-container h-container-no-padding pb-20 px-8"
        style={{ borderTop: 0 }}
      >
        <div className="cds--row flex justify-center">
          <div className="result-left pb-6 cds--col-max-4 cds--col-xlg-4 cds--col-lg-4 cds--col-md-8 cds--col-sm-4">
            <div className="flex items-start flex-col">
              <DotItem text="How much you will have in the next 5 years" />
            </div>
          </div>
          <div className="result-right cds--col-max-12 cds--col-xlg-12 cds--col-lg-12 cds--col-md-8 cds--col-sm-4">
            <div className="p-4 result-border">
              <DLineBar
                data={lineChart?.data ? lineChart.data : []}
                debts={lineChart?.debts ? lineChart.debts : []}
              />
            </div>
          </div>
        </div>
      </div>
      {timelineChart?.data && <DebtTimeline items={timelineChart.data} />}
      <ResultFooter
        code={item?.code}
        showCopy={showCopy}
        onCopy={() => setShowCopy(true)}
      />
      {item && (
        <SideMenu
          item={item}
          expanded={showMenu}
          onExpanded={(expanded) => setShowMenu(expanded)}
          onEdit={() => router.push("/form")}
        />
      )}
    </div>
  );
};

export default withLoading(withResult(ResultPage));

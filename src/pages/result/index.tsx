import {
  Add,
  DotMark,
  Subtract,
  InformationSquare,
  ArrowDown,
  ProgressBar,
  ArrowRight
} from "@carbon/icons-react";
import { NextPage } from "next";

import { StackedBarChart } from "@carbon/charts-react";
import { BUDGET_STATUS } from "@/type";
import { useMemo } from "react";
import { BUDGET_NOTES, BUDGET_STATUS_TEXTS } from "@/type/const";
import { Accordion, AccordionItem } from "carbon-components-react";

const BarChar = () => {
  const state = {
    data: [
      {
        group: "Fixed income",
        key: "Thu",
        value: 65000,
      },
      {
        group: "Fixed income",
        key: "Chi",
        value: 0,
      },
      {
        group: "Passive income",
        key: "Thu",
        value: 32432,
      },
      {
        group: "Passive income",
        key: "Chi",
        value: 0,
      },
      {
        group: "Essential expenses",
        key: "Thu",
        value: 0,
      },
      {
        group: "Essential expenses",
        key: "Chi",
        value: 29123,
      },
      {
        group: "Non-ssential expenses",
        key: "Thu",
        value: 0,
      },
      {
        group: "Non-ssential expenses",
        key: "Chi",
        value: 15312,
      },
      {
        group: "Debt",
        key: "Thu",
        value: 0,
      },

      {
        group: "Debt",
        key: "Chi",
        value: 24232,
      },
    ],
  };
  return (
    <StackedBarChart
      data={state.data}
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
            "Fixed income": "#0E6027",
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
      <DotMark className="fill-primary" width={24} height={24} />
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

const BudgetStatus = ({ status }: { status: BUDGET_STATUS }) => {
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
          Your budget status is_
        </p>
        <p className={`result-budget-status ${textColor}`}>
          {BUDGET_STATUS_TEXTS[status]}
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

const ResultPage: NextPage = () => {
  const status = BUDGET_STATUS.GOOD;

  const background = useMemo(() => {
    // switch (status) {
    //     case 'BAD': return 'bg-bad';
    //     case 'WARNING': return 'bg-warning';
    //     default: return 'bg-good';
    // }
    return "bg-" + status.toLowerCase();
  }, [status]);

  return (
    <div className="result-page h-full w-full bg-white">
      <div className="sticky top-16 left-0 w-full flex items-center justify-center z-10">
        <div className="h-container h-container-no-padding bg-white py-5 px-8 flex items-center justify-between">
          <p className="heading-03">Personal finance review</p>
          <p className="body-compact-02 text-link_primary cursor-pointer">
            Show financial information
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center bg-background">
        <div className="py-6 px-8 h-container h-container-no-padding result-headline">
          <p className="heading-05">Financial Situation</p>
        </div>
      </div>
      <div className="cds--grid result-container h-container pb-20 px-8">
        <div className="cds--row flex justify-center">
          <div className="result-left pb-6 cds--col-max-4 cds--col-xlg-4 cds--col-lg-4 cds--col-md-8 cds--col-sm-4">
            <div className="flex items-start flex-col">
              <DotItem text="Overview" />
              <p className="text-primary result-text mt-6 mb-2">
                Monthly net flow performance
              </p>
              <p className="heading-06 text-black mb-2">$31000</p>
              <p className="helper-text-02 text-helper">
                Net flow performance is calculated as Total income minus Total
                expenses and Debt (if any).
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
                        <p className="heading-04 text-primary mb-2">$33,000</p>
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
                        <p className="heading-04 text-primary mb-2">$2,000</p>
                        <p className="helper-text-02 text-helper">
                          Including debt paid off each month
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="result-right-right cds--col-max-12 cds--col-xlg-12 cds--col-lg-12 cds--col-md-8 cds--col-sm-4">
                  <div className="result-income-expense-char">
                    <BarChar />
                  </div>
                </div>
              </div>
              <div
                className={`cds--row ${background} result-income-expense-row`}
              >
                <div className="cds--col-max-8 cds--col-xlg-8 cds--col-lg-8 cds--col-md-4 cds--col-sm-2 result-budget-status-container">
                  <BudgetStatus status={status} />
                </div>
                <div className="cds--col-max-8 cds--col-xlg-8 cds--col-lg-8 cds--col-md-4 cds--col-sm-2 result-budget-note">
                  <div className="pt-14 pl-4 pr-6">
                    <p className="text-primary">{BUDGET_NOTES[status]}</p>
                  </div>
                </div>
              </div>
              <div className="cds--row med:px-0 px-4">
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
              <div className="cds--row med:px-0 px-4">
                <Accordion>
                  <AccordionItem title="Give yourself a treat">
                    <p>
                      The accordion component delivers large amounts of content
                      in a small space through progressive disclosure. The user
                      gets key details about the underlying content and can
                      choose to expand that content within the constraints of
                      the accordion. Accordions work especially well on mobile
                      interfaces or whenever vertical space is at a premium.
                    </p>
                  </AccordionItem>
                  <AccordionItem title="Raining day saving recommend">
                    <p>
                      The accordion component delivers large amounts of content
                      in a small space through progressive disclosure. The user
                      gets key details about the underlying content and can
                      choose to expand that content within the constraints of
                      the accordion. Accordions work especially well on mobile
                      interfaces or whenever vertical space is at a premium.
                    </p>
                  </AccordionItem>
                  <AccordionItem title={"Consider starting to invest"}>
                    <p>
                      The accordion component delivers large amounts of content
                      in a small space through progressive disclosure. The user
                      gets key details about the underlying content and can
                      choose to expand that content within the constraints of
                      the accordion. Accordions work especially well on mobile
                      interfaces or whenever vertical space is at a premium.
                    </p>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center bg-background">
        <div className="py-6 px-8 h-container h-container-no-padding result-headline">
          <p className="heading-05">Financial target</p>
        </div>
      </div>
      <div className="cds--grid result-container h-container pb-20 px-8">
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
                      Budget cup
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
                      Based on your Current Balance, The report will show your
                      current saving target, how much you have already saved,
                      and how much you need to save based on your current
                      spending.
                    </p>
                    <div className="result-border-top pt-4">
                      <p className="text-primary result-text">
                        Your current balance
                      </p>
                      <p className="heading-06 text-black">$31000</p>
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
              <div className="cds--row">
                <div className="result-target-col cds--col-max-8 cds--col-xlg-8 cds--col-lg-8 cds--col-md-4 cds--col-sm-2">
                  <div className="pr-4 pl-4 pb-4 pt-14 flex items-start">
                        <div>
                            <p className="heading-04">Emergency Fund</p>
                            <p className="mt-4">An emergency fund is designed to protect you from common worst-case financial scenarios, such as job loss or a sudden loss of income, ... 
                                <span className="underline">Show more</span></p>
                        </div>
                        <div className="pl-6"><ArrowRight width={40} height={40}/></div>
                  </div>
                </div>
                <div className="result-target-col cds--col-max-8 cds--col-xlg-8 cds--col-lg-8 cds--col-md-4 cds--col-sm-2">
                  <div className="pl-4 flex items-center">
                    <ProgressBar height={24} width={24} />
                    <p className="ml-1 label-02">Saving Target processes</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;

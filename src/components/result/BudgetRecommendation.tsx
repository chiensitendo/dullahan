import { UserSeason } from "@/type";
import { Accordion, AccordionItem, Tag } from "carbon-components-react";
import { useMemo } from "react";

const BudgetRecommendation = ({ item }: { item: UserSeason }) => {
  const items = useMemo(() => {
    const list = [];
    if (item.monthly_net_flow < 0) {
      list.push(
        <AccordionItem
          key={list.length}
          title={
            <div className="flex items-center py-4">
              <p>Cut Expenses or Increase Income</p>
              <Tag
                style={{ marginLeft: "8px" }}
                type="red"
                title="Warning high"
              >
                Warning
              </Tag>
            </div>
          }
        >
          <p>
            It is important to take steps to increase your income or decrease
            your expenses (especially considering cutting off your non-essential
            budget totally) in order to bring your budget back into balance.
          </p>
        </AccordionItem>
      );
    }
    if (item.debts && item.debts.length > 0) {
      const debtName = item.debts.map((d) => d.name).join(",");
      const interestRate = item.debts
        .map((d) => d.annual_interest + "%")
        .join(",");
      list.push(
        <AccordionItem
          key={list.length}
          title={
            <div className="flex items-center py-4">
              <p>
                You have {debtName} with {interestRate} interest
              </p>
              <Tag
                style={{ marginLeft: "8px" }}
                type="red"
                title="Clear Filter"
              >
                Warning
              </Tag>
            </div>
          }
        >
          <p>
            You have {debtName} debt going, consider paying it off soon to free
            up your income
          </p>
        </AccordionItem>
      );
    }
    if (item.monthly_net_flow > item.total_essential_expense) {
      list.push(
        <AccordionItem
          key={list.length}
          title={
            <div className="flex items-center py-4">
              <p>Good Income Flow</p>
              <Tag
                style={{ marginLeft: "8px" }}
                type="green"
                title="Clear Filter"
              >
                Good
              </Tag>
            </div>
          }
        >
          <p>You have a good income flow. Try to maintain it.</p>
        </AccordionItem>
      );
    }
    if (
      (!item.debts || item.debts.length === 0) &&
      !item.is_achived_emergency_fund
    ) {
      list.push(
        <AccordionItem
          key={list.length}
          title={
            <div className="flex items-center py-4">
              <p>Emergency Saving Recommend</p>
              <Tag
                style={{ marginLeft: "8px" }}
                type="red"
                title="Warning medium"
              >
                Warning
              </Tag>
            </div>
          }
        >
          <p>
            {`Consider creating an emergency savings account to prepare for
            unexpected situations. It is recommended to open a separate bank
            account or store the funds in a place where you won't be tempted to
            use them for everyday expenses.`}
          </p>
        </AccordionItem>
      );
    }
    if (
      (!item.debts || item.debts.length === 0) &&
      item.is_achived_emergency_fund &&
      !item.is_achived_rainyday_fund
    ) {
      list.push(
        <AccordionItem
          key={list.length}
          title={
            <div className="flex items-center py-4">
              <p>Rainy Day Saving Recommend</p>
              <Tag
                style={{ marginLeft: "8px" }}
                type="red"
                title="Warning medium"
              >
                Warning
              </Tag>
            </div>
          }
        >
          <p>
            {`You should consider saving for a "rainy day" account to cover
            unexpected incidents such as a broken laptop or unexpected medical
            expenses.`}
          </p>
        </AccordionItem>
      );
    }
    if (
      (!item.debts || item.debts.length === 0) &&
      item.is_achived_emergency_fund &&
      item.is_achived_rainyday_fund
    ) {
      list.push(
        <AccordionItem
          key={list.length}
          title={
            <div className="flex items-center py-4">
              <p>Consider starting to invest</p>
              <Tag style={{ marginLeft: "8px" }} type="green" title="Good">
                Good
              </Tag>
            </div>
          }
        >
          <p>
            {`If you have sufficient funds for savings, it's important to segment
            them correctly. Additionally, it may be a good time to learn about
            investing, but only invest with extra money that you have available.`}
          </p>
        </AccordionItem>
      );
    }
    if (
      (!item.debts || item.debts.length === 0) &&
      item.is_achived_emergency_fund &&
      item.is_achived_rainyday_fund &&
      item.monthly_net_flow > 200
    ) {
      list.push(
        <AccordionItem
          key={list.length}
          title={
            <div className="flex items-center py-4">
              <p>Give yourself a treat</p>
              <Tag style={{ marginLeft: "8px" }} type="green" title="Good">
                Good
              </Tag>
            </div>
          }
        >
          <p>
            {`You have now saved enough to enjoy a worry-free mind. Consider
            treating yourself by allocating 20% of your net monthly income for
            this purpose.`}
          </p>
        </AccordionItem>
      );
    }
    if (item.monthly_net_flow <= 200 && item.monthly_net_flow >= 0) {
      list.push(
        <AccordionItem
          key={list.length}
          title={
            <div className="flex items-center py-4">
              <p>You are living paycheck to paycheck</p>
              <Tag
                style={{ marginLeft: "8px" }}
                type="red"
                title="Warning medium"
              >
                Warning
              </Tag>
            </div>
          }
        >
          <p>
            {`It is tiring to not have any extra for emergencies, consider
            increasing your income or decreasing expenses. Cutting off all
            non-essential expenses for the time being is highly recommended`}
          </p>
        </AccordionItem>
      );
    }
    return list;
  }, [item]);
  return <Accordion>{items}</Accordion>;
};

export default BudgetRecommendation;

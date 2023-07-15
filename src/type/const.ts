import { BUDGET_STATUS, Choice, VALIDATION_TYPE } from ".";

export const INCOME_MAX_ITEMS = 5;

export const EXPENSE_MAX_ITEMS = 15;

export const MULTIPLES_ESSENTIAL_EXPENSES_FIELDS: Choice[] = [
    {id: 1, name: "Housing (Rent)", checked: false},
    {id: 2, name: "Transportation (Fuel)", checked: false},
    {id: 3, name: "Utilities (Electricities, Water, Gas)", checked: false},
    {id: 4, name: "Special Health Treatment (Sickness, essential pill)", checked: false},
    {id: 5, name: "Groceries (Household supply)", checked: false},
    {id: 6, name: "Communication (Phone bills, internet services)", checked: false},
    {id: 7, name: "Essential Personal Care (Hair Cut, Hygiene product)", checked: false},
    {id: 8, name: "Education", checked: false},
    {id: 9, name: "Checkbox label", checked: false},
    {id: 10, name: "Checkbox label", checked: false},
    {id: 11, name: "Checkbox label", checked: false},
    {id: 12, name: "Checkbox label", checked: false},
    {id: 13, name: "Checkbox label", checked: false},
    {id: 14, name: "Checkbox label", checked: false},
    {id: 15, name: "Checkbox label", checked: false},
];

export const getValidationMessage = (type: VALIDATION_TYPE | undefined, name: string | undefined) => {
    let message = "";
    switch (type) {
        case VALIDATION_TYPE.INVALID:
            message = "is invalid";
            break;
        default:
            message = "is required";
            break;
    }
    return (!name ? "" : name.charAt(0).toUpperCase() + name.slice(1) + " ")  + message;
}

export const BUDGET_NOTES = {
    [BUDGET_STATUS.BAD]: "Your monthly net income exceeds your essential expenses. This provides you with extra money at the end of each month that you can save or invest. This extra financial cushion can help you respond to unexpected expenses or changes in income. Consider saving toward the Emergency and Rainy Day Fund if you haven’t done so.",
    [BUDGET_STATUS.WARNING]: "You are earning just enough money to cover your expenses, but you do not have any extra money left over at the end of the month. This can be a stressful financial situation since you have no financial cusahion in case of an emergency or unexpected expense. It is important to find ways to increase income or decrease expenses in order to break out of this cycle and build up savings.",
    [BUDGET_STATUS.GOOD]: "You are spending more money than they are earning. This is not sustainable in the long term and can lead to financial problems. It is important to take steps to increase your income or decrease your expenses in order to bring your budget back into balance.",
}

export const BUDGET_STATUS_TEXTS = {
    [BUDGET_STATUS.BAD]: "Budget deficit",
    [BUDGET_STATUS.WARNING]: "Paycheck to paycheck",
    [BUDGET_STATUS.GOOD]: "Good financial flexibility",
}

export const FORM_LINK = "/form";
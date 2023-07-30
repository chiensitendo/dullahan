import { BUDGET_STATUS, Choice, VALIDATION_TYPE } from ".";

export const INCOME_MAX_ITEMS = 5;

export const EXPENSE_MAX_ITEMS = 15;

export const MULTIPLES_FIXED_INCOME_FIELDS: Choice[] = [
    {id: 1, name: "Full-time Salary", checked: false},
    {id: 2, name: "Freelance Salary", checked: false},
    {id: 3, name: "Own Business", checked: false},
    {id: 4, name: "Shop Revenue", checked: false},
];

export const MULTIPLES_PASSIVE_INCOME_FIELDS: Choice[] = [
    {id: 1, name: "Advertising Commission", checked: false},
    {id: 2, name: "Property Rent", checked: false},
    {id: 3, name: "Car Rent", checked: false},
    {id: 4, name: "Social Media Activities", checked: false},
    {id: 5, name: "Dividend Investment", checked: false},
];

export const MULTIPLES_ESSENTIAL_EXPENSES_FIELDS: Choice[] = [
    {id: 1, name: "Housing (Rent)", checked: false},
    {id: 2, name: "Transportation (Fuel)", checked: false},
    {id: 5, name: "Food (Groceries, Household supply)", checked: false},
    {id: 3, name: "Utilities (Electricities, Water, Gas)", checked: false},
    {id: 4, name: "Special Health Treatment (Sickness, essential pill)", checked: false},
    {id: 6, name: "Communication (Phone bills, internet services)", checked: false},
    {id: 7, name: "Essential Personal Care (Hair Cut, Hygiene product)", checked: false},
    {id: 8, name: "Education", checked: false},
    {id: 9, name: "Child Care (Support raising children)", checked: false},
    {id: 10, name: "Family Care (Support Family - Elderly)", checked: false},
];

export const MULTIPLES_NON_ESSENTIAL_EXPENSES_FIELDS: Choice[] = [
    {id: 11, name: "Entertainment (Movies, Games, Sports Events etc)", checked: false},
    {id: 12, name: "Dining Restaurant (Eating Out)", checked: false},
    {id: 13, name: "Non-work Traveling (Vacation, flight, hotel)", checked: false},
    {id: 14, name: "Subscription Services (Netflix, Disney Plus, Spotify, Youtube)", checked: false},
    {id: 15, name: "Coffee or Snack", checked: false},
    {id: 16, name: "Beauty Services (Salon, Massage, Spa)", checked: false},
    {id: 17, name: "Alcohol and Bars (Alcohol drinks, Bar dining)", checked: false},
    {id: 18, name: "Non-Essential Gadgets (technologies, decorations)", checked: false},
    {id: 19, name: "Luxury Shopping", checked: false},
    {id: 20, name: "Premium Services (Butler, personal trainer)", checked: false},
];

export const isFixedActiveIncome = (name: string) => {
    if (!name) return false;
    return MULTIPLES_FIXED_INCOME_FIELDS.findIndex(item => item.name === name) >= 0;
}

export const isFixedPassiveIncome = (name: string) => {
    if (!name) return false;
    return MULTIPLES_PASSIVE_INCOME_FIELDS.findIndex(item => item.name === name) >= 0;
}

export const isFixedExpenseIncome = (name: string) => {
    if (!name) return false;
    return MULTIPLES_ESSENTIAL_EXPENSES_FIELDS.findIndex(item => item.name === name) >= 0;
}

export const isFixedNonExpenseIncome = (name: string) => {
    if (!name) return false;
    return MULTIPLES_NON_ESSENTIAL_EXPENSES_FIELDS.findIndex(item => item.name === name) >= 0;
}

export const getValidationMessage = (type: VALIDATION_TYPE | undefined, name: string | undefined) => {
    let message = "";
    switch (type) {
        case VALIDATION_TYPE.INVALID:
            message = "is invalid";
            break;
        case VALIDATION_TYPE.LARGER_ZERO:
            message = "must be larger than 0";
            break;
        case VALIDATION_TYPE.POSITIVE:
            message = "must be a non-negative number";
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

interface TooltipProps {
    fixedIncome: string;
    passiveIncome: string;
    expenses: string;
    nonExpenses: string;
}

export const tooltipText: TooltipProps = {
    fixedIncome: 'Active income comes through direct labor or service such as your day job, your side hustle, or even the cash you earn from your music show! ',
    passiveIncome: 'Passive income comes through minimal labor source like your dividend investments, earning from youtube channel, or rental income!',
    expenses: '"Essential Expenses," are the essential payment for you or your family. They include those everyday necessities like rent, groceries, fuels or electrical bills.',
    nonExpenses: 'Those expenses that exist only for pleasure purpose such as the monthly pay for cup of coffee or weekend getaway!',
}

export const FORM_LINK = "/form";
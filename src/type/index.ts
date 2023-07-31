export enum FORM_FIELD {
    INCOME = "Income",
    EXPENSES = "Expenses",
    BALANCE = "Current balance"
}


export enum IncomeType {
    FIXED_INCOME = "MONTHLY",
    PASSIVE_INCOME = "PASSIVE"
}

export enum ExpenseType {
    EXPENSE = "ESSENTIAL",
    NON_EXPENSE = "NON_ESSENTIAL"
}

export enum VALIDATION_TYPE {
    REQUIRED = 1,
    INVALID = 2,
    LARGER_ZERO = 3,
    POSITIVE = 4
}

export enum BUDGET_STATUS  {
    GOOD = "GOOD",
    WARNING = "WARNING",
    BAD = "BAD"
}

export interface CustomerIncomeCreationDataRequest {
    amount?: number;
    name: string;
    type: IncomeType;
}

export interface CustomerExpenseCreationDataRequest {
    amount?: number;
    name: string;
    type: ExpenseType;
}

export interface CustomerIncomeCreationData extends CustomerIncomeCreationDataRequest {
    id: number;
}

export interface CustomerExpenseCreationData extends CustomerExpenseCreationDataRequest {
    id: number;
}

export interface CustomerMeUpdateData {
    current_balance: number;
}

export interface CustomerDebtCreationData {
    annual_interest: number;
    monthly_payment: number;
    name: string;
    payment_deadline?: string;
    remaining_amount: number;
    type: string;
}


export interface Choice {
    id: number,
    name: string,
    checked: boolean
}

export interface CredentialData {
    session_code: string;
}

export interface DataSet {
    asset: number,
    debt: number,
    group: string,
    key: string
}

export interface Debt {
    annual_interest: number,
    id: number,
    monthly_payment: number,
    name: string,
    payment_deadline?: string,
    remaining_amount: number,
    type: string,
    session_id?: number
}

export interface UserSeason {
    actual_emergency_fund: number,
    actual_rainyday_fund: number,
    code: string,
    created_at: string,
    current_balance: number,
    data_sets: DataSet[],
    debts: Debt[],
    description: string,
    expected_emergency_fund: number,
    expected_rainyday_fund: number,
    expenses: CustomerExpenseCreationData[],
    fun_fund: number,
    id: number,
    incomes: CustomerIncomeCreationData[],
    investment: number,
    ip_address: string,
    is_achived_emergency_fund: boolean,
    is_achived_investment: boolean,
    is_achived_rainyday_fund: boolean,
    is_achived_retirement_plan: boolean,
    last_login: string,
    monthly_net_flow: number,
    retirement_plan: number,
    status: string,
    full_status: string,
    total_all_expense: number,
    total_all_income: number,
    total_essential_expense: number,
    total_monthly_payment_debt: number,
    total_non_essential_expense: number,
    updated_at: string,
    user_agent: string
}

export interface LineCharData {
    asset: number,
    debt: number,
    group: string,
    key: string
}

export interface LineChartDebtData {
    annual_interest: number,
    id: number,
    monthly_payment: number,
    name: string,
    payment_deadline?: string,
    remaining_amount: number,
    type: string,
    session_id?: number,
    forecast_paid_off_date: string
}
export interface LineChartDataResponse {
    data: LineCharData[];
    debts: LineChartDebtData[];
}

export interface Timeline {
    date: string;
    description: string;
    event: string;
}

export interface TimelineChartDataResponse {
    data: Timeline[];
}
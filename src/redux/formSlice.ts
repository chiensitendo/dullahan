import { AuthData } from "@/components/use-auth";
import { Choice, ExpenseType, FORM_FIELD, IncomeType, UserSeason, VALIDATION_TYPE } from "@/type"
import { EXPENSE_MAX_ITEMS, INCOME_MAX_ITEMS, MULTIPLES_ESSENTIAL_EXPENSES_FIELDS, MULTIPLES_FIXED_INCOME_FIELDS, MULTIPLES_NON_ESSENTIAL_EXPENSES_FIELDS, MULTIPLES_PASSIVE_INCOME_FIELDS, isFixedActiveIncome, isFixedExpenseIncome, isFixedNonExpenseIncome, isFixedPassiveIncome } from "@/type/const"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"


export type DebtType = "name" | "annual" | "amount" | "payment";

export interface DebtData {
  name: string;
  annual: string;
  amount: string;
  payment: string;
  validation: DebtValidationItem;
  isDelete: boolean;
  id?: number;
}

export interface DebtValidationItem {
  name: ValidationItem;
  annual: ValidationItem;
  amount: ValidationItem;
  payment: ValidationItem;
}


export interface IncomeData {
  validation: IncomeValidationItem;
  isDelete: boolean;
  isFixed: boolean;
  amount: string;
  name: string;
  type: IncomeType;
  id?: number;
}

export interface ExpenseData {
  validation: IncomeValidationItem;
  isDelete: boolean;
  isFixed: boolean;
  amount: string;
  name: string;
  type: ExpenseType;
  id?: number;
}

export interface CurrentBalance {
  validation: ValidationItem;
  value: string;
}

export interface ValidationItem {
  isValid: boolean;
  isFirst: boolean;
  type?: VALIDATION_TYPE;
}

export interface IncomeValidationItem {
  amount: ValidationItem;
  name: ValidationItem;
}

export interface FormStateItem {
  index: number;
  name: string;
  attribute: string;
  value: any;
}

export interface ModalItem {
  items: Choice[],
  name: string,
  remain: number,
  type: string,
  disabledList: Choice[]
}

export enum FIELD_NAME {
  FIXED_INCOME = "fixedIncome",
  EXPENSES = "expenses"
}



export interface FocusState {
  fixedIncome?: number;
  passiveIncome?: number;
  expenses?: number;
  nonExpenses?: number;
  debts?: number;
}

export interface DeleteItemState {
  fixedIncome: number[];
  passiveIncome: number[];
  expenses: number[];
  nonExpenses: number[];
  debts: number[];
}

export type FocusFields = "fixedIncome" | "passiveIncome" | "expenses" | "nonExpenses" | "debts";

export interface FormState {
  fixedIncome: IncomeData[];
  passiveIncome: IncomeData[];
  expenses: ExpenseData[];
  nonExpenses: ExpenseData[];
  modal: ModalItem | null;
  currentBalance: CurrentBalance;
  debts: DebtData[];
  errorMessages?: string[];
  shouldSent: boolean;
  code?: string;
  isSubmit: boolean;
  isEdit: boolean;
  selections: Choice[];
  focus: FocusState;
  deleteId?: string;
  isChanged: boolean;
  deleteItems: DeleteItemState;
}

const initialState: FormState = {
  fixedIncome: MULTIPLES_FIXED_INCOME_FIELDS.slice(0,3).map(item => ({
    amount: "", name: item.name, type: IncomeType.FIXED_INCOME, validation: {
      amount: { isValid: true, isFirst: true },
      name: { isValid: true, isFirst: true }
    },
    isDelete: false,
    isFixed: true
  })),
  passiveIncome: MULTIPLES_PASSIVE_INCOME_FIELDS.slice(0,3).map(item => ({
    amount: "", name: item.name, type: IncomeType.PASSIVE_INCOME, validation: {
      amount: { isValid: true, isFirst: true },
      name: { isValid: true, isFirst: true }
    },
    isDelete: false,
    isFixed: true
  })),
  expenses: MULTIPLES_ESSENTIAL_EXPENSES_FIELDS.slice(0,3).map(item => ({
    amount: "", name: item.name, type: ExpenseType.EXPENSE, validation: {
      amount: { isValid: true, isFirst: true },
      name: { isValid: true, isFirst: true }
    },
    isDelete: false,
    isFixed: true
  })),
  nonExpenses: MULTIPLES_NON_ESSENTIAL_EXPENSES_FIELDS.slice(0,3).map(item => ({
    amount: "", name: item.name, type: ExpenseType.NON_EXPENSE, validation: {
      amount: { isValid: true, isFirst: true },
      name: { isValid: true, isFirst: true }
    },
    isDelete: false,
    isFixed: true
  })),
  modal: null,

  debts: [],
  shouldSent: false,
  isSubmit: false,
  isEdit: false,
  selections: [],
  currentBalance: {
    value: "",
    validation: {
      isFirst: true,
      isValid: false
    }
  },
  focus: {},
  isChanged: false,
  deleteItems: {
    fixedIncome: [],
  passiveIncome: [],
  expenses: [],
  nonExpenses: [],
  debts: [],
  }
}

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    addFixedIncome: (state) => {
      state.isChanged = true;
      if (state.fixedIncome.length === INCOME_MAX_ITEMS) return;
      state.fixedIncome.push({
        amount: "", name: "Active income " + (state.fixedIncome.length + 1), type: IncomeType.FIXED_INCOME, validation: {
          amount: { isValid: true, isFirst: true },
          name: { isValid: true, isFirst: true }
        },
        isDelete: false,
        isFixed: false
      });
    },
    addPassiveIncome: (state) => {
      state.isChanged = true;
      if (state.passiveIncome.length === INCOME_MAX_ITEMS) return;
      state.passiveIncome.push({
        amount: "", name: "Passive income " + (state.passiveIncome.length + 1), type: IncomeType.PASSIVE_INCOME, validation: {
          amount: { isValid: true, isFirst: true },
          name: { isValid: true, isFirst: true}
        },
        isDelete: false,
        isFixed: false
      });
    },
    addExpense: (state) => {
      state.isChanged = true;
      if (state.expenses.length === EXPENSE_MAX_ITEMS) return;
      state.expenses.push({
        amount: "", name: "Essential expenses " + (state.expenses.length + 1), type: ExpenseType.EXPENSE, validation: {
          amount: { isValid: true, isFirst: true },
          name: { isValid: true, isFirst: true }
        },
        isDelete: false,
        isFixed: false
      });
    },
    addNonExpense: (state) => {
      state.isChanged = true;
      if (state.nonExpenses.length === EXPENSE_MAX_ITEMS) return;
      state.nonExpenses.push({
        amount: "", name: "Non-essential expenses " + (state.nonExpenses.length + 1), type: ExpenseType.NON_EXPENSE, validation: {
          amount: { isValid: true, isFirst: true },
          name: { isValid: true, isFirst: true }
        },
        isDelete: false,
        isFixed: false
      });
    },
    openModal: (state, action: PayloadAction<{ name: string, max: number, selections: Choice[], type: string }>) => {
      const { name, max, selections, type } = action.payload;
      state.selections = selections;
      const field: FocusFields = name as any;
      const list: Choice[] = [];
      switch (field) {
        case "fixedIncome":
          const fixedIncomes = state.fixedIncome.filter(item => item.isFixed).map(n => n.name);
          MULTIPLES_FIXED_INCOME_FIELDS.forEach(c => {
            if (fixedIncomes.includes(c.name)) {
              list.push(c);
            }
          });
          break;
        case "passiveIncome":
          const passiveIncomes = state.passiveIncome.filter(item => item.isFixed).map(n => n.name);
          MULTIPLES_PASSIVE_INCOME_FIELDS.forEach(c => {
            if (passiveIncomes.includes(c.name)) {
              list.push(c);
            }
          });
          break;
        case "expenses":
          const expenses = state.expenses.filter(item => item.isFixed).map(n => n.name);
          MULTIPLES_ESSENTIAL_EXPENSES_FIELDS.forEach(c => {
            if (expenses.includes(c.name)) {
              list.push(c);
            }
          });
          break;
          case "nonExpenses":
            const nonExpenses = state.nonExpenses.filter(item => item.isFixed).map(n => n.name);
            MULTIPLES_NON_ESSENTIAL_EXPENSES_FIELDS.forEach(c => {
              if (nonExpenses.includes(c.name)) {
                list.push(c);
              }
            });
            break;
          default:
            break;
      }

     ;
      state.modal = {
        items: [],
        name: name,
        disabledList: list,
        remain: max - (state as any)[name].length,
         type: type
      }
    },
    updateModal: (state, action: PayloadAction<{ item: Choice, checked: boolean }>) => {
      const { item, checked } = action.payload;
      if (state.modal) {
        let list = Array.from(state.modal.items);
        let remain = state.modal.remain;
        const f = state.modal.items.find(i => i.id === item.id);
        if (checked) {
          if (!f) {
            list.push(item);
            return {
              ...state,
              modal: {
                name: state.modal.name,
                items: list,
                remain: remain - 1,
                type: state.modal.type,
                disabledList: state.modal.disabledList
              }
            }
          }
        } else {
          if (f) {
            list = Array.from(list.filter(i => i.id !== item.id));
            return {
              ...state,
              modal: {
                name: state.modal.name,
                items: list,
                remain: remain + 1,
                type: state.modal.type,
                disabledList: state.modal.disabledList
              }
            }
          }
        }
      }
    },
    closeModal: (state) => {
      state.modal = null;
      state.selections = [];
    },
    submitModal: (state) => {
      if (state.modal) {
        const l: any[] = (state as any)[state.modal.name] as any[];
        state.modal.items.forEach(i => {
          l.push({
            amount: "", name: i.name, type: (state.modal?.type as any), validation: {
              amount: { isValid: true, isFirst: false },
              name: { isValid: true, isFirst: false }
            },
            isDelete: false,
            isFixed: true
          });
        });
      }
      state.modal = null;
    },
    updateField: (state, action: PayloadAction<FormStateItem>) => {
      state.isChanged = true;
      const payload = action.payload;
      const item = (state as any)[payload.name][payload.index];
      switch (payload.attribute) {
        case "amount":
          const value = +payload.value;
          item[payload.attribute] = payload.value;
          const isValid = value !== undefined && value !== null && !isNaN(value) && payload.value !== "" && +value > 0;
          item['validation'][payload.attribute]['isValid'] = isValid;

          if (!isValid) {
            if (payload.value === "") {
              // item['validation'][payload.attribute]['type'] = VALIDATION_TYPE.REQUIRED;
              item['validation'][payload.attribute]['isValid'] = true;
            } else if (isNaN(+value)) {
              item['validation'][payload.attribute]['type'] = VALIDATION_TYPE.INVALID;
            } else if (+value <= 0) {
              item['validation'][payload.attribute]['type'] = VALIDATION_TYPE.LARGER_ZERO;
            }
          } else {
            item['validation'][payload.attribute]['type'] = undefined;
          }
          break;
        default:
          item[payload.attribute] = payload.value;
          const isNameValid = Boolean(payload.value);
          item['validation'][payload.attribute]['isValid'] = isNameValid;
          if (!isNameValid) {
            item['validation'][payload.attribute]['type'] = VALIDATION_TYPE.REQUIRED;
          }

          break;
      }
      item['validation'][payload.attribute]['isFirst'] = false;
    },
    updateCurrentBalance: (state, action: PayloadAction<any>) => {
      state.isChanged = true;
      const value = action.payload;
      state.currentBalance.value = value;
      state.currentBalance.validation.isValid = true;
      if (value === undefined || value === null || value === "") {
        state.currentBalance.validation.type = VALIDATION_TYPE.REQUIRED;
        state.currentBalance.validation.isValid = false;
      } else {
        let isValid = !isNaN(+value);
        if (!isValid) {
          state.currentBalance.validation.type = VALIDATION_TYPE.INVALID;
        } else if (+value <= 0) {
          state.currentBalance.validation.type = VALIDATION_TYPE.LARGER_ZERO;
          isValid = false;
        }
        state.currentBalance.validation.isValid = isValid;
      }
      state.currentBalance.validation.isFirst = false;
    },
    addDebt: (state) => {
      state.isChanged = true;
      if (state.debts.length === 5) return state;
      state.debts.push({
        amount: "",
        annual: "",
        name: "Debt " +(state.debts.length + 1),
        payment: "",
        isDelete: false,
        validation: {
          amount: {
            isFirst: true,
            isValid: false,
            type: VALIDATION_TYPE.REQUIRED
          },
          annual: {
            isFirst: true,
            isValid: false,
            type: VALIDATION_TYPE.REQUIRED
          },
          name: {
            isFirst: true,
            isValid: true
          },
          payment: {
            isFirst: true,
            isValid: false,
            type: VALIDATION_TYPE.REQUIRED
          },
        }
      });
    },
    updateDebt: (state, action: PayloadAction<{name: DebtType, index: number, value: string}>) => {
      state.isChanged = true;
      const {name, value, index} = action.payload;
      state.debts[index].validation[name].isFirst = false;
      state.debts[index].validation[name].type = undefined;
      state.debts[index].validation[name].isValid = true;
      state.debts[index][name] = value;
      if (value === undefined || value === null || value === "") {
        state.debts[index].validation[name].isValid = false;
        state.debts[index].validation[name].type = VALIDATION_TYPE.REQUIRED;
        return state;
      }
      
      switch(name) {
        case "name":
          break;
        case "annual":
          let isAValid = !isNaN(+value);
          if (!isAValid) {
            state.debts[index].validation[name].isValid = false;
            state.debts[index].validation[name].type = VALIDATION_TYPE.INVALID;
          } else if (+value < 0) {
            state.debts[index].validation[name].isValid = false;
            state.debts[index].validation[name].type = VALIDATION_TYPE.POSITIVE;
          }
          break;
        default:
          let isValid = !isNaN(+value);
          if (!isValid) {
            state.debts[index].validation[name].isValid = false;
            state.debts[index].validation[name].type = VALIDATION_TYPE.INVALID;
          } else if (+value <= 0) {
            state.debts[index].validation[name].isValid = false;
            state.debts[index].validation[name].type = VALIDATION_TYPE.LARGER_ZERO;
          }
          break;
      }
    },
    closeErrorMessage: (state) => {
      state.errorMessages = undefined;
    },
    submitForm: (state) => {

      let errors = [];
      let isIncomeValid = true;
      state.fixedIncome.forEach(income => {
        isIncomeValid = isIncomeValid && income.validation.amount.isValid && income.validation.name.isValid;
        // if (income.amount === "" || income.name === "") {
        //   isIncomeValid = false;
        // }
        income.validation.amount.isFirst = false;
        income.validation.name.isFirst = false;
      });
      state.passiveIncome.forEach(income => {
        isIncomeValid = isIncomeValid && income.validation.amount.isValid && income.validation.name.isValid;
        // if (income.amount === "" || income.name === "") {
        //   isIncomeValid = false;
        // }
        income.validation.amount.isFirst = false;
        income.validation.name.isFirst = false;
      });

      // if (!isIncomeValid) errors.push(FORM_FIELD.INCOME);
      
      //Validation Expense
      let isExpensesValid = true;
      state.expenses.forEach(expense => {
        isExpensesValid = isExpensesValid && expense.validation.amount.isValid && expense.validation.name.isValid;
        // if (expense.amount === "" || expense.name === "") {
        //   isExpensesValid = false;
        // }
        expense.validation.amount.isFirst = false;
        expense.validation.name.isFirst = false;
      });
      state.nonExpenses.forEach(nonExpense => {
        isExpensesValid = isExpensesValid && nonExpense.validation.amount.isValid && nonExpense.validation.name.isValid;
        nonExpense.validation.amount.isFirst = false;
        nonExpense.validation.name.isFirst = false;
      });
      let isDebtValid = true;
      state.debts.forEach(debt => {
        isDebtValid = debt.validation.amount.isValid && debt.validation.annual.isValid && debt.validation.name.isValid && debt.validation.payment.isValid;
        debt.validation.amount.isFirst = false;
        debt.validation.annual.isFirst = false;
        debt.validation.name.isFirst = false;
        debt.validation.payment.isFirst = false;
      });
      // if (!isExpensesValid) errors.push(FORM_FIELD.EXPENSES);

      if (!state.currentBalance || !state.currentBalance.validation.isValid || isNaN(+state.currentBalance.value)) {
        errors.push(FORM_FIELD.BALANCE);
      }
      let shouldForm = true;
      shouldForm = shouldForm && isIncomeValid && isExpensesValid && isDebtValid;
      if (state.currentBalance && !state.currentBalance.validation.isValid) {
        shouldForm = false;
        state.currentBalance.validation.isFirst = false;
      }
      if (errors.length > 0) {
          state.errorMessages= errors;
      } else {
          state.errorMessages = undefined;
          state.shouldSent = shouldForm;
      }
    },
    sendForm: (state, action: PayloadAction<{auth: AuthData, form: FormState, isEdit: boolean}>) => {
      state.shouldSent = false;
      state.isSubmit = true;
    },
    sendFormComplete: (state, action) => {
      state.isSubmit = false;
      state.code = action.payload?.data?.code;
      
    },
    sendFormFailure: (state) => {
      state.code = undefined;
      state.isSubmit = false;
    },
    updateForm: (state, action: PayloadAction<string>) =>  {
      state.isChanged = true;
        const item = action.payload;
        state.currentBalance = {
          value: item.toString(),
          validation: {
            isFirst: false,
            isValid: true
          }
        }
    },
    getFormData: (state, action: PayloadAction<{auth: AuthData}>) => {

    },
    getFormDataSuccess: (state, action) => {
      const {data} = action.payload as {data: UserSeason};
      state.isEdit = true;
      if (data) {
        if (data.current_balance) {
          state.currentBalance = {
            value: data.current_balance.toString(),
            validation: {
              isFirst: false,
              isValid: true
            }
          }
        }
        state.fixedIncome = [];
        state.passiveIncome = [];
        state.expenses = [];
        state.nonExpenses = [];
        state.debts = [];
        if (data.incomes) {

          data.incomes.forEach((income, index) => {
            const i = {
              id: income.id,
              amount: income.amount ? income.amount.toString(): "", name: income.name, type: income.type, validation: {
                amount: { isValid: true, isFirst: false, type: VALIDATION_TYPE.REQUIRED },
                name: { isValid: true, isFirst: false, type: VALIDATION_TYPE.REQUIRED }
              },
              isDelete: false,
              isFixed: income.type === IncomeType.FIXED_INCOME ? isFixedActiveIncome(income.name) : isFixedPassiveIncome(income.name)
            }
            if (i.type === IncomeType.FIXED_INCOME) {
              state.fixedIncome.push(i);
            } else {
              state.passiveIncome.push(i);
            }
          });
          
        }
        if (data.expenses) {
          data.expenses.forEach((expense, index) => {
            const i = {
              id: expense.id,
              amount: expense.amount ? expense.amount.toString(): "", name: expense.name, type: expense.type, validation: {
                amount: { isValid: true, isFirst: false, type: VALIDATION_TYPE.REQUIRED },
                name: { isValid: true, isFirst: false, type: VALIDATION_TYPE.REQUIRED }
              },
              isDelete: false,
              isFixed: expense.type === ExpenseType.EXPENSE ? isFixedExpenseIncome(expense.name): isFixedNonExpenseIncome(expense.name)
            }
            if (i.type === ExpenseType.EXPENSE) {
              state.expenses.push(i);
            } else {
              state.nonExpenses.push(i);
            }
          });
        }

        if (data.debts) {
          data.debts.forEach((debt, index) => {
            state.debts.push({
              id: debt.id,
              amount: debt.remaining_amount.toString(),
              annual: debt.annual_interest.toString(),
              name: debt.name,
              payment: debt.monthly_payment.toString(),
              isDelete: false,
              validation: {
                amount: {
                  isFirst: false,
                  isValid: true,
                  type: VALIDATION_TYPE.REQUIRED
                },
                annual: {
                  isFirst: false,
                  isValid: true,
                  type: VALIDATION_TYPE.REQUIRED
                },
                name: {
                  isFirst: false,
                  isValid: true,
                  type: VALIDATION_TYPE.REQUIRED
                },
                payment: {
                  isFirst: false,
                  isValid: true,
                  type: VALIDATION_TYPE.REQUIRED
                },
              }
            });
          });
        }
      }
      
    },
    getFormDataFailure: (state) => {
      state.isEdit = false;
    },
    clearForm: (state) => {

      return {...initialState};
    },
    setSelections: (state, action: PayloadAction<Choice[]>) => {
      state.selections = action.payload;
    },
    setFocus: (state, action: PayloadAction<{isFocus: boolean, field: FocusFields, index: number}>) => {
      const {isFocus, field, index} = action.payload;
      if (isFocus) {
        state.focus = {
          [field]: index
        }
        state.deleteId = `checkbox-item-${field}-${index}`;
      } else {
        // if (!state.focus[field]) {

        // }
        // state.focus[field] = undefined;
      }
    },
    deleteItem: (state, action: PayloadAction<{index: number, field: FocusFields}>) => {
      const {index, field} = action.payload;
      const id = `checkbox-item-${field}-${index}`;
      if (id !== state.deleteId) {
        return;
      }
      state.isChanged = true;
     
      const items: any[] = state[field];
      const list: any[] = [];
      items.forEach((value,ind) => {
        if (ind !== index) {
          list.push(Object.assign({}, value));
        } else {
          if (value.id) {
            state.deleteItems[field].push(value.id);
          }
        }
      });
      state[field] = Array.from(list);
    },
    setDeleteId: (state, action: PayloadAction<string | undefined>) => {
      state.deleteId = action.payload;
    }
  },
});

// Action creators are generated for each case reducer function
export const { addFixedIncome, addPassiveIncome, updateField, openModal, closeModal,
  updateModal, submitModal, addExpense, addNonExpense,
  updateCurrentBalance, 
  addDebt, updateDebt,submitForm, closeErrorMessage,
  sendForm, sendFormComplete, sendFormFailure, getFormData, getFormDataSuccess, getFormDataFailure, clearForm,
  setSelections, setFocus, deleteItem, setDeleteId } =
  formSlice.actions

export default formSlice.reducer
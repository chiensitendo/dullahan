import { AuthData } from "@/components/use-auth";
import { Choice, ExpenseType, FORM_FIELD, IncomeType, UserSeason, VALIDATION_TYPE } from "@/type"
import { EXPENSE_MAX_ITEMS, INCOME_MAX_ITEMS } from "@/type/const"
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
  amount: string;
  name: string;
  type: IncomeType;
  id?: number;
}

export interface ExpenseData {
  validation: IncomeValidationItem;
  isDelete: boolean;
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
  remain: number
}

export enum FIELD_NAME {
  FIXED_INCOME = "fixedIncome",
  EXPENSES = "expenses"
}

export interface IncomeDeleteState {
  isDelete: boolean;
  fixedIncome: number[];
  passiveIncome: number[];
  isAllFixedIncome: boolean;
  isAllPassiveIncome: boolean;
  isIndeterminateFixedIncome: boolean;
  isIndeterminatePassiveIncome: boolean;
}

export interface ExpenseDeleteState {
  isDelete: boolean;
  expenses: number[];
  nonExpenses: number[];
  isAllExpenses: boolean;
  isAllNonExpenses: boolean;
  isIndeterminateExpenses: boolean;
  isIndeterminateNonExpenses: boolean;
}

export interface DebtDeleteState {
  isDelete: boolean;
  items: number[];
}


export interface FormState {
  fixedIncome: IncomeData[];
  passiveIncome: IncomeData[];
  expenses: ExpenseData[];
  nonExpenses: ExpenseData[];
  modal: ModalItem | null;
  incomeDelete: IncomeDeleteState;
  expenseDelete: ExpenseDeleteState;
  currentBalance?: CurrentBalance;
  debts: DebtData[];
  debtDelete: DebtDeleteState;
  errorMessages?: string[];
  isActionRequired: boolean;
  shouldSent: boolean;
  code?: string;
  isSubmit: boolean;
  isEdit: boolean;
}

const initialState: FormState = {
  fixedIncome: [
    {
      amount: "", name: "", type: IncomeType.FIXED_INCOME, validation: {
        amount: { isValid: false, isFirst: true, type: VALIDATION_TYPE.REQUIRED },
        name: { isValid: false, isFirst: true, type: VALIDATION_TYPE.REQUIRED }
      },
      isDelete: false
    }
  ],
  passiveIncome: [
    {
      amount: "", name: "", type: IncomeType.PASSIVE_INCOME, validation: {
        amount: { isValid: false, isFirst: true, type: VALIDATION_TYPE.REQUIRED },
        name: { isValid: false, isFirst: true, type: VALIDATION_TYPE.REQUIRED }
      },
      isDelete: false
    }
  ],
  expenses: [
    {
      amount: "", name: "", type: ExpenseType.EXPENSE, validation: {
        amount: { isValid: false, isFirst: true, type: VALIDATION_TYPE.REQUIRED },
        name: { isValid: false, isFirst: true, type: VALIDATION_TYPE.REQUIRED }
      },
      isDelete: false
    }
  ],
  nonExpenses: [
    {
      amount: "", name: "", type: ExpenseType.NON_EXPENSE, validation: {
        amount: { isValid: false, isFirst: true, type: VALIDATION_TYPE.REQUIRED },
        name: { isValid: false, isFirst: true, type: VALIDATION_TYPE.REQUIRED }
      },
      isDelete: false
    }
  ],
  modal: null,
  incomeDelete: {
    isDelete: false,
    fixedIncome: [],
    passiveIncome: [],
    isAllFixedIncome: false,
    isAllPassiveIncome: false,
    isIndeterminateFixedIncome: false,
    isIndeterminatePassiveIncome: false
  },
  expenseDelete: {
    isDelete: false,
    expenses: [],
    nonExpenses: [],
    isAllExpenses: false,
    isAllNonExpenses: false,
    isIndeterminateExpenses: false,
    isIndeterminateNonExpenses: false
  },
  debts: [],
  debtDelete: {
    isDelete: false,
    items: []
  },
  isActionRequired: false,
  shouldSent: false,
  isSubmit: false,
  isEdit: false
}

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    addFixedIncome: (state) => {
      if (state.fixedIncome.length === INCOME_MAX_ITEMS) return;
      state.fixedIncome.push({
        amount: "", name: "", type: IncomeType.FIXED_INCOME, validation: {
          amount: { isValid: false, isFirst: true, type: VALIDATION_TYPE.REQUIRED },
          name: { isValid: false, isFirst: true, type: VALIDATION_TYPE.REQUIRED }
        },
        isDelete: false
      });
    },
    addPassiveIncome: (state) => {
      if (state.passiveIncome.length === INCOME_MAX_ITEMS) return;
      state.passiveIncome.push({
        amount: "", name: "", type: IncomeType.PASSIVE_INCOME, validation: {
          amount: { isValid: false, isFirst: true, type: VALIDATION_TYPE.REQUIRED },
          name: { isValid: false, isFirst: true, type: VALIDATION_TYPE.REQUIRED }
        },
        isDelete: false
      });
    },
    addExpense: (state) => {
      if (state.expenses.length === EXPENSE_MAX_ITEMS) return;
      state.expenses.push({
        amount: "", name: "", type: ExpenseType.EXPENSE, validation: {
          amount: { isValid: false, isFirst: true, type: VALIDATION_TYPE.REQUIRED },
          name: { isValid: false, isFirst: true, type: VALIDATION_TYPE.REQUIRED }
        },
        isDelete: false
      });
    },
    addNonExpense: (state) => {
      if (state.nonExpenses.length === EXPENSE_MAX_ITEMS) return;
      state.nonExpenses.push({
        amount: "", name: "", type: ExpenseType.NON_EXPENSE, validation: {
          amount: { isValid: false, isFirst: true, type: VALIDATION_TYPE.REQUIRED },
          name: { isValid: false, isFirst: true, type: VALIDATION_TYPE.REQUIRED }
        },
        isDelete: false
      });
    },
    openModal: (state, action: PayloadAction<{ name: string, max: number }>) => {
      const { name, max } = action.payload;
      state.modal = {
        items: [],
        name: name,
        remain: max - (state as any)[name].length
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
                remain: remain - 1
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
                remain: remain + 1
              }
            }
          }
        }
      }
    },
    closeModal: (state) => {
      state.modal = null;
    },
    submitModal: (state) => {
      if (state.modal) {
        let type = IncomeType.PASSIVE_INCOME;
        switch (state.modal.name) {
          case FIELD_NAME.FIXED_INCOME:
            type = IncomeType.FIXED_INCOME;
            break;
          default:
            break;
        }
        const l: IncomeData[] = (state as any)[state.modal.name] as IncomeData[];
        state.modal.items.forEach(i => {
          l.push({
            amount: "", name: i.name, type: type, validation: {
              amount: { isValid: false, isFirst: false },
              name: { isValid: true, isFirst: false }
            },
            isDelete: false
          });
        });
      }
      state.modal = null;
    },
    updateField: (state, action: PayloadAction<FormStateItem>) => {
      const payload = action.payload;
      const item = (state as any)[payload.name][payload.index];
      switch (payload.attribute) {
        case "amount":
          const value = +payload.value;
          item[payload.attribute] = payload.value;
          const isValid = value !== undefined && value !== null && !isNaN(value) && payload.value !== "";
          item['validation'][payload.attribute]['isValid'] = isValid;

          if (!isValid) {
            if (payload.value === "") {
              item['validation'][payload.attribute]['type'] = VALIDATION_TYPE.REQUIRED;
            } else {
              item['validation'][payload.attribute]['type'] = VALIDATION_TYPE.INVALID;
            }
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
    openIncomeDelete: (state) => {
      state.incomeDelete = {
        isDelete: true,
        fixedIncome: [],
        passiveIncome: [],
        isAllFixedIncome: false,
        isAllPassiveIncome: false,
        isIndeterminateFixedIncome: false,
        isIndeterminatePassiveIncome: false
      }
    },
    openExpenseDelete: (state) => {
      state.expenseDelete = {
        isDelete: true,
        expenses: [],
        nonExpenses: [],
        isAllExpenses: false,
        isAllNonExpenses: false,
        isIndeterminateExpenses: false,
        isIndeterminateNonExpenses: false
      };
    },
    closeIncomeDelete: (state) => {
      const { fixedIncome, passiveIncome } = state.incomeDelete;
      if (fixedIncome.length > 0) {
        fixedIncome.forEach(id => {
          state.fixedIncome[id].isDelete = false;
        });
      }
      if (passiveIncome.length > 0) {
        passiveIncome.forEach(id => {
          state.passiveIncome[id].isDelete = false;
        });
      }
      state.incomeDelete = {
        isDelete: false,
        fixedIncome: [],
        passiveIncome: [],
        isAllFixedIncome: false,
        isAllPassiveIncome: false,
        isIndeterminateFixedIncome: false,
        isIndeterminatePassiveIncome: false
      };
    },
    closeExpenseDelete: (state) => {
      const { expenses, nonExpenses } = state.expenseDelete;
      if (expenses.length > 0) {
        expenses.forEach(id => {
          state.expenses[id].isDelete = false;
        });
      }
      if (nonExpenses.length > 0) {
        nonExpenses.forEach(id => {
          state.nonExpenses[id].isDelete = false;
        });
      }
      state.expenseDelete = {
        isDelete: false,
        expenses: [],
        nonExpenses: [],
        isAllExpenses: false,
        isAllNonExpenses: false,
        isIndeterminateExpenses: false,
        isIndeterminateNonExpenses: false
      };
    },
    updateIncomeDelete: (state, action: PayloadAction<{ index: number, name: string, checked: boolean }>) => {
      const { index, name, checked } = action.payload;
      if (!state.incomeDelete.isDelete) {
        return state;
      }
      const item: IncomeData[] = (state as any)[name];
      let ids: number[] = Array.from((state.incomeDelete as any)[name]);
      if ((state as any)[name]) {
        if (checked) {
          item[index].isDelete = true;
          ids.push(index);
        } else {
          item[index].isDelete = false;
          ids = ids.filter((v) => v !== index);
        }
        (state.incomeDelete as any)[name] = ids;
        if (name === FIELD_NAME.FIXED_INCOME) {
          let isAllFixedIncome = item.reduce((a, i) => a && i.isDelete, true);
          if (isAllFixedIncome) {
            state.incomeDelete.isIndeterminateFixedIncome = false;
            state.incomeDelete.isAllFixedIncome = true;
          } else if (ids.length === 0) {
            state.incomeDelete.isIndeterminateFixedIncome = false;
            state.incomeDelete.isAllFixedIncome = false;
          } else {
            state.incomeDelete.isIndeterminateFixedIncome = true;
            state.incomeDelete.isAllFixedIncome = false;
          }
        } else {
          let isAllPassiveIncome = item.reduce((a, i) => a && i.isDelete, true);
          if (isAllPassiveIncome) {
            state.incomeDelete.isIndeterminatePassiveIncome = false;
            state.incomeDelete.isAllPassiveIncome = true;
          } else if ((state.incomeDelete as any)[name].length === 0) {
            state.incomeDelete.isIndeterminatePassiveIncome = false;
            state.incomeDelete.isAllPassiveIncome = false;
          } else {
            state.incomeDelete.isIndeterminatePassiveIncome = true;
            state.incomeDelete.isAllPassiveIncome = false;
          }
        }
      }
    },
    updateExpenseDelete: (state, action: PayloadAction<{ index: number, name: string, checked: boolean }>) => {
      const { index, name, checked } = action.payload;
      if (!state.expenseDelete.isDelete) {
        return state;
      }
      const item: IncomeData[] = (state as any)[name];
      let ids: number[] = Array.from((state.expenseDelete as any)[name]);
      if ((state as any)[name]) {
        if (checked) {
          item[index].isDelete = true;
          ids.push(index);
        } else {
          item[index].isDelete = false;
          ids = ids.filter((v) => v !== index);
        }
        (state.expenseDelete as any)[name] = ids;
        if (name === FIELD_NAME.EXPENSES) {
          let isAllExpenses = item.reduce((a, i) => a && i.isDelete, true);
          if (isAllExpenses) {
            state.expenseDelete.isIndeterminateExpenses = false;
            state.expenseDelete.isAllExpenses = true;
          } else if (ids.length === 0) {
            state.expenseDelete.isIndeterminateExpenses = false;
            state.expenseDelete.isAllExpenses = false;
          } else {
            state.expenseDelete.isIndeterminateExpenses = true;
            state.expenseDelete.isAllExpenses = false;
          }
        } else {
          let isAllNonExpenses = item.reduce((a, i) => a && i.isDelete, true);
          if (isAllNonExpenses) {
            state.expenseDelete.isIndeterminateNonExpenses = false;
            state.expenseDelete.isAllNonExpenses = true;
          } else if ((state.expenseDelete as any)[name].length === 0) {
            state.expenseDelete.isIndeterminateNonExpenses = false;
            state.expenseDelete.isAllNonExpenses = false;
          } else {
            state.expenseDelete.isIndeterminateNonExpenses = true;
            state.expenseDelete.isAllNonExpenses = false;
          }
        }
      }
    },
    deleteIncome: (state) => {
      if (state.incomeDelete.isDelete) {
        const filteredFixedIncome = state.fixedIncome.filter((_, i) => !state.incomeDelete.fixedIncome.includes(i));
        const filteredPassiveIncome = state.passiveIncome.filter((_, i) => !state.incomeDelete.passiveIncome.includes(i));
        if (filteredFixedIncome.length === 0) {
          filteredFixedIncome.push({
            amount: "", name: "", type: IncomeType.FIXED_INCOME, validation: {
              amount: { isValid: false, isFirst: true, type: VALIDATION_TYPE.REQUIRED },
              name: { isValid: false, isFirst: true, type: VALIDATION_TYPE.REQUIRED }
            },
            isDelete: false
          });
        }
        if (filteredPassiveIncome.length === 0) {
          filteredPassiveIncome.push({
            amount: "", name: "", type: IncomeType.PASSIVE_INCOME, validation: {
              amount: { isValid: false, isFirst: true, type: VALIDATION_TYPE.REQUIRED },
              name: { isValid: false, isFirst: true, type: VALIDATION_TYPE.REQUIRED }
            },
            isDelete: false
          });
        }
        return {
          ...state,
          fixedIncome: filteredFixedIncome,
          passiveIncome: filteredPassiveIncome,
          incomeDelete: {
            isDelete: false,
            fixedIncome: [],
            passiveIncome: [],
            isAllFixedIncome: false,
            isAllPassiveIncome: false,
            isIndeterminateFixedIncome: false,
            isIndeterminatePassiveIncome: false
          }
        }
      }
    },
    deleteExpense: (state) => {
      if (state.expenseDelete.isDelete) {
        const filteredExpenses = state.expenses.filter((_, i) => !state.expenseDelete.expenses.includes(i));
        const filteredNonExpenses = state.nonExpenses.filter((_, i) => !state.expenseDelete.nonExpenses.includes(i));
        if (filteredExpenses.length === 0) {
          filteredExpenses.push({
            amount: "", name: "", type: ExpenseType.EXPENSE, validation: {
              amount: { isValid: false, isFirst: true, type: VALIDATION_TYPE.REQUIRED },
              name: { isValid: false, isFirst: true, type: VALIDATION_TYPE.REQUIRED }
            },
            isDelete: false
          });
        }
        if (filteredNonExpenses.length === 0) {
          filteredNonExpenses.push({
            amount: "", name: "", type: ExpenseType.NON_EXPENSE, validation: {
              amount: { isValid: false, isFirst: true, type: VALIDATION_TYPE.REQUIRED },
              name: { isValid: false, isFirst: true, type: VALIDATION_TYPE.REQUIRED }
            },
            isDelete: false
          });
        }
        return {
          ...state,
          expenses: filteredExpenses,
          nonExpenses: filteredNonExpenses,
          expenseDelete: {
            isDelete: false,
            expenses: [],
            nonExpenses: [],
            isAllExpenses: false,
            isAllNonExpenses: false,
            isIndeterminateExpenses: false,
            isIndeterminateNonExpenses: false
          }
        }
      }
    },
    selectAllIncome: (state, action: PayloadAction<{ isAll: boolean, name: string }>) => {
      const { isAll, name } = action.payload;
      if (state.incomeDelete.isDelete) {
        if (name === FIELD_NAME.FIXED_INCOME) {
          state.incomeDelete.isAllFixedIncome = isAll;
          state.incomeDelete.isIndeterminateFixedIncome = false;
        } else {
          state.incomeDelete.isAllPassiveIncome = isAll;
          state.incomeDelete.isIndeterminatePassiveIncome = false;
        }
        if (isAll) {
          (state.incomeDelete as any)[name] = ((state as any)[name] as IncomeData[]).map((v, i) => {
            v.isDelete = true;
            return i;
          });
        } else {
          (state.incomeDelete as any)[name] = [];
          ((state as any)[name] as IncomeData[]).forEach(v => {
            v.isDelete = false;
          })
        }
      }
    },
    selectAllExpense: (state, action: PayloadAction<{ isAll: boolean, name: string }>) => {
      const { isAll, name } = action.payload;
      if (state.expenseDelete.isDelete) {
        if (name === FIELD_NAME.EXPENSES) {
          state.expenseDelete.isAllExpenses = isAll;
          state.expenseDelete.isIndeterminateExpenses = false;
        } else {
          state.expenseDelete.isAllNonExpenses = isAll;
          state.expenseDelete.isIndeterminateNonExpenses = false;
        }
        if (isAll) {
          (state.expenseDelete as any)[name] = ((state as any)[name] as IncomeData[]).map((v, i) => {
            v.isDelete = true;
            return i;
          });
        } else {
          (state.expenseDelete as any)[name] = [];
          ((state as any)[name] as IncomeData[]).forEach(v => {
            v.isDelete = false;
          })
        }
      }
    },
    addCurrentBalance: (state) => {
      state.currentBalance = {
        value: "",
        validation: {
          isFirst: true,
          isValid: false
        }
      }
    },
    removeCurrentBalance: (state) => {
      state.currentBalance = undefined;
    },
    updateCurrentBalance: (state, action: PayloadAction<any>) => {
      if (!state.currentBalance) return state;
      
      const value = action.payload;
      state.currentBalance.value = value;
      state.currentBalance.validation.isValid = true;
      if (value === undefined || value === null || value === "") {
        state.currentBalance.validation.type = VALIDATION_TYPE.REQUIRED;
        state.currentBalance.validation.isValid = false;
      } else {
        const isValid = !isNaN(+value);
        if (!isValid) {
          state.currentBalance.validation.type = VALIDATION_TYPE.INVALID;
        }
        state.currentBalance.validation.isValid = isValid;
      }
      state.currentBalance.validation.isFirst = false;
    },
    addDebt: (state) => {
      if (state.debts.length === 5) return state;
      state.debts.push({
        amount: "",
        annual: "",
        name: "",
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
            isValid: false,
            type: VALIDATION_TYPE.REQUIRED
          },
          payment: {
            isFirst: true,
            isValid: false,
            type: VALIDATION_TYPE.REQUIRED
          },
        }
      });
    },
    openDebt: (state) => {
      state.debtDelete = {
        isDelete: true,
        items: []
      }
    },
    closeDebt: (state) => {
      state.debtDelete = {
        isDelete: false,
        items: []
      }
    },
    updateDebt: (state, action: PayloadAction<{name: DebtType, index: number, value: string}>) => {

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
        default:
          const isValid = !isNaN(+value);
          if (!isValid) {
            state.debts[index].validation[name].isValid = false;
            state.debts[index].validation[name].type = VALIDATION_TYPE.INVALID;
          }
          break;
      }
    },
    updateDebtDelete: (state, action: PayloadAction<{index: number, checked: boolean}>) => {
      const { index, checked} = action.payload;
      if (!state.debtDelete.isDelete) {
        return state;
      }
      state.debts[index].isDelete = checked;
      if (checked){
        state.debtDelete.items.push(index);
      } else {
        state.debtDelete.items = state.debtDelete.items.filter((v) => v !== index);
      }
    },
    deleteDebts: (state) => {
      return {
        ...state,
        debts: state.debts.filter((debt, index) => !state.debtDelete.items.includes(index)),
        debtDelete: {
          isDelete: false,
          items: []
        }
      }
    },
    closeErrorMessage: (state) => {
      state.errorMessages = undefined;
    },
    closeActionRequired: (state) => {
      state.isActionRequired = false;
    },
    submitForm: (state) => {

      const isActionRequired = state.incomeDelete.isDelete || state.debtDelete.isDelete || state.expenseDelete.isDelete;

      state.isActionRequired = isActionRequired;
      if (isActionRequired) {
        return state;
      }
      let errors = [];
      let isIncomeValid = true;
      state.fixedIncome.forEach(income => {
        isIncomeValid = isIncomeValid && income.validation.amount.isValid && income.validation.name.isValid;
        if (income.amount === "" || income.name === "") {
          isIncomeValid = false;
        }
        income.validation.amount.isFirst = false;
        income.validation.name.isFirst = false;
      });
      state.passiveIncome.forEach(income => {
        isIncomeValid = isIncomeValid && income.validation.amount.isValid && income.validation.name.isValid;
        if (income.amount === "" || income.name === "") {
          isIncomeValid = false;
        }
        income.validation.amount.isFirst = false;
        income.validation.name.isFirst = false;
      });
      if (!isIncomeValid) errors.push(FORM_FIELD.INCOME);
      
      //Validation Expense
      let isExpensesValid = true;
      state.expenses.forEach(expense => {
        isExpensesValid = isExpensesValid && expense.validation.amount.isValid && expense.validation.name.isValid;
        if (expense.amount === "" || expense.name === "") {
          isExpensesValid = false;
        }
        expense.validation.amount.isFirst = false;
        expense.validation.name.isFirst = false;
      });
      if (!isExpensesValid) errors.push(FORM_FIELD.EXPENSES);

      if (!state.currentBalance || !state.currentBalance.validation.isValid || isNaN(+state.currentBalance.value)) {
        errors.push(FORM_FIELD.BALANCE);
      }
      let shouldForm = true;
      if (state.currentBalance && !state.currentBalance.validation.isValid) {
        shouldForm = false;
        state.currentBalance.validation.isFirst = false;
      }
      if (state.debts.length > 0) {
        shouldForm = state.debts.reduce((acc, item) => {
          item.validation.amount.isFirst = false;
          item.validation.annual.isFirst = false;
          item.validation.name.isFirst = false;
          item.validation.payment.isFirst = false;
          return acc && item.validation.amount.isValid && 
          item.validation.annual.isValid &&
          item.validation.name.isValid &&
          item.validation.payment.isValid
        }, true);
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
        if (data.incomes) {
          const isContainFixed = data.incomes.findIndex(income => income.type === IncomeType.FIXED_INCOME) > -1;
          const isContainPassive = data.incomes.findIndex(income => income.type === IncomeType.PASSIVE_INCOME) > -1;
          if (isContainFixed) {
            state.fixedIncome = [];
          }
          if (isContainPassive) {
            state.passiveIncome = [];
          }
          data.incomes.forEach((income, index) => {
            if ((index + 1) <= INCOME_MAX_ITEMS) {
              const i = {
                id: income.id,
                amount: income.amount.toString(), name: income.name, type: income.type, validation: {
                  amount: { isValid: true, isFirst: false, type: VALIDATION_TYPE.REQUIRED },
                  name: { isValid: true, isFirst: false, type: VALIDATION_TYPE.REQUIRED }
                },
                isDelete: false
              }
              if (i.type === IncomeType.FIXED_INCOME) {
                state.fixedIncome.push(i);
              } else {
                state.passiveIncome.push(i);
              }
            }
          });
          const isContainExpense = data.expenses.findIndex(expense => expense.type === ExpenseType.EXPENSE) > -1;
          const isContainNonExpense = data.expenses.findIndex(expense => expense.type === ExpenseType.NON_EXPENSE) > -1;
          if (isContainExpense) {
            state.expenses = [];
          }
          if (isContainNonExpense) {
            state.nonExpenses = [];
          }
          data.expenses.forEach((expense, index) => {
            if ((index + 1) <= EXPENSE_MAX_ITEMS) {
              const i = {
                id: expense.id,
                amount: expense.amount.toString(), name: expense.name, type: expense.type, validation: {
                  amount: { isValid: true, isFirst: false, type: VALIDATION_TYPE.REQUIRED },
                  name: { isValid: true, isFirst: false, type: VALIDATION_TYPE.REQUIRED }
                },
                isDelete: false
              }
              if (i.type === ExpenseType.EXPENSE) {
                state.expenses.push(i);
              } else {
                state.nonExpenses.push(i);
              }
            }
          });
          if (data.debts) {
            data.debts.forEach((debt, index) => {
              if ((index + 1) <= INCOME_MAX_ITEMS) {
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
              }
            });
          }
        }
      }
      
    },
    getFormDataFailure: (state) => {
      state.isEdit = false;
    }
  },
})

// Action creators are generated for each case reducer function
export const { addFixedIncome, addPassiveIncome, updateField, openModal, closeModal,
  updateModal, submitModal, addExpense, addNonExpense,
  openIncomeDelete, closeIncomeDelete,
  updateIncomeDelete, deleteIncome, selectAllIncome,
  openExpenseDelete, closeExpenseDelete,
  updateExpenseDelete, 
  deleteExpense, selectAllExpense, addCurrentBalance, removeCurrentBalance, updateCurrentBalance, 
  addDebt, openDebt, closeDebt, updateDebt, updateDebtDelete, deleteDebts,submitForm, closeErrorMessage,
  sendForm, sendFormComplete, sendFormFailure, getFormData, getFormDataSuccess, getFormDataFailure } =
  formSlice.actions

export default formSlice.reducer
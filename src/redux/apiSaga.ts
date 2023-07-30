import {
  createCurrentBalance,
  createCustomerDebt,
  createCustomerExpense,
  createCustomerIncomes,
  deleteCustomerDebt,
  deleteCustomerExpense,
  deleteCustomerIncomes,
  editCustomerDebt,
  editCustomerExpense,
  editCustomerIncomes,
  getCustomerMe,
  getLineChartData,
  getTimelineLineChartData,
  resumeASeason,
  startNewSeason,
} from "@/apis/apis";
import { AuthData } from "@/components/use-auth";
import { all, put, takeLatest, call } from "@redux-saga/core/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  FormState,
  getFormDataFailure,
  getFormDataSuccess,
  sendFormComplete,
  sendFormFailure,
} from "./formSlice";
import {
    CredentialData,
  CustomerDebtCreationData,
  CustomerExpenseCreationDataRequest,
  CustomerIncomeCreationDataRequest,
} from "@/type";
import { setIsLoading, setNotification, startNewSessonFailure, startNewSessonSuccess, submitCodeFailure, submitCodeSuccess } from "./notiSlice";
import { getCustomerMeDataFailure, getCustomerMeDataSuccess, getLineChartDataSuccess, getTimelineChartDataFailure, getTimelineChartDataSuccess } from "./customerSlice";


class BoundaryItem<T> {
  id?: number;
  item!: T;
}

const getAmount = (amount: string) => {
  if (!amount || isNaN(+amount)) return 0;
  return +amount;
}

function convertToIncomeResponse(form: FormState): {
  isValid: boolean;
  requests: BoundaryItem<CustomerIncomeCreationDataRequest>[];
} {
  let isValid = true;
  const items: BoundaryItem<CustomerIncomeCreationDataRequest>[] = [];
  if (
    form.fixedIncome &&
    form.passiveIncome
  ) {
    form.fixedIncome.forEach((income) => {
      if ( income.name) {
        items.push({
          id: income.id,
          item: {
            amount: getAmount(income.amount),
            name: income.name,
            type: income.type,
          },
        });
      }
    });
    form.passiveIncome.forEach((income) => {
      if (income.name) {
        items.push({
          id: income.id,
          item: {
            amount: getAmount(income.amount),
            name: income.name,
            type: income.type,
          },
        });
      }
    });
    isValid = items.length >= 0;
  }
  return { isValid: isValid, requests: items };
}

function convertToExpensesResponse(form: FormState): {
  isValid: boolean;
  requests: BoundaryItem<CustomerExpenseCreationDataRequest>[];
} {
  let isValid = true;
  const items: BoundaryItem<CustomerExpenseCreationDataRequest>[] = [];
  if (form.expenses && form.expenses.length > 0) {
    form.expenses.forEach((expense) => {
      if (expense.name) {
        items.push({
          id: expense.id,
          item: {
            amount: getAmount(expense.amount),
            name: expense.name,
            type: expense.type,
          },
        });
      }
    });
    if (form.nonExpenses) {
      form.nonExpenses.forEach((expense) => {
        if (expense.name) {
          items.push({
            id: expense.id,
            item: {
              amount: getAmount(expense.amount),
              name: expense.name,
              type: expense.type,
            },
          });
        }
      });
    }
  }
  return { isValid: isValid, requests: items };
}

function convertToDebt(form: FormState): {
  isValid: boolean;
  requests: BoundaryItem<CustomerDebtCreationData>[];
} {
  let isValid = false;
  const items: BoundaryItem<CustomerDebtCreationData>[] = [];
  if (form.debts) {
    form.debts.forEach((debt) => {
      if (
        +debt.annual >= 0 &&
        +debt.payment > 0 &&
        debt.name &&
        +debt.amount > 0
      ) {
        isValid = true;
        items.push({
          id: debt.id,
          item: {
            annual_interest: +debt.annual,
            monthly_payment: +debt.payment,
            name: debt.name,
            remaining_amount: +debt.amount,
            type: "FIXED",
          },
        });
      }
    });
  }
  return { isValid: isValid, requests: items };
}

export function* sendFormSaga(
  action: PayloadAction<{ auth: AuthData; form: FormState; isEdit: boolean }>
) {
  try {
    yield put(setIsLoading(true));
    const { auth, form, isEdit } = action.payload;
    const { isValid: isIncomeValid, requests: incomeRequests } =
      convertToIncomeResponse(form);
    const { isValid: isExpenseValid, requests: expenseRequests } =
      convertToExpensesResponse(form);
    const { isValid: isDebtValid, requests: debtRequests } =
      convertToDebt(form);

    if (
      isIncomeValid &&
      isExpenseValid &&
      form.currentBalance &&
      form.currentBalance.value
    ) {
      yield incomeRequests
        .filter((request) => !request.id)
        .forEach((request) => {
          return createCustomerIncomes(auth, request.item);
        });
      yield incomeRequests
        .filter((request) => !!request.id)
        .forEach((request) => {
          return editCustomerIncomes(auth, request.item, request.id);
        });

      yield expenseRequests
        .filter((request) => !request.id)
        .forEach((request) => {
          return createCustomerExpense(auth, request.item);
        });
      yield expenseRequests
        .filter((request) => !!request.id)
        .forEach((request) => {
          return editCustomerExpense(auth, request.item, request.id);
        });

      yield createCurrentBalance(auth, {
        current_balance: +form.currentBalance.value,
      });

      if (isDebtValid) {
        yield debtRequests
          .filter((request) => !request.id)
          .forEach((request) => {
            return createCustomerDebt(auth, request.item);
          });
        yield debtRequests
          .filter((request) => !!request.id)
          .forEach((request) => {
            return editCustomerDebt(auth, request.item, request.id);
          });
      }
      yield form.deleteItems.fixedIncome.forEach((id) => {
        return deleteCustomerIncomes(auth, id);
      });
      yield form.deleteItems.passiveIncome.forEach((id) => {
        return deleteCustomerIncomes(auth, id);
      });
      yield form.deleteItems.expenses.forEach((id) => {
        return deleteCustomerExpense(auth, id);
      });
      yield form.deleteItems.nonExpenses.forEach((id) => {
        return deleteCustomerExpense(auth, id);
      });
      yield form.deleteItems.debts.forEach((id) => {
        return deleteCustomerDebt(auth, id);
      });
      let result: Response = yield getCustomerMe(auth);

      yield put(sendFormComplete(result));
    } else {
      yield put(sendFormFailure());
      yield put(
        setNotification({
          message: "Something wrong with your input!",
          title: "ERROR",
        })
      );
    }
    yield put(setIsLoading(false));
  } catch (e) {
    yield put(sendFormFailure());
    yield put(
      setNotification({
        message: "Server Error!",
        title: "ERROR",
      })
    );
    yield put(setIsLoading(false));
  }
}

export function* getFormData(action: PayloadAction<{ auth: AuthData }>) {
  try {
    yield put(setIsLoading(true));
    let result: Response = yield call(getCustomerMe, action.payload.auth);
    yield put(getFormDataSuccess(result));
  } catch (e) {
    yield put(getFormDataFailure());
    yield put(
        setNotification({
          message: "Server Error! Please try again!",
          title: "ERROR",
        })
      );
  } finally {
    yield put(setIsLoading(false));
  }
}

export function* getCustomerMeData(action: PayloadAction<{ auth: AuthData }>) {
  try {
    yield put(setIsLoading(true));
    let result: Response = yield call(getCustomerMe, action.payload.auth);
    yield put(getCustomerMeDataSuccess(result));
  } catch (e) {
    yield put(getCustomerMeDataFailure());
    yield put(
        setNotification({
          message: "Server Error! Please try again!",
          title: "ERROR",
        })
      );
  } finally {
    yield put(setIsLoading(false));
  }
}

export function* getLineChartDataSaga(action: PayloadAction<{ auth: AuthData }>) {
  try {
    yield put(setIsLoading(true));
    let result: Response = yield call(getLineChartData, action.payload.auth);
    yield put(getLineChartDataSuccess(result));
  } catch (e) {
    yield put(getCustomerMeDataFailure());
    yield put(
        setNotification({
          message: "Could not load line chart data! Please try again!",
          title: "ERROR",
        })
      );
  } finally {
    yield put(setIsLoading(false));
  }
}

export function* getTimelineChartDataSaga(action: PayloadAction<{ auth: AuthData }>) {
  try {
    yield put(setIsLoading(true));
    let result: Response = yield call(getTimelineLineChartData, action.payload.auth);
    yield put(getTimelineChartDataSuccess(result));
  } catch (e) {
    yield put(getTimelineChartDataFailure());
    yield put(
        setNotification({
          message: "Could not load line chart data! Please try again!",
          title: "ERROR",
        })
      );
  } finally {
    yield put(setIsLoading(false));
  }
}

export function* resumeSesson(
    action: PayloadAction<string>
  ) {
    try {
        yield put(setIsLoading(true));
        const request: CredentialData ={
            session_code: action.payload
        }
        let result: Response = yield call(resumeASeason, request);
        yield put(submitCodeSuccess(result));
    } catch(e) {
        yield put(
            setNotification({
              message: "Code is invalid!",
              title: "ERROR",
            })
        );
        yield put(submitCodeFailure());
    } finally {
        yield put(setIsLoading(false));
    }
}

export function* startSesson() {
    try {
        yield put(setIsLoading(true));

        let result: Response = yield call(startNewSeason);
        yield put(startNewSessonSuccess(result));
    } catch(e) {
        yield put(
            setNotification({
              message: "Something went wrong. Please try again!",
              title: "ERROR",
            })
        );
        yield put(startNewSessonFailure());
    } finally {
        yield put(setIsLoading(false));
    }
}

function* formSaga() {
  yield all([
    takeLatest("form/sendForm", sendFormSaga),
    takeLatest("form/getFormData", getFormData),
    takeLatest("notification/submitCode", resumeSesson),
    takeLatest("notification/startNewSesson", startSesson),
    takeLatest("customer/getCustomerMeData", getCustomerMeData),
    takeLatest("customer/getLineChartData", getLineChartDataSaga),
    takeLatest("customer/getTimelineChartData", getTimelineChartDataSaga),
  ]);
}

export default formSaga;

import {
  createCurrentBalance,
  createCustomerDebt,
  createCustomerExpense,
  createCustomerIncomes,
  editCustomerDebt,
  editCustomerExpense,
  editCustomerIncomes,
  getCustomerMe,
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

// export function* startNewSeasonSaga() {
//     try {
//         let result: Response = yield startNewSeason();
//         yield put(loginSuccess(result));
//         setLoading(false);
//     } catch (e) {
//         yield put(loginFailed());
//         yield put(showErrorNotification(e));
//     }
// }

class BoundaryItem<T> {
  id?: number;
  item!: T;
}

function convertToIncomeResponse(form: FormState): {
  isValid: boolean;
  requests: BoundaryItem<CustomerIncomeCreationDataRequest>[];
} {
  let isValid = false;
  const items: BoundaryItem<CustomerIncomeCreationDataRequest>[] = [];
  if (
    form.fixedIncome &&
    form.passiveIncome &&
    form.fixedIncome.length > 0 &&
    form.fixedIncome.length > 0
  ) {
    form.fixedIncome.forEach((income) => {
      if (+income.amount > 0 && income.name) {
        items.push({
          id: income.id,
          item: {
            amount: +income.amount,
            name: income.name,
            type: income.type,
          },
        });
      }
    });
    form.passiveIncome.forEach((income) => {
      if (+income.amount > 0 && income.name) {
        items.push({
          id: income.id,
          item: {
            amount: +income.amount,
            name: income.name,
            type: income.type,
          },
        });
      }
    });
    isValid = items.length > 0;
  }
  return { isValid: isValid, requests: items };
}

function convertToExpensesResponse(form: FormState): {
  isValid: boolean;
  requests: BoundaryItem<CustomerExpenseCreationDataRequest>[];
} {
  let isValid = false;
  const items: BoundaryItem<CustomerExpenseCreationDataRequest>[] = [];
  if (form.expenses && form.expenses.length > 0) {
    form.expenses.forEach((expense) => {
      if (+expense.amount > 0 && expense.name) {
        isValid = true;
        items.push({
          id: expense.id,
          item: {
            amount: +expense.amount,
            name: expense.name,
            type: expense.type,
          },
        });
      }
    });
    if (form.nonExpenses) {
      form.nonExpenses.forEach((expense) => {
        if (+expense.amount > 0 && expense.name) {
          items.push({
            id: expense.id,
            item: {
              amount: +expense.amount,
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
        +debt.annual > 0 &&
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
  ]);
}

export default formSaga;

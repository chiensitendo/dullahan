import { AxiosResponse } from "axios";
import publicAxios from "./publicAxios";
import { AuthData } from "@/components/use-auth";
import { CredentialData, CustomerDebtCreationData, CustomerExpenseCreationData, CustomerExpenseCreationDataRequest, CustomerIncomeCreationData, CustomerIncomeCreationDataRequest, CustomerMeUpdateData, Debt, UserSeason } from "@/type";

const SERVER_URL = "https://56b2m5gkm5.execute-api.ap-southeast-1.amazonaws.com/dev/v1";

const generateAuthToken = (auth: AuthData) => {
    if (!auth || !auth.access_token) {
        throw new Error("Couldn't find authenication item");
    }

    const tokenType = !auth.token_type ? "Bearer": auth.token_type;

    return `${tokenType.charAt(0).toUpperCase() + tokenType.slice(1)} ${auth.access_token}`;
}

export const startNewSeason = (): Promise<AxiosResponse<AuthData, any>> => {
    return publicAxios.post<any>(SERVER_URL + "/start");
}

export const resumeASeason = (request: CredentialData): Promise<AxiosResponse<AuthData, any>> => {
    return publicAxios.post<any>(SERVER_URL + "/resume", request);
}

export const createCustomerIncomes = (auth: AuthData, request: CustomerIncomeCreationDataRequest): 
Promise<AxiosResponse<CustomerIncomeCreationData, any>> => {
    return publicAxios.post<any>(SERVER_URL + "/customer/incomes", request, {
        headers: {
            "Authorization": generateAuthToken(auth)
        }
    });
}

export const editCustomerIncomes = (auth: AuthData, request: CustomerIncomeCreationDataRequest, id: number | undefined): 
Promise<AxiosResponse<CustomerIncomeCreationData, any>> => {
    return publicAxios.patch<any>(SERVER_URL + "/customer/incomes/" + id, request, {
        headers: {
            "Authorization": generateAuthToken(auth)
        }
    });
}

export const createCustomerExpense = (auth: AuthData, request: CustomerExpenseCreationDataRequest): 
Promise<AxiosResponse<CustomerExpenseCreationData, any>> => {
    return publicAxios.post<any>(SERVER_URL + "/customer/expenses", request, {
        headers: {
            "Authorization": generateAuthToken(auth)
        }
    });
}

export const editCustomerExpense = (auth: AuthData, request: CustomerExpenseCreationDataRequest, id: number | undefined): 
Promise<AxiosResponse<CustomerExpenseCreationData, any>> => {
    return publicAxios.patch<any>(SERVER_URL + "/customer/expenses/" + id, request, {
        headers: {
            "Authorization": generateAuthToken(auth)
        }
    });
}

export const createCustomerDebt = (auth: AuthData, request: CustomerDebtCreationData): 
Promise<AxiosResponse<Debt, any>> => {
    return publicAxios.post<any>(SERVER_URL + "/customer/debts", request, {
        headers: {
            "Authorization": generateAuthToken(auth)
        }
    });
}

export const editCustomerDebt = (auth: AuthData, request: CustomerDebtCreationData, id: number | undefined): 
Promise<AxiosResponse<Debt, any>> => {
    return publicAxios.patch<any>(SERVER_URL + "/customer/debts/" + id, request, {
        headers: {
            "Authorization": generateAuthToken(auth)
        }
    });
}

export const createCurrentBalance = (auth: AuthData, request: CustomerMeUpdateData): 
Promise<AxiosResponse<Debt, any>> => {
    return publicAxios.patch<any>(SERVER_URL + "/customer/me", request, {
        headers: {
            "Authorization": generateAuthToken(auth)
        }
    });
}

export const getCustomerMe = (auth: AuthData): 
Promise<AxiosResponse<UserSeason, any>> => {
    return publicAxios.get<any>(SERVER_URL + "/customer/me", {
        headers: {
            "Authorization": generateAuthToken(auth)
        }
    });
}
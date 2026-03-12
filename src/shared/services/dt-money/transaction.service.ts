import { dtMoneyApi } from "@/shared/api/dt-money";
import { CreateTransactionInterface } from "@/shared/interfaces/https/create-transactions-request";
import { TransactionCategory } from "@/shared/interfaces/https/transaction-category-response";
import { GetTransactionParams, GetTransactionResponse } from "@/shared/interfaces/https/get-transactions-response";
import qs from 'qs';
import { UpdateTransactionInterface } from "@/shared/interfaces/https/update-transactions-request";

export const getTransactionCategories = async (): Promise<TransactionCategory[]> => {
    const { data } = await dtMoneyApi.get<TransactionCategory[]>(
        "/transaction/categories"
    );
    return data;
};

export const createTransaction = async (
    transaction: CreateTransactionInterface
) => {
    await dtMoneyApi.post("/transaction", transaction)
};

export const getTransactions = async (params: GetTransactionParams): Promise<GetTransactionResponse> => {
    const {data } = await dtMoneyApi.get<GetTransactionResponse>("/transaction", {
        params, 
        paramsSerializer: (p) => qs.stringify(p, { arrayFormat:"repeat"}),
    });
    return data;
}

export const deleteTransaction = async (id: number) => {
    await dtMoneyApi.delete(`/transaction/${id}`);
};

export const updateTransaction = async (
    transaction: UpdateTransactionInterface
) => {
    await dtMoneyApi.put("/transaction", transaction)
};
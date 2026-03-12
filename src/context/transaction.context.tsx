import { TransactionCategory } from "@/shared/interfaces/https/transaction-category-response";
import { createContext, FC, PropsWithChildren, use, useCallback, useContext, useState } from "react";
import * as transactionsService from '@/shared/services/dt-money/transaction.service'
import { CreateTransactionInterface } from "@/shared/interfaces/https/create-transactions-request";
import { Transaction } from "@/shared/interfaces/transaction";
import { TotalTransactions } from "@/shared/interfaces/https/total-transactions";
import { UpdateTransactionInterface } from "@/shared/interfaces/https/update-transactions-request";
import { Pagination } from "@/shared/interfaces/https/get-transactions-response";

interface fetchTransactionsParams {
    page: number,
}

export type TransactionContextType = {
    fetchCategories: () => Promise<void>;
    categories: TransactionCategory[];
    createTransaction: (transaction: CreateTransactionInterface) => Promise<void>;
    updateTransaction: (transaction: UpdateTransactionInterface) => Promise<void>;
    fetchTransactions: (params: fetchTransactionsParams) => Promise<void>;
    totalTransactions: TotalTransactions;
    transactions: Transaction[];
    refreshTransactions: () => Promise<void>;
    loading: boolean;
}

export const TransactionContext = createContext({} as TransactionContextType);

export const TransactionContextProvider: FC<PropsWithChildren> = ({
    children
}) => {
    const [categories, setCategories] = useState<TransactionCategory[]>([]);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(false);
    const [totalTransactions, setTotalTransactions] = useState<TotalTransactions>({
        expense: 0,
        revenue: 0,
        total: 0,
    });

    const [pagination, setPagination] = useState<Pagination>({
        page: 1,
        perPage: 15,
        totalRows: 0,
    })

    const refreshTransactions = async () => {
        setLoading(true);
        const transactionResponse = await transactionsService.getTransactions({
            page: 1,
            perPage: 10,
        });
        console.log(transactionResponse)
        setTransactions(transactionResponse.data);
        setTotalTransactions(transactionResponse.totalTransactions);
        setLoading(false);
    }

    const fetchCategories = async () => {
        const categoriesResponse = await transactionsService.getTransactionCategories();
        setCategories(categoriesResponse);
    };

    const createTransaction = async (transaction: CreateTransactionInterface) => {
        console.log("transaction", transaction);
        await transactionsService.createTransaction(transaction);
        await refreshTransactions();
    };

    const updateTransaction = async (transaction: UpdateTransactionInterface) => {
        await transactionsService.updateTransaction(transaction);
        await refreshTransactions();
    };

    const fetchTransactions = useCallback(async ({ page = 1}: fetchTransactionsParams) => {
        setLoading(true);
        const transactionResponse = await transactionsService.getTransactions({
           page,
           perPage: pagination.perPage
        });

        if(page === 1){
            setTransactions(transactionResponse.data);
        }else{
            setTransactions((prevState) => [
                ...prevState,
                ...transactionResponse.data,
            ])
        }
        setTotalTransactions(transactionResponse.totalTransactions);
        setPagination({
            ...pagination,
            page,
        totalRows: transactionResponse.totalRows,
        })
        setLoading(false);
    }, [pagination]);



    return (
        <TransactionContext.Provider
            value={{
                categories,
                fetchCategories,
                createTransaction,
                fetchTransactions,
                updateTransaction,
                refreshTransactions,
                totalTransactions,
                transactions,
                loading,
            }}
        >
            {children}
        </TransactionContext.Provider>
    );
};

export const useTransactionContext = () => {
    return useContext(TransactionContext);
}
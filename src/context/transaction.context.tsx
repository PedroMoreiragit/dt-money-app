import { TransactionCategory } from "@/shared/interfaces/https/transaction-category-response";
import { createContext, FC, PropsWithChildren, use, useCallback, useContext, useState } from "react";
import * as transactionsService from '@/shared/services/dt-money/transaction.service'
import { CreateTransactionInterface } from "@/shared/interfaces/https/create-transactions-request";
import { Transaction } from "@/shared/interfaces/transaction";
import { TotalTransactions } from "@/shared/interfaces/https/total-transactions";
import { UpdateTransactionInterface } from "@/shared/interfaces/https/update-transactions-request";

export type TransactionContextType = {
    fetchCategories: () => Promise<void>;
    categories: TransactionCategory[];
    createTransaction: (transaction: CreateTransactionInterface) => Promise<void>;
    updateTransaction: (transaction: UpdateTransactionInterface) => Promise<void>;
    fetchTransactions: () => Promise<void>;
    totalTransactions: TotalTransactions;
    transactions: Transaction[];
}

export const TransactionContext = createContext({} as TransactionContextType);

export const TransactionContextProvider: FC<PropsWithChildren> = ({
    children
}) => {
    const [categories, setCategories] = useState<TransactionCategory[]>([]);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [totalTransactions, setTotalTransactions] = useState<TotalTransactions>({
        expense: 0,
        revenue: 0,
        total: 0,
    })

    const fetchCategories = async () => {
        const categoriesResponse = await transactionsService.getTransactionCategories();
        setCategories(categoriesResponse);
    };

    const createTransaction = async (transaction: CreateTransactionInterface) => {
        console.log("transaction", transaction);
        await transactionsService.createTransaction(transaction);
    };

    const updateTransaction = async (transaction: UpdateTransactionInterface) => {
        await transactionsService.updateTransaction(transaction);
    };

    const fetchTransactions = useCallback(async () => {
        const transactionResponse = await transactionsService.getTransactions({
            page: 1,
            perPage: 10,
        });
        console.log(transactionResponse)
        setTransactions(transactionResponse.data);
        setTotalTransactions(transactionResponse.totalTransactions);
    }, []);

    return (
        <TransactionContext.Provider
            value={{
                categories,
                fetchCategories,
                createTransaction,
                fetchTransactions,
                updateTransaction,
                totalTransactions,
                transactions,
            }}
        >
            {children}
        </TransactionContext.Provider>
    );
};

export const useTransactionContext = () => {
    return useContext(TransactionContext);
}
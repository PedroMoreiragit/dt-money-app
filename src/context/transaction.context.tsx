import { TransactionCategory } from "@/shared/interfaces/https/transaction-category-response";
import { createContext, FC, PropsWithChildren, useContext, useState } from "react";
import * as transactionsService from '@/shared/services/dt-money/transaction.service'
import { CreateTransactionInterface } from "@/shared/interfaces/https/create-transactions-request";

export type TransactionContextType = {
    fetchCategories: () => Promise<void>;
    categories: TransactionCategory[];
    createTransaction: (transaction: CreateTransactionInterface) => Promise<void>;
}

export const TransactionContext = createContext({} as TransactionContextType);

export const TransactionContextProvider: FC<PropsWithChildren> = ({
    children
}) => {
    const [categories, setCategories] = useState<TransactionCategory[]>([]);

    const fetchCategories = async () => {
        const categoriesResponse = await transactionsService.getTransactionCategories();
    };

    const createTransaction = async (transaction: CreateTransactionInterface) => {
        console.log("transaction", transaction);
        await transactionsService.createTransaction(transaction);
    };

    return (
        <TransactionContext.Provider
            value={{
                categories,
                fetchCategories,
                createTransaction,
            }}
        >
            {children}
        </TransactionContext.Provider>
    );
};

export const useTransactionContext = () => {
    return useContext(TransactionContext);
}
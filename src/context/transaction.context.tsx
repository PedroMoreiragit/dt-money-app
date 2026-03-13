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

interface Loadings {
     initial: boolean,
        refresh: boolean,
        loadMore: boolean,
}

interface HandleLoadingParams {key: keyof Loadings; value: boolean};


export type TransactionContextType = {
    fetchCategories: () => Promise<void>;
    categories: TransactionCategory[];
    createTransaction: (transaction: CreateTransactionInterface) => Promise<void>;
    updateTransaction: (transaction: UpdateTransactionInterface) => Promise<void>;
    fetchTransactions: (params: fetchTransactionsParams) => Promise<void>;
    totalTransactions: TotalTransactions;
    transactions: Transaction[];
    refreshTransactions: () => Promise<void>;
    loadMoreTransactions: () => Promise<void>;
    loadings: Loadings;
    handleLoadings: (params: HandleLoadingParams) => void;
    pagination: Pagination;
    setSearchText: (text:string) => void;
    searchText: string;
}

export const TransactionContext = createContext({} as TransactionContextType);

export const TransactionContextProvider: FC<PropsWithChildren> = ({
    children
}) => {
    const [categories, setCategories] = useState<TransactionCategory[]>([]);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [searchText, setSearchText] = useState("");
    const [loadings, setLoadings] = useState<Loadings>({
        initial: false,
        refresh: false,
        loadMore: false,
    });
    const [totalTransactions, setTotalTransactions] = useState<TotalTransactions>({
        expense: 0,
        revenue: 0,
        total: 0,
    });

    const [pagination, setPagination] = useState<Pagination>({
        page: 1,
        perPage: 15,
        totalRows: 0,
        totalPages: 0,
    })

    const handleLoadings = ({key, value}: HandleLoadingParams) => setLoadings((prevValue) => ({...prevValue, [key]: value}))

    const refreshTransactions = useCallback(
        async () => {

        const { page, perPage } = pagination;
        const transactionResponse = await transactionsService.getTransactions({
            page: 1,
            perPage: page * perPage,
        });
        console.log(transactionResponse)
        setTransactions(transactionResponse.data);
        setTotalTransactions(transactionResponse.totalTransactions);
        setPagination({
            ...pagination,
            page,
            totalPages: transactionResponse.totalPages,
            totalRows: transactionResponse.totalRows,
        })
    }, [pagination, ]);

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

    const fetchTransactions = useCallback(async ({ page = 1 }: fetchTransactionsParams) => {
        
        const transactionResponse = await transactionsService.getTransactions({
            page,
            perPage: pagination.perPage,
            searchText,
        });

        if (page === 1) {
            setTransactions(transactionResponse.data);
        } else {
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
            totalPages: transactionResponse.totalPages,
        })
    }, [pagination, searchText]);

    const loadMoreTransactions = useCallback(async () => {
        if (loadings.loadMore || pagination.page >= pagination.totalPages) return;
        fetchTransactions({ page: pagination.page + 1 });
    }, [loadings.loadMore, pagination])

    return (
        <TransactionContext.Provider
            value={{
                categories,
                fetchCategories,
                createTransaction,
                fetchTransactions,
                updateTransaction,
                refreshTransactions,
                loadMoreTransactions,
                totalTransactions,
                transactions,
                pagination,
                handleLoadings,
                loadings,
                setSearchText,
                searchText,
            }}
        >
            {children}
        </TransactionContext.Provider>
    );
};

export const useTransactionContext = () => {
    return useContext(TransactionContext);
}
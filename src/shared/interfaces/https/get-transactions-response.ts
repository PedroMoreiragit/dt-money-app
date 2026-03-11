import { Transaction } from "../transaction";
import { TotalTransactions } from "./total-transactions";

export interface GetTransactionParams {
    page: number;
    perPage: number;
    from?: Date;
    to?: Date;
    typeId?: number;
    categoryId?: number;
    searchText?: string
}

export interface GetTransactionResponse {

    "data": Transaction[],
    "totalRows": number,
    "totalPages": number,
    "page": number,
    "perPage": number,
    "totalTransactions": TotalTransactions,
}

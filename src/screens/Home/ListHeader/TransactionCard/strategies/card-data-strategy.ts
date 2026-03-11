import { TransactionTypes } from "@/shared/enums/transaction-types";
import { TransactionCardType } from "..";


interface cardData {
    label: string;
    bgColor: string;
}

export const CARD_DATA: Record<TransactionCardType, cardData> = {
    [TransactionTypes.EXPENSE]: {
        label: "Saída",
        bgColor: "background-tertiary",
    },

    [TransactionTypes.REVENUE]: {
        label: "Entrada",
        bgColor: "background-tertiary",
    },

    total: {
        label: "Total",
        bgColor: "accent-brand-background-primary",
    },
};



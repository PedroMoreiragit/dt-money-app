import { TransactionTypes } from "@/shared/enums/transaction-types";
import { TransactionCardType } from "..";
import { colors } from "@/shared/colors";
import { MaterialIcons } from "@expo/vector-icons";

export const ICONS: Record<TransactionCardType, IconsData> = {
    [TransactionTypes.REVENUE]: {
        color: colors["accent-brand-light"],
        name: "arrow-circle-up",
    },

    [TransactionTypes.EXPENSE]: {
        color: colors["accent-red"],
        name: "arrow-circle-down",
    },

    total: {
        color: colors.white,
        name: "attach-money",
    },

}

interface IconsData {
    name: keyof typeof MaterialIcons.glyphMap;
    color: string;
}
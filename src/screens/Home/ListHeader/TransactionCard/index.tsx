import { FC } from "react";
import { Text, View } from "react-native";
import { colors } from "@/shared/colors";
import { TransactionTypes } from "@/shared/enums/transaction-types";
import { MaterialIcons } from "@expo/vector-icons";
import { useTransactionContext } from "@/context/transaction.context";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ICONS } from "./strategies/icon-strategy";
import { CARD_DATA } from "./strategies/card-data-strategy";
import { moneyMapper } from "@/shared/utils/money-mapper";
import clsx from "clsx";

export type TransactionCardType = TransactionTypes | "total";

interface Props {
    type: TransactionCardType;
    amount: number;
}


export const TransactionCard: FC<Props> = ({ amount, type }) => {

    const iconData = ICONS[type];
    const CardData = CARD_DATA[type];

    const { transactions, filters } = useTransactionContext();

    const lastTransaction = transactions.find(({ type: TransactionType }) => TransactionType.id === type);

    const renderDateInfo = () => {
        if (type === "total") {
            return (
                <Text className="text-white text-base">
                    {filters.from && filters.to
                        ? `${format(filters.from, "d MMMM", { locale: ptBR })} até ${format(filters.to, "d MMMM", { locale: ptBR })}`
                        : "Todo período"}
                </Text>
            );
        } else {
            return (
                <Text className="text-gray-700">
                    {lastTransaction?.createdAt ? format(lastTransaction?.createdAt,
                        `'Última ${CardData.label.toLowerCase()} em' d 'de' MMMM`,
                        { locale: ptBR }
                    ) : "Nehuma transação encontrada"}
                </Text>
            )
        }
    }

    return (
        <View className={clsx(`bg-${CardData.bgColor} min-w-[280] rounded-[6] px-8 py-6 justify-between mr-6`, type === "total" && "mr-12")}>
            <View className="flex-row justify-between items-center">
                <Text className="text-white text-base ">{CardData.label}</Text>
                <MaterialIcons name={iconData.name} size={26} color={iconData.color} />
            </View>
            <View>
                <Text className="text-2xl text-gray-400 font-bold">R$ {moneyMapper(amount)}</Text>
                {renderDateInfo()}
            </View>
        </View>
    )
}
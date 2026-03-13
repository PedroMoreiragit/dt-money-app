import { useTransactionContext } from "@/context/transaction.context"
import { TransactionTypes } from "@/shared/enums/transaction-types";
import Checkbox from "expo-checkbox"
import { Text, TouchableOpacity, View } from "react-native"

export const TypeFilter = () => {

    const { filters, handleFilters } = useTransactionContext();

    const selectType = (typeId: TransactionTypes) => {
        handleFilters({ key: "typeId", value: typeId })
    }

    return (
        <View className="mb-6">
            <Text className="text-gray-600 font-medium text-base mb-5"> Tipo de transação</Text>

            <TouchableOpacity className="flex-row items-center py-2"
                onPress={() => selectType(TransactionTypes.REVENUE)}
            >
                <Checkbox value={filters.typeId === TransactionTypes.REVENUE} onValueChange={() => selectType(TransactionTypes.REVENUE)} className="mr-4" />
                <Text className="text-lg text-white">Entrada</Text>
            </TouchableOpacity>

            <TouchableOpacity  className="flex-row items-center py-2"
                onPress={() => selectType(TransactionTypes.EXPENSE)}
            >
                <Checkbox value={filters.typeId === TransactionTypes.EXPENSE} onValueChange={() => selectType(TransactionTypes.EXPENSE)} className="mr-4" />
                <Text className="text-lg text-white">Saída</Text>
            </TouchableOpacity>
        </View>
    )
}
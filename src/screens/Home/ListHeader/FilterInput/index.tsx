import { Text, TouchableOpacity, View, TextInput } from "react-native"
import { useTransactionContext } from "@/context/transaction.context"
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/shared/colors";
import { useEffect, useState } from "react";
import { useBottomSheetContext } from "@/context/bottomSheet.context";
import { TransactionsFilters } from "./TransactionsFilters";


export const FilterInput = () => {

    const { pagination, setSearchText, searchText, fetchTransactions } = useTransactionContext();
    const { openBottomSheet } = useBottomSheetContext();

    const [text, setText] = useState("");

    useEffect(() => {
        const handler = setTimeout(() => {
            setSearchText(text)
        }, 500);
        return () => clearTimeout(handler)
    }, [text]);

    useEffect(() => {
        (async () => {
            try {
                await fetchTransactions({ page: 1 })
            } catch (error) {
                console.error("Erro ao buscar transações:", error);
            }
        })()
    }, [searchText, fetchTransactions])

    return (
        <View className="mb-4 w-[90%] self-center">

            <View className="w-full flex-row justify-between items-center mt-4 mb-4">
                <Text className="text-white text-xl font-bold">Transações</Text>
                <Text className="text-gray-700 text-base">
                    {pagination.totalRows}
                    {pagination.totalRows === 1 ? " Item" : " Items"}
                </Text>
            </View>


            <View className="flex-row items-center h-16 w-full bg-background-primary  px-3">
                <TextInput
                    value={text}
                    onChangeText={setText}
                    className="flex-1 text-white text-lg"
                    placeholderTextColor={colors.gray[600]}
                    placeholder="Busque uma transação"
                />

                <TouchableOpacity className="ml-2" onPress={() => openBottomSheet(<TransactionsFilters/>, 1)}>
                    <MaterialIcons
                        name="filter-list"
                        color={colors["accent-brand-light"]}
                        size={26}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}
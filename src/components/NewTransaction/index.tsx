import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { CreateTransactionInterface } from "@/shared/interfaces/https/create-transactions-request"
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/shared/colors";
import { useBottomSheetContext } from "@/context/bottomSheet.context";


export const NewTransaction = () => {

    const { closeBottomSheet } = useBottomSheetContext();

    const [transaction, setTransaction] = useState<CreateTransactionInterface>({
        categoryId: 0,
        description: "",
        typeId: 0,
        value: 0,
    })

    return (
        <View className="px-8 py-5">
            <TouchableOpacity className="w-full flex-row items-center justify-between">
                <Text className="text-white font-bold text-xl">Nova Transação</Text>
                <MaterialIcons name="close" color={colors.gray[700]} size={20} onPress={closeBottomSheet} />
            </TouchableOpacity>
        </View>
    )
}
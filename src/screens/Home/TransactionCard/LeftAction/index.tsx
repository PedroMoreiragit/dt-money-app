import { Pressable } from "react-native-gesture-handler"
import { MaterialIcons } from "@expo/vector-icons";
import { Transaction } from "@/shared/interfaces/transaction";
import { FC } from "react";
import { View } from "react-native";
import { colors } from "@/shared/colors";
import { useBottomSheetContext } from "@/context/bottomSheet.context";

interface Params {
    transaction: Transaction;
}

export const LeftAction: FC<Params> = ({
    transaction
}) => {

    const { openBottomSheet } = useBottomSheetContext();

    return (
        <Pressable onPress={() => {
            openBottomSheet(<></>, 1);
        }}>
            <View className="h-[140] bg-accent-blue-background-primary w-[80] rounded-l-[6] items-center justify-center">
                <MaterialIcons name="edit" color={colors.white} size={30} />
            </View>
        </Pressable>
    )
}
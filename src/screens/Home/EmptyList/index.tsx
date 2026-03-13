import { View, Text } from "react-native";

export const EmptyList = () => {
    return (
        <View className="flex-1 justify-center items-center">
            <Text className="text-gray-600 text-lg text-center">
                Nenhuma Transação encontrada
            </Text>
        </View>
    )
}
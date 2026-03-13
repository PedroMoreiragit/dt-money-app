import { useTransactionContext } from "@/context/transaction.context"
import Checkbox from "expo-checkbox";
import { Text, TouchableOpacity, View } from "react-native";

export const CategoryFilter = () => {
     const {categories ,handleCategoryFilter, filters} = useTransactionContext();

     return (
        <View className="mb-6">
            <Text className="text-gray-600 font-medium text-base mb-5">
                Categorias
            </Text>

            {categories.map(({id, name}) => (
                <TouchableOpacity className="flex-row items-center py-2" key={`category-${id}`} 
                onPress={() => handleCategoryFilter(id)}>
                    <Checkbox onValueChange={() => handleCategoryFilter(id)} value={Boolean(filters.categoryIds[id])} className="mr-4" />
                    <Text className="text-lg text-white">{name}</Text>
                </TouchableOpacity>
            ))}
        </View>
     )
}
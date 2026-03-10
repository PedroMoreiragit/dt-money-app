import { Children, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { CreateTransactionInterface } from "@/shared/interfaces/https/create-transactions-request"
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/shared/colors";
import { useBottomSheetContext } from "@/context/bottomSheet.context";
import { TextInput } from "react-native-gesture-handler";
import CurrencyInput from "react-native-currency-input";
import { TransactionTypesSelector } from "../SelectType";
import { SelectCategoryModal } from "../SelectCategoryModal";
import * as Yup from "yup";
import { transactionSchema } from "./schema";
import { AppButton } from "../AppButton";
import { ErrorMessage } from "../ErrorMessage";

type validationErrorsTypes = Record<keyof CreateTransactionInterface, string>;

export const NewTransaction = () => {

    const { closeBottomSheet } = useBottomSheetContext();

    const [transaction, setTransaction] = useState<CreateTransactionInterface>({
        categoryId: 0,
        description: "",
        typeId: 0,
        value: 0,
    });
    const [validationErrors, setValidationsErrors] = useState<validationErrorsTypes>();

    const handleCreateTransaction = async () => {
        try {
            await transactionSchema.validate(transaction, {
                abortEarly: false,
            });
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                const errors = {} as validationErrorsTypes;

                error.inner.forEach((err) => {
                    if (err.path) {
                        errors[err.path as keyof CreateTransactionInterface] =
                            err.message;
                    }
                });

                setValidationsErrors(errors);
            }
        }
    };

    const setTransactionData = (key: keyof CreateTransactionInterface, value: string | number) => {
        setTransaction((prevData) => ({ ...prevData, [key]: value }))
    }

    return (
        <View className="px-8 py-5">
            <TouchableOpacity className="w-full flex-row items-center justify-between">
                <Text className="text-white font-bold text-xl">Nova Transação</Text>
                <MaterialIcons name="close" color={colors.gray[700]} size={20} onPress={closeBottomSheet} />
            </TouchableOpacity>


            <View className="flex-1 mt-8 mb-8">
                <TextInput
                    onChangeText={(text) => setTransactionData("description", text)}
                    placeholder="Descrição"
                    placeholderTextColor={colors.gray[700]}
                    value={transaction.description}
                    className="text-white text-lg h-[50px] bg-background-primary my-2 rounded-[6] pl-4"
                />
                {
                    validationErrors?.description && (<ErrorMessage>{validationErrors.description}</ErrorMessage>)
                }
                <CurrencyInput
                    prefix="R$ "
                    delimiter="."
                    separator=","
                    precision={2}
                    minValue={0}
                    onChangeValue={(value) => setTransactionData("value", value ?? 0)}
                    value={transaction.value}
                    className="text-white text-lg h-[50px] bg-background-primary my-2 rounded-[6] pl-4"
                />
                {
                    validationErrors?.value && (<ErrorMessage>{validationErrors.value}</ErrorMessage>)
                }

                <SelectCategoryModal selectedCategory={transaction.categoryId} onSelect={(categoryId) => setTransactionData("categoryId", categoryId)} />
                {
                    validationErrors?.categoryId && (<ErrorMessage>{validationErrors.categoryId}</ErrorMessage>)
                }
                <TransactionTypesSelector
                    typeId={transaction.typeId}
                    setTransactionType={(typeId) => setTransactionData("typeId", typeId)}
                />
                {
                    validationErrors?.typeId && (<ErrorMessage>{validationErrors.typeId}</ErrorMessage>)
                }
                <View className="my-4">
                    <AppButton onPress={handleCreateTransaction}>Registrar</AppButton>
                </View>
            </View>
        </View>
    )
}
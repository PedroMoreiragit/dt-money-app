import { FC, useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/shared/colors";
import { useBottomSheetContext } from "@/context/bottomSheet.context";
import { TextInput } from "react-native-gesture-handler";
import CurrencyInput from "react-native-currency-input";
import * as Yup from "yup";
import { useTransactionContext } from "@/context/transaction.context";
import { useErrorHandler } from "@/shared/hooks/useErrorHandler";
import { ErrorMessage } from "@/components/ErrorMessage";
import { SelectCategoryModal } from "@/components/SelectCategoryModal";
import { TransactionTypesSelector } from "@/components/SelectType";
import { AppButton } from "@/components/AppButton";
import { transactionSchema } from "./schema";
import { Transaction } from "@/shared/interfaces/transaction";
import { UpdateTransactionInterface } from "@/shared/interfaces/https/update-transactions-request";

type validationErrorsTypes = Record<keyof UpdateTransactionInterface, string>;

interface Params {
    transaction: Transaction;
}

export const EditTransactionForm: FC<Params> = ({
    transaction: transactionToUpdate
}) => {

    const { closeBottomSheet } = useBottomSheetContext();
    const { updateTransaction } = useTransactionContext();
    const { handleError } = useErrorHandler();

    const [loading, setLoading] = useState(false);

    const [transaction, setTransaction] = useState<UpdateTransactionInterface>({
        categoryId: transactionToUpdate.categoryId,
        description: transactionToUpdate.description,
        id: transactionToUpdate.id,
        typeId: transactionToUpdate.typeId,
        value: transactionToUpdate.value,
    });
    const [validationErrors, setValidationsErrors] = useState<validationErrorsTypes>();

    const handleUpdateTransaction = async () => {
        try {
            setLoading(true);
            await transactionSchema.validate(transaction, {
                abortEarly: false,
            });
            await updateTransaction(transaction);
            closeBottomSheet()
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                const errors = {} as validationErrorsTypes;

                error.inner.forEach((err) => {
                    if (err.path) {
                        errors[err.path as keyof UpdateTransactionInterface] =
                            err.message;
                    }
                });

                setValidationsErrors(errors);
            } else {
                handleError(error, "Falha ao atualizar transação")
            }
        } finally {
            setLoading(false);
        }
    };

    const setTransactionData = (key: keyof UpdateTransactionInterface, value: string | number) => {
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
                    <AppButton onPress={handleUpdateTransaction}>{
                        loading ? <ActivityIndicator color={colors.white} /> : "Atualizar"}</AppButton>
                </View>
            </View>
        </View>
    )
}
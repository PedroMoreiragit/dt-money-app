import { FC, useState } from "react";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/shared/colors";
import { DeleteModal } from "./DeleteModal";
import * as transactionService from "@/shared/services/dt-money/transaction.service";
import { useErrorHandler } from "@/shared/hooks/useErrorHandler";
import { useSnackbarContext } from "@/context/snackbar.context";


interface Params {
    transactionId: number
}

export const RightAction: FC<Params> = ({ transactionId }) => {

    const [modalVisible, setModalVisible] = useState(false);

    const showModal = () => setModalVisible(true);
    const hideModal = () => setModalVisible(false);
    const [loading, setLoading] =  useState(false);
    const {notify} = useSnackbarContext();

    const {handleError} = useErrorHandler();

    const handleDeleteTransaction = async () => {
        try {
            setLoading(true)
           await transactionService.deleteTransaction(transactionId);
           notify({
            message: "Transação deletada com sucesso!",
            messageType: "SUCCESS",
           })
           hideModal()
        } catch (error) {
            handleError(error, "Falha ao deletar a transação");
        }finally{
            setLoading(false)
        }
    }

    return (
        <>
            <TouchableOpacity onPress={showModal} activeOpacity={0.8} className="h-[140] bg-accent-red-background-primary w-[80] rounded-r-[6] items-center justify-center">
                <MaterialIcons color={colors.white} size={30} name="delete-outline" />
            </TouchableOpacity>
            <DeleteModal loading={loading} handleDeleteTransaction={handleDeleteTransaction} visible={modalVisible} hideModal={hideModal} />
        </>
    )
}
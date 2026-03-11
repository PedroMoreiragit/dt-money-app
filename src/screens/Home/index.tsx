import { useEffect } from "react";
import { AppHeader } from "@/components/AppHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTransactionContext } from "@/context/transaction.context";
import { useErrorHandler } from "@/shared/hooks/useErrorHandler";
import { FlatList } from "react-native";
import { ListHeader } from "./ListHeader";


export const Home = () => {

    const { fetchCategories, fetchTransactions } = useTransactionContext();
    const { handleError } = useErrorHandler();

    const handleFetchCategories = async () => {
        try {
            await fetchCategories()
        } catch (error) {
            handleError(error, "Falha ao buscar categorias");
        }
    }

    useEffect(() => {
        (async () => {
            await Promise.all([handleFetchCategories(), fetchTransactions()]);
        })();
    }, []);

    return (
        <SafeAreaView className="flex-1 bg-background-primary">

            <FlatList
                className="bg-background-secondary"
                data={[]}
                renderItem={() => <></>}
                ListHeaderComponent={ListHeader}
            />
        </SafeAreaView>
    )
}
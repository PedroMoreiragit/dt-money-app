import { useEffect } from "react";
import { AppHeader } from "@/components/AppHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTransactionContext, } from "@/context/transaction.context";
import { useErrorHandler } from "@/shared/hooks/useErrorHandler";
import { FlatList } from "react-native";
import { ListHeader } from "./ListHeader";
import { TransactionCard } from "./TransactionCard";


export const Home = () => {

    const { fetchCategories, fetchTransactions, transactions, categories } = useTransactionContext();
    const { handleError } = useErrorHandler();


    const handleFetchCategories = async () => {
        try {
            await fetchCategories()
        } catch (error) {
            handleError(error, "Falha ao buscar categorias");
        }
    }
    console.log(categories);

    useEffect(() => {
        (async () => {
            
            await Promise.all([handleFetchCategories(), fetchTransactions()]);
        })();
    }, []);

    return (
        <SafeAreaView className="flex-1 bg-background-primary">

            <FlatList
                className="bg-background-secondary"
                data={transactions}
                keyExtractor={({id}) => `transaction-${id}`}
                renderItem={({ item }) => <TransactionCard transaction={item} />}
                ListHeaderComponent={ListHeader}
            />
        </SafeAreaView>
    )
}
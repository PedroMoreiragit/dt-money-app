import { useEffect } from "react";
import { AppHeader } from "@/components/AppHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTransactionContext } from "@/context/transaction.context";
import { useErrorHandler } from "@/shared/hooks/useErrorHandler";


export const Home = () => {

    const {fetchCategories} = useTransactionContext();
    const {handleError} = useErrorHandler();

    const handleFetchCategories = async () => {
        try {
            await fetchCategories()
        } catch (error) {
            handleError(error, "Falha ao buscar categorias");
        }
    }

    useEffect(() => {
        (async () => { 
            await handleFetchCategories();
        })();
    }, []);

    return (
        <SafeAreaView className="flex-1 bg-background-primary">
            <AppHeader />
        </SafeAreaView>
    )
}
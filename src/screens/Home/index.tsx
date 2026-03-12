import { useEffect } from "react";
import { AppHeader } from "@/components/AppHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTransactionContext, } from "@/context/transaction.context";
import { useErrorHandler } from "@/shared/hooks/useErrorHandler";
import { ActivityIndicator, FlatList } from "react-native";
import { ListHeader } from "./ListHeader";
import { TransactionCard } from "./TransactionCard";
import { RefreshControl } from "react-native-gesture-handler";
import { EmptyList } from "./EmptyList";
import { colors } from "@/shared/colors";


export const Home = () => {

    const {
        fetchCategories,
        fetchTransactions,
        transactions,
        refreshTransactions,
        loadMoreTransactions,
        loadings,
        handleLoadings,
    } = useTransactionContext();
    const { handleError } = useErrorHandler();


    const handleFetchCategories = async () => {
        try {
            handleLoadings({
                key: "initial",
                value: true,
            });
            await fetchCategories()
        } catch (error) {
            handleError(error, "Falha ao buscar categorias");
        } finally {
            handleLoadings({
                key: "initial",
                value: false,
            });
        }
    }

    const handleFetchInitialTransactions = async () => {
        try {
            handleLoadings({
                key: "initial",
                value: true,
            });
            await fetchTransactions({ page: 1 })
        } catch (error) {
            handleError(error, "Falha ao buscar transações")
        } finally {
            handleLoadings({
                key: "initial",
                value: false,
            });
        }
    }

    const hnadleLoadMoreTransactions = async () => {
        try {
            handleLoadings({
                key: "loadMore",
                value: true,
            });
            await loadMoreTransactions();
        } catch (error) {
            handleError(error, "Falha ao carregar novas transações")
        }finally{
            handleLoadings({
                key: "loadMore",
                value: false,
            });
        }
    }

    const handleRefreshTransactions = async () => {
        try {
            handleLoadings({
                key: "refresh",
                value: true,
            });
            await refreshTransactions();
        } catch (error) {
            handleError(error, "Falha ao recarregar transções")
        }finally {
            handleLoadings({
                key: "refresh",
                value: false,
            });
        }
    }

    useEffect(() => {
        (async () => {

            await Promise.all(
                [handleFetchCategories(),
                handleFetchInitialTransactions(),
                ]);
        })();
    }, []);

    return (
        <SafeAreaView className="flex-1 bg-background-primary">

            <FlatList
                className="bg-background-secondary"
                data={transactions}
                keyExtractor={({ id }) => `transaction-${id}`}
                renderItem={({ item }) => <TransactionCard transaction={item} />}
                ListHeaderComponent={ListHeader}
                refreshControl={
                    <RefreshControl
                        refreshing={loadings.refresh } onRefresh={handleRefreshTransactions} />
                }
                onEndReached={hnadleLoadMoreTransactions}
                onEndReachedThreshold={0.5}
                ListEmptyComponent={loadings.initial ? null :  EmptyList}
                ListFooterComponent={loadings.loadMore ? (
                    <ActivityIndicator color={colors.["accent-brand-light"]} 
                    size={"large"}
                    />
                ): null}
            />
        </SafeAreaView>
    )
}
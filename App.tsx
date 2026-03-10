import { AuthContextProvider } from "@/context/auth.context";
import "./src/styles/global.css";
import NavigationRoutes from "@/routes";
import { Snackbar } from "@/components/Snackbar";
import { SnackbarContextProvider } from "@/context/snackbar.context";
import { BottomSheetProvider } from "@/context/bottomSheet.context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { TransactionContextProvider } from "@/context/transaction.context";

export default function App() {
  return (
    <GestureHandlerRootView className="flex-1">
      <SnackbarContextProvider>
        <AuthContextProvider>
          <TransactionContextProvider>
            <BottomSheetProvider>
              <NavigationRoutes />
              <Snackbar />
            </BottomSheetProvider>
          </TransactionContextProvider>
        </AuthContextProvider>
      </SnackbarContextProvider>
    </GestureHandlerRootView>
  );
}
import { AuthContextProvider } from "@/context/auth.context";
import "./src/styles/global.css";
import NavigationRoutes from "@/routes";
import { Snackbar } from "@/components/Snackbar";
import { SnackbarContextProvider } from "@/context/snackbar.context";

export default function App() {
  return (
    <SnackbarContextProvider>
      <AuthContextProvider>
        <NavigationRoutes />
        <Snackbar />
      </AuthContextProvider>
    </SnackbarContextProvider>
  );
}
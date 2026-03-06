import { AuthContextProvider } from "@/context/auth.context";
import "./src/styles/global.css";
import NavigationRoutes from "@/routes";

export default function App() {
  return (
    <AuthContextProvider>
      <NavigationRoutes />
    </AuthContextProvider>
  );
}
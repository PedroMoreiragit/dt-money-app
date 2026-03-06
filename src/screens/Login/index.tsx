import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { PublicStackParamsList } from "@/routes/PublicRoutes";
import { DismissKeyboardView } from "@/components/DismissKeyboardView";
import { LoginForm } from "./LoginForm";
import { AuthHeader } from "@/components/AuthHeader";

export const Login = () => {

    return (
        <DismissKeyboardView>
            <View className="flex-1 w-[82%] self-center">
                <AuthHeader />
                <LoginForm />
            </View>
        </ DismissKeyboardView >
    );
};
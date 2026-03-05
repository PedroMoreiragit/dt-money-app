import { Home } from "@/screens/Home";
import { createStackNavigator } from "@react-navigation/stack";

export type PrivateStackParams = {
    Home: undefined;
}

export const PrivateRoutes = () => {
    const PrivateStack = createStackNavigator<PrivateStackParams>();

    return (
        <PrivateStack.Navigator>
            <PrivateStack.Screen name="Home" component={Home}/>
        </PrivateStack.Navigator>
    )
}
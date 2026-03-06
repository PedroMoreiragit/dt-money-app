import { useKeyboardVisible } from "@/shared/hooks/useKeyboardVisible";
import { Image, View } from "react-native"


export const AuthHeader = () => {

    const KeyboardVisible  = useKeyboardVisible();

    if(KeyboardVisible) return <></>;

    return (
        <View className="items-center justify-center w-full min-h-40">
            <Image source={require("@/assets/Logo.png")}
            className="h-[60px] w-[255px]"
            />
        </View>
    )
}
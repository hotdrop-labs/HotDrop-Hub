import {View, Image, Text} from "react-native";
import LoginCard from "@/components/LoginCard";
import { useLocalSearchParams } from "expo-router";
import Toast from "react-native-toast-message";
import {useEffect, useState} from 'react'
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";



export default function Login (){
    const { msg } = useLocalSearchParams<{ msg?: string }>();
    const [shown, setShown] = useState(false);

  // Opción A: useEffect
    useEffect(() => {
        if (msg && !shown) {
        Toast.show({ type: "success", text1: String(msg) });
        setShown(true); // evita repetir al re-renderizar
        }
    }, [msg, shown]);
    return (
        <KeyboardAwareScrollView
            style={{ flex: 1, backgroundColor: "#0e0e0e" }}              // bg del scroll
            contentContainerStyle={{ flexGrow: 1, paddingVertical: 24 }} // ❗ sin justify-center
            enableOnAndroid
            extraScrollHeight={20}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
        >
            <View className="flex flex-1 items-center w-full h-full bg-bgDark">
                <Image className="size-52 " source={require('@/assets/images/login_icon.png')}/>
                <Text className="color-white text-4xl">Welcome to HotDrop</Text>
                <Text className="color-gray-400 text-2xl mt-2">Sign in to continue</Text>
                <LoginCard />
            </View>
        </KeyboardAwareScrollView>
    )
}
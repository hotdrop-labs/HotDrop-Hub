import {View, Image, Text} from "react-native";
import SignUpCard from "@/components/SignUpCard";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";


export default function Register (){
    return (
        <KeyboardAwareScrollView
            style={{ flex: 1, backgroundColor: "#0e0e0e" }}              // bg del scroll
            contentContainerStyle={{ flexGrow: 1, paddingVertical: 24 }} // ❗ sin justify-center
            enableOnAndroid
            extraScrollHeight={20}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
        >
            <View className="w-full items-center px-5">
                <Image className="size-52 " source={require('@/assets/images/login_icon.png')}/>
                <Text className="color-white text-4xl">Welcome to HotDrop</Text>
                <Text className="color-gray-400 text-2xl mt-2">Sign up to continue</Text>
                <SignUpCard />
            </View>
        </KeyboardAwareScrollView>  
    )
}
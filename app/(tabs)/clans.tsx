import {View, Text, Image} from "react-native";

export default function Clans (){
    return (
        <View className="flex flex-1 bg-bgDark justify-center items-center">
            <Image className="size-14" source={require("@/assets/images/wait.png")} />
            <Text className="text-4xl color-slate-200">Coming Soon...</Text>
        </View>
    )
}
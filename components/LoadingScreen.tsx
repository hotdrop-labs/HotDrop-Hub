import React from "react";
import { View, Text, ActivityIndicator } from "react-native";

export default function(){
    return(
        <View className="flex flex-1 bg-bgDark p-10 justify-center items-center">
            <ActivityIndicator color={"#0000ff"} size={60} />
        </View>
    )
}
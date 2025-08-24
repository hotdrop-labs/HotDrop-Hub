import {View, Image} from "react-native";
import {Tabs, Redirect} from 'expo-router';
import React from "react";

const TabIcon = ({focused, icon}:any) => {
    if (focused) {
        return (
            <View className={"bg-primary flex items-center justify-center flex-row flex-1 min-w-[112px] min-h-16 mt-4  rounded-full overflow-hidden"}>
                <Image
                    source={icon}
                    className={"size-8"}
                    tintColor={"white"}
                />
            </View>
        )
    }
    return (
        <View className={"flex items-center justify-center flex-row flex-1 min-w-[112px] min-h-16 mt-4  rounded-full overflow-hidden"}>
            <Image
                source={icon}
                className={"size-8"}
                tintColor={"white"}
            />
        </View>
        )
}

export default function AuthLayout (){
    return (
            <Tabs
        screenOptions={{
                tabBarStyle: {
                    backgroundColor: "#111",
                    borderRadius: 50,
                    marginHorizontal: 20,
                    marginBottom:36,
                    height: 52,
                    position: "absolute",
                    overflow: "hidden",
                    borderWidth: 1,
                    borderColor: "#111"
                }
            }}
        >
            <Tabs.Screen 
                name="login"
                options={{
                    headerShown: false,
                    tabBarIcon: (({focused}) => (
                        <TabIcon focused={focused} icon={require("@/assets/images/login.png")} />
                    ))
                }}
            />
            <Tabs.Screen 
                name="signup"
                options={{
                    headerShown: false,
                    tabBarIcon: (({focused}) => (
                        <TabIcon focused={focused} icon={require("@/assets/images/register.png")} />
                    ))
                }}
            />
        </Tabs>
        
    )
}
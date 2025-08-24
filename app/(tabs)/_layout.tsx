import React from "react";
import {Tabs, Redirect} from 'expo-router';
import {View, Text, Image} from "react-native";
import { useAuth } from "@/services/stores/useAuth";
import LoadingScreen from "@/components/LoadingScreen";


const TabIcon = ({focused, icon}:any) => {
    if (focused) {
        return (
            <View className={"bg-yellow-600 flex items-center justify-center flex-row flex-1 min-w-[100px] min-h-16 mt-4  rounded-full overflow-hidden"}>
                <Image
                    source={icon}
                    className={"size-8"}
                    tintColor={"black"}
                />
            </View>
        )
    }
    return (
        <View className={"flex items-center justify-center flex-row flex-1 min-w-[100px] min-h-16 mt-4  rounded-full overflow-hidden"}>
            <Image
                source={icon}
                className={"size-8"}
                tintColor={"white"}
            />
        </View>
        )
}

const _Layout = () => {
    const token = useAuth((s) => s.token);
    const hydrated = useAuth.persist?.hasHydrated?.()
    if(!hydrated) return <LoadingScreen />
    return token ? (
        <Tabs
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: "#0e0e0e",
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
                name="index"
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused} icon={require("@/assets/images/home.png")}/>
                    )
                }}

            />
            <Tabs.Screen
                name="clans"
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused} icon={require("@/assets/images/clan.png")}/>
                    )
                }}
            />
            <Tabs.Screen
                name="scrims"
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused} icon={require("@/assets/images/controller.png")}/>
                    )
                }}
            />
            <Tabs.Screen
                name="chat"
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused} icon={require("@/assets/images/chat.png")}/>
                    )
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused} icon={require("@/assets/images/profile.png")}/>
                    )
                }}
            />

        </Tabs>
    ) : <Redirect href={'/(auth)/login'} />
}

export default _Layout;
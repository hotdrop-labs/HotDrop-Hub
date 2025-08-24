import { fetchScrims } from "@/services/api";
import { useCallback} from "react";
import {View, Text, FlatList, ActivityIndicator, Pressable} from "react-native";
import useFetch from "@/services/useFetch";
import ScrimCard from "@/components/ScrimCard";
import { useAuth } from "@/services/stores/useAuth";
import { router } from "expo-router";

export default function Scrims(){
    const {data: scrims, loading, error} = useFetch(() => fetchScrims({query: "scrims/getAll"}))
    const renderItem = useCallback(({item}:{item: any}) => {
        return <ScrimCard {...item} />;
    }, [])
    const token = useAuth(s => s.token)
    
    const createButton = () => {
        router.replace("/scrim")
    }

    return (
        <View className="flex flex-1 bg-bgDark">
            <View className="flex flex-row w-full border-b border-bgDarkLighter justify-evenly items-center">
                <Text className="color-slate-200 text-3xl m-5">
                    Scrims
                </Text>
                <Pressable 
                    className="bg-primary p-2 rounded-lg"
                    onPress={createButton}
                >
                    <Text className="color-bgDark text-2xl">Create</Text>
                </Pressable>
            </View>
            <View className="flex flex-1 items-center mt-5 mb-32">
                {loading ? (
                    <ActivityIndicator size="large" color={"#0000ff"} className={"mt-10 self-center"} />
                ) : error ? (
                    <Text className={"color-red-500"}>{error.message}</Text>
                ): (
                    <View className={"flex flex-1 w-full items-center justify-center"}>
                        <FlatList
                            data={scrims}
                            renderItem={renderItem}
                            keyExtractor={(item) => item._id.toString()}
                            className={"flex-1 w-full"}
                        />
                    </View>
                )}
            </View>
        </View>
    )
}
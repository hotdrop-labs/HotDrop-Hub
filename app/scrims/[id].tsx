import { fetchScrim, fetchSquads, editScrim, fetchUser } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useLocalSearchParams } from "expo-router";
import { goBack } from "expo-router/build/global-state/routing";
import { useEffect, useState, useCallback } from "react";
import { ActivityIndicator, Alert, FlatList, Image, Pressable, Text, View } from "react-native";
import { useAuth } from "@/services/stores/useAuth";
import { scrimDataTypes } from "@/services/api";
import { squadUserType } from "../(tabs)/profile";
import { TeamMembers } from "@/components/teamMembers";

type squadType = {
    _id: string,
    name: string,
    members: string[]
}
type slotType = {
    _id: string,
    teamId: string,
    slotNumber: string
}

export default function ScrimPage() {
    const { id } = useLocalSearchParams<{id: string}>();
    const user = useAuth((s) => s.user)
    const {data: scrimData, error, loading} = useFetch(() => fetchScrim({query:"scrims/getOne", _id:id}))
    const {data : squads, error: errorSquad, loading: loadingSquad} = useFetch<squadType[]>(() => fetchSquads("squads/getAll"))
    const [squad, setSquad] = useState<squadType>()
    const [data, setData] = useState<scrimDataTypes>()

    useEffect(() => {
        if(squads && user){
            const squadFound = squads.find(squad => 
                squad?.members?.includes(user?.id)
            )
            setSquad(squadFound)
        }
    }, [squads, user])
    const handleApply = async () => {
    try {
        if(data && squad){
            const squadExists = data.registrations.some((sq) => sq.teamId === squad._id)    
            if(!squadExists){
                if(data.registrations.length < 25){
                                    const res = await editScrim({_id: id, teamId: squad?._id})
                    if(res.message === "TEAM_FOUND"){
                        Alert.alert("Invalid", "Team already registered")
                        return
                }
                setData(res)
                }else{
                    Alert.alert("Invalid", "The slots are already full")
                }

            }else{
                Alert.alert("Invalid", "Team already registered")
            }
        }else{
            if(!squad){
                Alert.alert("Invalid", "This action requires you to be part of a squad.")
            }
        }
    } catch (err) {
        console.error("Error in handleApply:", err)
    }
    }

    useEffect(() => {
        setData(scrimData)
    }, [scrimData])
    const renderItem = useCallback(({item}:{item: slotType}) => {
        if(squads){
            const tempSquad = squads.find(sq => item.teamId == String(sq._id))
            return (
            <View>
                {tempSquad ?
                <View className="flex border-b border-bgDarkLight p-2">
                    <View className="flex flex-row">
                        <Text className="bg-bgDarkLight p-1 color-slate-100 text-2xl mr-2 rounded-lg">#{item.slotNumber}</Text>
                        <Text className="color-slate-100 bg-bgDarkLight p-2 rounded-lg">{tempSquad.name}</Text>
                    </View>

                    <TeamMembers memberIds={tempSquad.members} />
                </View>
                :
                <></>
                }
                
            </View>
        );
        }
        return (
            <View className="flex flex-row">
                <Text className="color-slate-100">Loading...</Text>
            </View>
        )
        
    }, [squads])

    return (
        <>
            {loading ? 
                <ActivityIndicator size="large" color={"#0000ff"} className={"mt-10 self-center"} />    
            :
            <View className="flex-1 bg-bgDark p-2">
                <View className="border-b border-bgDarkLighter p-3 flex flex-row justify-between items-center">
                    <Pressable
                        onPress={goBack}
                    >
                        <Text className="color-bgDark bg-primary rounded-lg p-2 text-xl" >Back</Text>
                    </Pressable>

                    <Text className="color-cyan-400 text-2xl">{data?.status}</Text>
                    <View className="flex flex-row justify-center items-center">
                        {
                            data?.applications === "Open" ? 
                            <Pressable
                                onPress={handleApply}
                                className="bg-primary p-2 rounded-lg"
                            >
                                <Text className="color-bgDark text-xl">Apply</Text>  
                            </Pressable>
                             :
                            <Text className=" text-xl bg-bgDarkLighter p-3 rounded-lg color-red-400">Closed</Text>
                        }
                    
                </View>
                </View>
                <View className="flex items-center mt-2 p-3">
                    <View className="flex w-full items-center bg-bgDarkLight mb-5 rounded-lg p-2">
                        <Text className="color-slate-100 text-2xl">{data?.title}</Text>
                    </View>
                         {data?.map === "Erangel" ?
                        <Image className="size-60 rounded-lg" source={require("@/assets/images/erangel.jpg")} /> :
                        data?.map === "Livik" ?
                        <Image className="size-80 rounded-lg" source={require("@/assets/images/livik.jpg")}/> :
                        data?.map === "Miramar" ?
                        <Image className="size-80 rounded-lg" source={require("@/assets/images/miramar.jpg")} /> :
                        <Image className="size-80 rounded-lg" source={require("@/assets/images/sanhok.jpg")} />
                    }
                </View>
                <View className="flex flex-row justify-between mt-5">
                    <Text className="color-neutral-300 bg-bgDarkLighter rounded-lg p-2">Date: {data?.date}</Text>
                    <Text className="color-neutral-300 bg-bgDarkLighter rounded-lg p-2">Time: {data?.startTime}</Text>
                </View>
                <View className="flex flex-row justify-evenly mt-5">
                    <View className="flex flex-row">
                        <Text className="color-neutral-200 text-2xl">Cost to join: </Text>
                        <Text className="color-emerald-600 text-2xl">{data?.cost}$</Text>
                    </View>
                    <View className="flex flex-row">
                        <Text className="color-neutral-200 text-2xl">Prize pool: </Text>
                        <Text className="color-emerald-600 text-2xl">{data?.prizePool}$</Text>
                    </View>
                </View>
                <View className="flex flex-row justify-evenly mt-2 items-center">
                    
                    <Text className="color-neutral-200 text-xl rounded-lg p-1 bg-bgDarkLighter">{data?.mode}</Text>
                    <Text className="color-neutral-200 text-xl rounded-lg p-1 bg-bgDarkLighter">{(data?.maxTeams)} Slots</Text>
                    {
                        String(data?.teamSize) == "4" ? <Image className="size-12" tintColor={"#4DD0E1"} source={require("@/assets/images/squad.png")} /> :
                        String(data?.teamSize) == "2" ? <Image className="size-12" tintColor={"#4DD0E1"} source={require("@/assets/images/duo.png")} /> :
                        <Image className="size-12" tintColor={"#4DD0E1"} source={require("@/assets/images/solo.png")} />
                    }
                </View>

                <View className="flex flex-row justify-center items-center mt-4">
                    <Text className="color-slate-200 text-2xl bg-bgDarkLighter p-1 rounded-lg">Teams</Text>
                </View>
                <View className="border border-bgDarkLighter mt-5 flex-1 mb-12 rounded-lg ">
                    <FlatList
                        data={data?.registrations}
                        renderItem={renderItem}
                        keyExtractor={(item) => item._id.toString()}
                    />
                </View>
            </View>  
            }
        </>
    );
}

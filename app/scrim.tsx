import { useAuth } from "@/services/stores/useAuth";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {View, Text, Image, Pressable, TextInput} from 'react-native'
import {isValidDate, validateTime, maxTeamsValidator} from '@/services/validator'
import { createScrim } from "@/services/api";
import useFetch from "@/services/useFetch";


export default function Scrim(){
    const [title, setTitle] = useState("")
    const [date, setDate] = useState("")
    const [startTime, setStartTime] = useState("")
    const [checkInTime, setCheckInTime] = useState("")
    const [maxTeams, setMaxTeams] = useState("25")
    const [map, setMap] = useState("Erangel")
    const [mode, setMode] = useState("TPP")
    const [teamSize, setTeamSize] = useState("4")
    const [applications, setApplications] = useState("Open")
    const [cost, setCost] = useState("0")
    const [prizePool, setPrizePool] = useState("0")
    const [status, setStatus] = useState("Upcoming")
    const user = useAuth((s) => s.user)
    const maps = ["Erangel", "Livik", "Miramar", "Sanhok", "Rondo"]
    const modes = ["TPP", "FPP"]
    const errors: string[] = []
    const [error, setError] = useState("")
    const [ready, setReady ] = useState(false)
    


    const goBack = () => {
        router.replace("/(tabs)/scrims")
    }
    const handleCreate = async () => {
        if(ready && user !== null){
            const hostId = user?._id
            const scrim = {
                title,
                hostId,
                date, 
                startTime,
                maxTeams,
                map,
                mode,
                teamSize,
                applications,
                cost,
                prizePool,
                status,
            }
            const data = await createScrim("scrims/create", scrim)
            goBack()
        }
    }


        useEffect(() => {
        if(!(title !== "")) errors.push("Title cannot be empty")
        if((title.length > 25)) errors.push("Title must be under 25 characters")
        if(!isValidDate(date)) errors.push("Invalid Date, format: MM/DD/YYYY. Only future dates")
        if(!validateTime(startTime)) errors.push("Invalid Time, format: HH:MM AM/PM")
        if(!maps.includes(map)) errors.push("Map not available")
        if(!modes.includes(mode)) errors.push("Invalid mode. Only TPP | FPP")
        if(!(teamSize === "4" || teamSize === "2" || teamSize === "1")) errors.push("Team size can only be: 4, 2, 1")
        if(!(applications === "Open" || applications === "Closed")) errors.push("Applications can only be: Open | Closed")
        if(!(status === "Upcoming" || status === "Live" || status === "Finished")) errors.push("Status can only be: Upcoming | Live | Finished")
        if(cost === "") errors.push("Cost need to be at least 0")
        if(prizePool === "") errors.push("Prize pool needs to be at least 0")
        
        let max = maxTeamsValidator(map, teamSize)
        setMaxTeams(max)
        if(errors.length > 0 ){
            let text = ``
            errors.map((item) => {
                text += `${item} \n`
            })
            setError(text)
            setReady(false)
        }else{
            setError("")
            setReady(true)
        }

    }, [title, date, startTime,map, mode, teamSize, applications, cost, prizePool, status])

    return(
            <View className="flex flex-1 bg-bgDark">
                <View className="flex w-full flex-row items-center p-3 border-b border-bgDarkLighter">
                    <Pressable
                        className="bg-primary p-2 rounded-lg absolute ml-2"
                        onPress={goBack}
                    >
                        <Text className="color-bgDark text-2xl">
                            Back
                        </Text>
                    </Pressable>
                    <Text className="color-white text-3xl m-auto">
                        Create Scrim
                    </Text>
                </View>
                <View className="flex flex-1 items-center">
                    <View className="p-2 w-11/12 border-b border-bgDarkLighter">
                        <Text className="text-md color-red-600">{error ? error : ""}</Text>
                        <TextInput 
                            placeholder="Title: Aniversary Scrim..."
                            value={title}
                            onChangeText={setTitle}
                            className="bg-bgDarkLight color-slate-200 border border-bgDarkLight text-xl rounded-lg"
                            placeholderTextColor={"#ccc"}
                            autoFocus={true}
                        />
                    </View>
                    <View className="flex flex-row p-3">
                        <View className="flex-1 flex-row items-center">
                            <Text className="text-xl color-slate-200 mr-2">Date:</Text>
                            <TextInput
                                placeholder="MM/DD/YYYY"
                                placeholderTextColor={"#ccc"}
                                className="color-slate-100 bg-bgDarkLighter flex-1 mr-2 rounded-lg"
                                value={date}
                                onChangeText={setDate}
                            />
                        </View>
                        <View className="flex-1 flex-row items-center">
                            <Text className="text-xl color-slate-200 mr-2">Time:</Text>
                            <TextInput
                                placeholder="HH:MM PM/AM"
                                placeholderTextColor={"#ccc"}
                                className="color-slate-100 bg-bgDarkLighter flex-1 mr-2 rounded-lg"
                                value={startTime}
                                onChangeText={setStartTime}
                            />
                        </View>
                    </View>
                    <View className="flex flex-row p-3">
                        <View className="flex-1 flex-row items-center">
                            <Text className="text-xl color-slate-200 mr-2">Teams: </Text>
                            <Text className="text-xl color-slate-100 bg-bgDarkLighter p-2 rounded-lg">{maxTeams}</Text>
                        </View>
                        <View className="flex-1 flex-row items-center">
                            <Text className="text-xl color-slate-200 mr-2">Team Size:</Text>
                            <TextInput
                                placeholder="Default: 4"
                                placeholderTextColor={"#ccc"}
                                className="color-slate-100 bg-bgDarkLighter flex-1 mr-2 rounded-lg"
                                value={teamSize}
                                onChangeText={setTeamSize}
                            />
                        </View>
                    </View>
                    <View className="flex flex-row p-3">
                        <View className="flex-1 flex-row items-center">
                            <Text className="text-xl color-slate-200 mr-2">Map:</Text>
                            <TextInput
                                className="color-slate-100 bg-bgDarkLighter flex-1 mr-2 rounded-lg"
                                value={map}
                                onChangeText={setMap}
                            />

                        </View>
                        <View className="flex-1 flex-row items-center">
                            <Text className="text-xl color-slate-200 mr-2">
                                Mode:
                            </Text>
                            <TextInput 
                            className="color-slate-100 bg-bgDarkLighter flex-1 mr-2 rounded-lg"
                                value={mode}
                                onChangeText={setMode}
                            />
                        </View>
                    </View>
                    <View className="flex flex-row p-3">
                        <View className="flex-1 flex-row items-center">
                            <Text className="text-xl color-slate-200">
                                Cost: $
                            </Text>
                            <TextInput
                                className="color-slate-100 bg-bgDarkLighter flex-1 mr-2 rounded-lg"
                                value={cost}
                                onChangeText={setCost}
                            />
                        </View>
                        <View className="flex-1 flex-row items-center">
                            <Text className="text-xl color-slate-200">
                                Prize Pool: $
                            </Text>
                            <TextInput 
                                value={prizePool}
                                onChangeText={setPrizePool}
                                className="color-slate-100 bg-bgDarkLighter flex-1 rounded-lg"
                            />
                        </View>
                    </View>
                    <View className="flex flex-row p-3">
                        <View className="flex-1 flex-row items-center">
                            <Text className="text-xl color-slate-200">
                                Applications: 
                            </Text>
                            <TextInput
                                className="color-slate-100 bg-bgDarkLighter flex-1 mr-2 rounded-lg"
                                value={applications}
                                onChangeText={setApplications}
                            />
                        </View>
                        <View className="flex-1 flex-row items-center">
                            <Text className="text-xl color-slate-200">
                                Status: 
                            </Text>
                            <TextInput 
                                value={status}
                                onChangeText={setStatus}
                                className="color-slate-100 bg-bgDarkLighter flex-1 rounded-lg"
                            />
                        </View>
                    </View>
                    <View className="flex w-11/12 p-3">
                        <Pressable
                            onPress={handleCreate}
                            className="bg-primary p-2 flex justify-center items-center border border-bgDarkLight rounded-lg"
                        >
                            <Text className="color-bgDark text-3xl">Create</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
    )
}
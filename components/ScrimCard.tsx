import React, { useState } from "react";
import {Text, View, Image, Pressable} from 'react-native';
import * as Clipboard from 'expo-clipboard'
import { router } from "expo-router";

type scrimData = {
    _id: string, 
    title: string, 
    date: string, 
    startTime: string, 
    checkInTime: string,
    maxTeams: number, 
    map: string, 
    mode: string, 
    teamSize: number, 
    applications: string, 
    cost: string, 
    prizePool: string, 
    status: string, 
    registrations: []
}

export default function ScrimCard({_id, title, date, startTime, checkInTime, maxTeams, map, mode, teamSize, applications, cost, prizePool, status, registrations}: scrimData){
    const [copied, setCopied] = useState(false)
    const handleCopy = async () => {
        setCopied(!copied)
        await Clipboard.setStringAsync(_id)


    }
    const handleScrimCardTouch = () => {
        router.push({
            pathname: "/scrims/[id]",
            params: { id: _id},
        });
    }
    return(
        <Pressable
            onPress={handleScrimCardTouch}
        >
            <View className="flex w-11/12 mb-2 mt-2 ml-auto mr-auto p-2 bg-bgDarkLight rounded-lg border border-neutral-700">
                <View className="flex flex-row justify-between border-b border-bgDarkLighter pb-2">
                    <Text className="color-neutral-100 text-xl">{title}</Text>
                    <Text className="text-emerald-400 text-xl">{cost === "0" ? "Free": `${cost} $`}</Text>
                    <Text className={applications === "Open" ? "color-green-400 text-xl": "color-red-400 text-xl"}>{applications}</Text>
                </View>
                <View className="flex flex-row justify-between mt-2 items-center">
                    <Text className="color-neutral-200 text-xl rounded-lg p-1 ">Map: {map}</Text>
                    <Text className="color-neutral-200 text-xl rounded-lg p-1 ">{mode}</Text>
                    {
                        teamSize == 4 ? <Image className="size-12" tintColor={"#4DD0E1"} source={require("@/assets/images/squad.png")} /> :
                        teamSize == 2 ? <Image className="size-12" tintColor={"#4DD0E1"} source={require("@/assets/images/duo.png")} /> :
                        <Image className="size-12" tintColor={"#4DD0E1"} source={require("@/assets/images/solo.png")} />
                    }
                </View> 
                <View className="flex flex-row justify-between mt-3">
                    <Text className="color-neutral-400 text-xl bg-bgDarkLighter rounded-lg p-1">Date: {date}</Text>
                    <Text className="color-neutral-400 text-xl bg-bgDarkLighter rounded-lg p-1">Time: {startTime}</Text>
                </View>
                <View className="flex flex-row justify-between mt-3 border-b border-bgDarkLighter pb-2">
                    <Text className="color-neutral-400 text-xl bg-bgDarkLighter rounded-lg p-1">{maxTeams} Teams</Text>
                    <View className="flex flex-row justify-center items-center">
                        <Text className="color-neutral-200 text-2xl">Prize Pool:</Text><Text className="color-green-400 text-2xl"> {prizePool} $</Text>
                    </View>
                    <Text className="text-xl color-emerald-500">{status}</Text>
                </View>
                <Pressable
                onPress={handleCopy}
                className="mt-2 flex flex-row items-center justify-between"
                >
                    <Text className="color-neutral-400 text-xl bg-bgDarkLighter p-2 rounded-lg">ID: {_id}</Text>
                    {copied ? <Text className="color-neutral-400 text-xl">Copied</Text> : <Image className="size-8" tintColor={"#aaa"} source={require("@/assets/images/touch.png")} />}
                </Pressable>
            </View>
        </Pressable>
        
    )
}
import React, {useEffect } from "react";
import {View, Text,TextInput, Pressable} from 'react-native';
import { useAuth } from "@/services/stores/useAuth";
import { router } from "expo-router";
import { useState } from "react";
import { validPubgId } from "@/services/validator";


export default function Edit(){
    const id = useAuth((s) => s.user)?.id
    const token = useAuth((s) => s.token)
    const [bio, setBio] = useState("");
    const [pubgId, setPubgId] = useState("");
    const [pubgRegion, setPubgRegion] = useState("")
    const baseUrl = 'http://192.168.1.65:3000/api/'
    const [errorMessage, setErrorMessage] = useState("")
    useEffect(() => {
        const {valid, errors} = validPubgId(pubgId);
        if(!valid){
            let text = ``
            errors.map(item => {text +=  `${item} \n`})
            setErrorMessage(text)
        }
        if(!(errors.length > 0)) setErrorMessage("")
    }, [pubgId]);

    const handleEdit = async () => {
        if(errorMessage !== ""){
            return
        }
        const res =  await fetch(`${baseUrl}users/editData`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({id, bio, pubgId, pubgRegion})
        })
        const user = await res.json()
        useAuth.getState().setAuth({user: user, token: token})
        router.replace('/(tabs)/profile')
    }
    const goBack = () => {
        router.replace("/(tabs)/profile")
    }
    return(
        <View className="bg-bgDark flex flex-1 items-center">
            <Text className="color-white text-3xl mt-10">
                Update Profile
            </Text>
            <View className="bg-bgDarkLight border border-bgDarkLighter w-11/12 p-3 mt-10 rounded-md">
                <Text className="color-red-600 m-auto text-xl">{errorMessage ? errorMessage : ""}</Text>
                <Text className="color-white text-xl">Pubg ID</Text>
                <TextInput 
                    placeholder=" 123456789"
                    placeholderTextColor={"#fff"}
                    className="bg-bgDarkLighter rounded-lg mt-2 color-white"
                    value={pubgId}
                    onChangeText={setPubgId}
                />
                <Text className="color-white text-xl">Server</Text>
                <TextInput 
                    placeholder="North America, Europe, Asia, South America, etc"
                    placeholderTextColor={"#fff"}
                    className="bg-bgDarkLighter rounded-lg mt-2 color-white"
                    value={pubgRegion}
                    onChangeText={setPubgRegion}
                />
                <Text className="color-white text-xl">Bio</Text>
                <TextInput 
                    placeholder=" Up to 90 Characters"
                    placeholderTextColor={"#fff"}
                    className="bg-bgDarkLighter rounded-lg mt-2 color-white"
                    value={bio}
                    onChangeText={setBio}
                />
                <View className="flex flex-row justify-evenly">
                    <Pressable
                        onPress={goBack}
                    >
                        <Text className="bg-cancel color-white mt-5 text-2xl p-3 rounded-lg">
                            Cancel
                        </Text>
                    </Pressable>
                    <Pressable
                        onPress={handleEdit}
                    >
                        <Text className="bg-primary color-white mt-5 text-2xl p-3 rounded-lg">
                            Apply
                        </Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}
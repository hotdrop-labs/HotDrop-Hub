import {View, Text, TextInput, Pressable} from 'react-native';
import Checkbox from 'expo-checkbox'
import {Link, Redirect} from 'expo-router'
import { useState, useEffect, use } from 'react';
import SubmitButton from './SubmitButton';
import { loginRequest } from "@/services/auth";
import { useAuth} from '@/services/stores/useAuth';
import { isValidEmail} from '@/services/validator';



export default function LoginCard(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const baseUrl = 'http://192.168.1.65:3000/api/'
    const [showPassword, setShowPassword] = useState(false)
    const [ValidatorString, setValidatorString] = useState("")
    const [redirect, setRedirect] = useState(false)

    const handleLogin = async () => {
            try{
                if(email=="" || password==""){setValidatorString("All fields are required");return}
                const {token, user} = await loginRequest(baseUrl, {email, password});
                useAuth.getState().setAuth({user: user, token: token})
                setRedirect(true)
            }catch(e: unknown){
                if(e instanceof Error){
                    if(e.message == "USER_NOT_FOUND") setValidatorString("Invalid Credentials")
                    if(e.message == "INCORRECT_PASSWORD") setValidatorString("Invalid Credentials")
                }else{
                    setValidatorString("Unknown Error")
                }
            }
        }
    useEffect(() => {
        isValidEmail(email) ? setValidatorString("") : setValidatorString("Incorrect email")
    }, [email])
    if(redirect){ 
        return <Redirect href={'/(tabs)'} />
    }else{
        return (
        <View className='flex justify-center w-11/12 bg-bgDarkLight h-fit rounded-[15] pb-7 mt-8 border border-gray-700'>
            <View className='flex w-11/12 m-auto items-center mt-2'>
                {ValidatorString ? <Text className='text-md color-red-400'>{ValidatorString}</Text>:<Text> </Text>}
            </View>
            <Text className='mt-2 color-gray-200 ml-4 mb-3 text-xl'>Email</Text>            
            <TextInput 
                placeholder='you@example.com' 
                className='m-auto color-gray-100 border border-gray-600 rounded-md w-11/12 bg-bgDarkLighter'
                placeholderTextColor={"#fff"}
                value={email}
                onChangeText={setEmail}
            />
            <Text className='mt-7 color-gray-200 ml-4 mb-3 text-xl'>Password</Text>
            <TextInput 
                placeholder='Password' 
                className='m-auto color-gray-100 border border-gray-600 rounded-md w-11/12 bg-bgDarkLighter'
                placeholderTextColor={"#fff"}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
            />

            <View className='mt-4 w-11/12 flex flex-row justify-between m-auto'>
                <Pressable
                    onPress={() => setShowPassword(!showPassword)}
                    className="flex flex-row items-center justify-center gap-2 ml-2"
                >
                    <Checkbox
                        value={showPassword}
                        onValueChange={setShowPassword}
                        color={showPassword ? "#e6b800" : undefined} // tu dorado
                    />
                    <Text className="text-gray-200">{showPassword ? "Hide text" : "Show text"}</Text>
                </Pressable>
                <Link className='text-gray-200' href={"/(auth)/signup"}>Forgot password?</Link>
            </View>
            <SubmitButton
                title="Sign In"
                onPress={() => {
                    handleLogin()
                }}
                opacity={ValidatorString !== "" ? true : false}
                />
        </View>
        )
    }
}
    
import {View, Text, TextInput, Pressable} from 'react-native';
import { useState, useEffect } from 'react';
import SubmitButton from './SubmitButton';
import { createUser } from '@/services/api';
import Checkbox from 'expo-checkbox';
import {router} from 'expo-router';
import { isValidEmail, isValidPassword, isValidUsername } from '@/services/validator';



export default function SignUpCard(){
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false)
    const [ValidatorString, setValidatorString] = useState("")

    const handleSignUp = async () => {
        if(ValidatorString !== "") return
        const userData = {username, email, password}
        try{
            const resp = await createUser("auth/register", userData)
            if(resp){
                router.replace({ pathname: "/(auth)/login", params: { msg: "Account created" } });
            }else{
            console.log("An error ocurred")
            }
        }catch(err){
            console.error("error registering user")
        }
    }

    useEffect(() => {
        isValidEmail(email) ? setValidatorString("") : setValidatorString("Incorrect email")
        const {valid, errors} = isValidPassword(password)
        if(!valid && password !== ""){
            let text = ``
            errors.map(item => {text += `${item} \n`})
            setValidatorString(text)
            }
        const {validUsername, usernameErrors} = isValidUsername(username)
        if(!validUsername && username !== ""){
            let text = ``
            for(let i=0;i<usernameErrors.length;i++){
                text += `${usernameErrors[i]}\n`
            }
            setValidatorString(text)
        }
    }, [email, username, password])

    return (
        <View className='flex justify-center w-11/12 bg-bgDarkLight rounded-[15] pb-7 mt-8 border border-gray-700'>
            <View className='flex w-11/12 m-auto items-center mt-2'>
                {ValidatorString ? <Text className='text-md color-red-400'>{ValidatorString}</Text>:<Text> </Text>}
            </View>
            <Text className='mt-2 color-gray-200 ml-4 mb-3 text-xl'>Email</Text>
            <TextInput 
                placeholder='You@example.com' 
                className='m-auto color-gray-100 border border-gray-600 rounded-md w-11/12 bg-bgDarkLighter'
                placeholderTextColor={"#fff"}
                value={email}
                onChangeText={setEmail}
            />
            <Text className='mt-7 color-gray-200 ml-4 mb-3 text-xl'>Username</Text>
            <TextInput 
                placeholder='Username' 
                className='m-auto color-gray-100 border border-gray-600 rounded-md w-11/12 bg-bgDarkLighter'
                placeholderTextColor={"#fff"}
                value={username}
                onChangeText={setUsername}
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
            <View className='mt-4 w-11/12 flex flex-row justify-center'>
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
            </View>
            <SubmitButton
                title="Sign Up"
                onPress={() => {
                    handleSignUp()
                }}
                opacity={ValidatorString !== "" ? true : false}
                />
        </View>
    )
}
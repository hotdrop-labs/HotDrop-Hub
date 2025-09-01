import {View, Image, Text, Pressable, FlatList, TextInput, Alert} from "react-native";
import Modal from 'react-native-modal'
import { useAuth} from "@/services/stores/useAuth";
import { SvgUri} from 'react-native-svg'
import { router } from "expo-router";
import useFetch from "@/services/useFetch";
import { createSquadAPI, editSquadAPI, fetchSquads, fetchUser, fetchUserByPubgId} from "@/services/api";
import { useEffect, useState, useCallback} from "react"

type squadType = {
    _id: string,
    name: string,
    members: string[]
}

export type squadUserType = {
        _id: string,
        username: string,
        avatarUrl: string
    }

export default function Profile (){
    const user = useAuth((s) => s.user)
    const {data : squads, error, loading} = useFetch<squadType[]>(() => fetchSquads("squads/getAll"))
    const [squad, setSquad] = useState<squadType>()
    const [squadUsers, setSquadUsers] = useState<squadUserType[]>([])
    const [modalVisible, setModalVisible] = useState(false)
    const [squadName, setSquadName] = useState("")
    const [findUserModal, setFindUserModal] = useState(false)
    const [foundUser, setFoundUser ] = useState<squadUserType>()
    const [foundUserId, setFoundUserId] = useState<string>("")
    useEffect(() => {
        if (squads && user) {
            const foundSquad = squads.find(squad =>
                squad?.members?.includes(user.id)
            );
            if (foundSquad) {
            const { _id, name, members } = foundSquad;
            // if(foundSquad.members.length < 4) members.push("ADD")
            setSquad({ _id, name, members });
            }
        }
    }, [squads]);


    useEffect(() => {
    if (squad) {
        const getUsers = async () => {
        try {
            const promises = squad.members.map((id: string) => {
                return fetchUser({ query: "users/getUser", id })
        })
            const results = await Promise.all(promises)

            const arr: squadUserType[] = results.map(({ _id, username, avatarUrl }) => ({
            _id,
            username,
            avatarUrl
            }))

            setSquadUsers(arr)
        } catch (err) {
            console.error("Error fetching users:", err)
        }
        }
        getUsers()
    }
    }, [squad])


    const handleLogout = () => {
        useAuth.getState().clearAuth()
    }
    const handleEdit = () => {
        router.replace("/edit")
    }
    
    const renderItem = useCallback(({item, index}:{item: string, index: number}) => {
        const currentUser = squadUsers.find(u => u._id === item)
        if(!currentUser){
            return(
                <View className="justify-center items-center">
                    <Text className="color-slate-400 text-2xl">Loading...</Text>
                </View>
            )
        }
         return (
                <View className="justify-center items-center">
                    <View className="border border-bgDarkLighter rounded-full p-2">
                        <SvgUri width={50} height={50} uri={currentUser?.avatarUrl ?? null} />
                    </View>
                    <Text className="color-slate-200 ">
                         {currentUser?.username ?? "Desconocido"}
                    </Text>
                </View>
            );
        }, [squadUsers])
    const createSquad = async () => {
        const id = user ? user._id : "NOT_FOUND"
        const res =  await createSquadAPI({query:'squads/create', _id: id, name: (squadName ?? `Team${String(Math.floor(Math.random() * 10_000_000) + 1)}`)})
        if(res) setSquad(res)
        setModalVisible(false)
        setSquadName("")
    }
    const editSquad = async () => {
        const _id = foundUser?._id
        if(squad && _id){
            if(squad.members.length === 4){Alert.alert("Error", "Team is full");return}
            if(squad.members.includes(_id)){ Alert.alert("Error", "User already exists");return}
            const res = await editSquadAPI({teamId: squad._id, _id: _id})
            setSquad(res)
        }
    }
    const handleAddMember = async () => {
        try{
            if(foundUserId){
            const user: squadUserType = await fetchUserByPubgId({ query: "users/getUserByPubgId", id: foundUserId })
            const {_id, username, avatarUrl} = user
            setFoundUser({_id, username, avatarUrl})

        }
        }catch(err){
            console.log(err)
            setFoundUser(undefined)
        }
        
    }

    return (
        
        <View className="flex flex-1 bg-bgDark">
            <Modal
            isVisible={modalVisible}
            >
            <View className="flex-1 items-center justify-center">
            <View className="flex bg-bgDarkLighter p-5 rounded-lg">
                <Text className="text-2xl text-center mb-4 color-slate-100">
                Enter Squad Name
                </Text>

                <TextInput
                className="border border-gray-300 rounded-lg px-4 py-2 mb-4 text-slate-50"
                placeholder="Squad Name"
                placeholderTextColor="#eee"
                value={squadName}
                onChangeText={setSquadName}
                />

                <View className="flex-row justify-between">
                <Pressable
                    className="flex-1 bg-red-700 py-2 rounded-lg mr-2"
                    onPress={() => setModalVisible(false)}
                >
                    <Text className="text-white text-center font-semibold">
                    Cancel
                    </Text>
                </Pressable>

                <Pressable
                    className={`flex-1 py-2 rounded-lg ml-2 ${
                    squadName.trim()
                        ? "bg-blue-600"
                        : "bg-blue-600/50"
                    }`}
                    disabled={!squadName.trim()}
                    onPress={createSquad}
                >
                    <Text className="text-white text-center font-semibold">
                    Save
                    </Text>
                </Pressable>
                </View>
            </View>
            </View>
        </Modal>
        <Modal
            isVisible = {findUserModal}
        >
            <View className="flex-1 items-center justify-center">
                    <View className="flex bg-bgDarkLighter p-3 rounded-lg">
                        <View className="flex flex-row justify-start">
                            <Pressable onPress={() => {setFindUserModal(false)}} className="bg-red-700 p-3 rounded-lg">
                                <Text className="text-xl text-slate-200">Back</Text>
                            </Pressable>
                        </View>
                        <View className="flex flex-row mt-5 mb-5">
                            <TextInput
                                placeholder="Pubg ID"
                                placeholderTextColor={"#eee"}
                                className="w-[200px] bg-bgDark rounded-lg p-1 pl-2 text-slate-100"
                                value={foundUserId}
                                onChangeText={setFoundUserId}
                            />
                            <Pressable onPress={handleAddMember} className="bg-blue-600 flex justify-center ml-3 p-2 rounded-lg px-6">
                                    <Image source={require("@/assets/images/search.png")} className="size-7" tintColor={"#fff"} />
                            </Pressable>
                        </View>
                        {foundUser ? 
                        <View className="flex flex-row m-2 border border-slate-400 items-center p-2 rounded-lg">
                            <View>
                                <SvgUri uri={foundUser.avatarUrl} width={40} height={40} />
                            </View>
                            <Text className="text-xl text-slate-100 ml-5">{foundUser.username}</Text>
                            <Pressable onPress={editSquad} className="ml-auto">
                                <Text className="color-slate-100 text-4xl mr-5">+</Text>
                            </Pressable>
                        </View> 
                        :
                        <></>
                        }
                    </View>
            </View>
        </Modal>
            <View className="w-full flex flex-row h-fit mt-10 items-center border-b border-bgDarkLighter pb-5">
                <View className="w-fit h-fit mr-5 ml-8 rounded-full border-2 border-bgDarkLighter p-2">
                    <SvgUri width={80} height={80} uri={user?.avatarUrl ?? null} />
                </View>
                <View className="flex w-[50%]">
                    <Text className="text-3xl color-white"># {user?.username}</Text>
                    <Text className="text-md color-slate-300 flex-wrap p-1 rounded-lg">{user?.bio ? user?.bio : "Your bio is empty"}</Text>
                    <View className=" bg-bgDarkLighter p-2 rounded-lg flex flex-row items-center mr-auto">
                        <View className="mr-2 p-2 bg-primary rounded-full">
                            <Image className="size-5" source={require("@/assets/images/wallet.png")} />
                        </View>
                            <Text className="ml-auto color-white text-2xl"> - {user?.wallet?.toString() || "N/A"}$</Text>
                    </View>
                </View>
                
                <View className="ml-auto mr-5 w-[10%]">
                    <Pressable
                        onPress={handleEdit}
                        className="bg-primary rounded-full p-2"
                    >
                        <Image className="size-8" source={require('@/assets/images/edit.png')} />
                    </Pressable>
                </View>
            </View>
            <View className="flex flex-1 w-full mt-5">
                <View className="ml-5 flex w-11/12 flex-1 mb-32">

                    <View className="mt-4 bg-bgDarkLighter p-2 rounded-lg flex flex-row items-center">
                        <View className="mr-2 p-2 bg-primary rounded-full"><Image className="size-8" source={require("@/assets/images/controller.png")} /></View><Text className="color-white text-2xl">Pubg ID: </Text><Text className="ml-auto color-white text-2xl">{user?.pubgId || "N/A"}</Text>
                    </View>
                    <View className="mt-4 bg-bgDarkLighter p-2 rounded-lg flex flex-row items-center">
                        <View className="mr-2 p-2 bg-primary rounded-full"><Image className="size-8" source={require("@/assets/images/location.png")} /></View><Text className="color-white text-2xl">Region: </Text><Text className="ml-auto color-white text-2xl">{user?.pubgRegion || "N/A"}</Text>
                    </View>
                    <View className="mt-4 bg-bgDarkLighter p-2 rounded-lg flex flex-row items-center">
                        <View className="mr-2 p-2 bg-primary rounded-full"><Image className="size-8" source={require("@/assets/images/stats.png")} /></View><Text className="color-white text-2xl">Scrims Played: </Text><Text className="ml-auto color-white text-2xl">{user?.scrimsPlayed}</Text>
                    </View>
                    <View className="mt-4 bg-bgDarkLighter p-2 rounded-lg flex flex-row items-center">
                        <View className="mr-2 p-2 bg-primary rounded-full"><Image className="size-8" source={require("@/assets/images/trophie.png")} /></View><Text className="color-white text-2xl">Scrims Won: </Text><Text  className="ml-auto color-white text-2xl">{user?.scrimsWon}</Text>
                    </View>
                    {squad ? 
                    <View className="flex flex-row justify-center items-center p-2">
                        <Text className="color-slate-200 text-2xl bg-bgDarkLight p-1 rounded-lg">{squad?.name}</Text>
                    </View>
                    :
                        <></>
                    }
                    <View className="border border-bgDarkLighter p-2 rounded-lg mt-1">
                          { squad !== undefined ? 
                            <FlatList 
                                data={squad?.members}
                                renderItem={renderItem}
                                keyExtractor={(item) => item.toString()}
                                horizontal
                                contentContainerStyle={{
                                    justifyContent: "space-evenly",
                                    flex: 1
                                }}
                            />
                            : <Pressable 
                                onPress={() => setModalVisible(true)}
                                className="flex flex-row w-full justify-center"
                                >
                                    <Text className="color-bgDark text-2xl bg-primary p-2 rounded-lg">Create Squad</Text>
                                </Pressable>
                            }
                    </View>
                    {squad ? squad?.members.length < 4 ? 
                        <Pressable onPress={() => {setFindUserModal(true);setFoundUser(undefined)}}  className="mx-auto mt-3 bg-primary rounded-full px-3">
                            <Text className="color-bgDark text-4xl p-1">+</Text>
                        </Pressable>
                    : <></>
                    : <></>
                    }
                    <Pressable
                        onPress={handleLogout}
                        className="flex-row flex items-center bg-red-900 p-2 border border-bgDarkLight rounded-lg mt-auto justify-center"
                    >
                        <Image className="size-6" source={require("@/assets/images/logout.png")} tintColor={"#fff"} />
                        <Text className="color-white text-2xl p-2 ml-5">LogOut</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}
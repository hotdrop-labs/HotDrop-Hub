import { useState, useEffect } from "react"
import { squadUserType } from "@/app/(tabs)/profile"
import { fetchUser } from "@/services/api"
import { FlatList } from "react-native"
import { View, Image, Text } from "react-native"
import { SvgUri } from "react-native-svg"

export const TeamMembers = ({ memberIds }: { memberIds: string[] }) => {
  const [users, setUsers] = useState<squadUserType[]>([])

  useEffect(() => {
    const loadUsers = async () => {
      const loaded = await Promise.all(
        memberIds.map(async (id) => {
          const user = await fetchUser({ query: "users/getUser", id })
          return {
            _id: user._id,
            username: user.username,
            avatarUrl: user.avatarUrl,
          }
        })
      )
      setUsers(loaded)
    }

    loadUsers()
  }, [memberIds])

  return (
    <FlatList
      data={users}
      keyExtractor={(u) => u._id}
      renderItem={({ item }) => (
        <View className="flex border border-bgDarkLighter rounded-lg p-1 m-2 items-center">
          <SvgUri width={60} height={60} uri={item?.avatarUrl ?? null} />
          <Text style={{ color: "white", marginLeft: 8 }}>{item.username}</Text>
        </View>
      )}
      horizontal
    />
  )
}

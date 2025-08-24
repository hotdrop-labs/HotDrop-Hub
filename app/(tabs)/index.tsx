import {Text, View, Image, FlatList, ActivityIndicator} from "react-native";
import {Link, useRouter} from "expo-router";
import useFetch from "@/services/useFetch";
import {fetchPosts} from "@/services/api";
import PostCard from "@/components/PostCard"
import { useCallback } from "react";
import { useAuth } from "@/services/stores/useAuth";

export default function Index() {
    const router = useRouter();
    const {data: posts, loading: postLoading, error: postError} = useFetch(() => fetchPosts({query: 'posts/getAll'}))
    const renderItem = useCallback(({ item }:{item:any}) => {
        return <PostCard {...item} />;
    }, []);
    const token = useAuth((s) => s.token)

  return (
    <View className={'flex-1 flex bg-bgDark'}>
      {!token ? <View className={"flex items-center justify-center border-b border-gray-500"}>
          <Link className={"bg-yellow-600 rounded-full w-2/5 text-center color-white text-2xl mt-3 mb-3"} href={'/(auth)/login'}>Login</Link>
      </View> : <></>}
        <View className={"flex flex-row items-center justify-center border-b border-gray-500"}>
            <Image className={"size-16"} source={require('../../assets/images/icon.png')} />
            <Text className={"color-white text-2xl"}>HotDrop</Text>
        </View>
        <View className={"flex flex-row items-center justify-center"}>
            {postLoading ? (
                <ActivityIndicator size="large" color={"#0000ff"} className={"mt-10 self-center"} />
            ) : postError ? (
                <Text className={"color-red-500"}>Error loading posts</Text>
            ): (
                <View className={"flex flex-1 w-full items-center justify-center"}>
                    <FlatList
                        data={posts}
                        renderItem={renderItem}
                        keyExtractor={(item) => item._id.toString()}
                        className={"flex w-full"}
                    />
                </View>
            )}
        </View>

    </View>
  );
}

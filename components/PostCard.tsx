import React from 'react';
import {View, Text} from "react-native";
import { useEffect, useState } from 'react';
import { fetchUser } from '@/services/api';

interface Post {
    _id: string;
    ownerId: string;
    postText: string;
    likes: number;
    comments: number;
    likesArray: [];
    commentsArray: [];
    createdAt: string;
}

const PostCard = ({_id, ownerId, postText, likes, comments, likesArray, commentsArray, createdAt}: Post) => {
    return (
        <View className={"flex w-11/12 m-auto mb-5 mt-5 rounded-md bg-black"}>
            <Text className={"color-white"}>
                {}
            </Text>
        </View>
    )
}

export default PostCard;
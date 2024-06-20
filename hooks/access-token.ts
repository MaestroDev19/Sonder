import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { AsyncStorageKeys } from "../types/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import SonderApi from "../api";

async function getAccessToken() {
    const result  = await AsyncStorage.getItem(AsyncStorageKeys.ACCESS_TOKEN)
    return result
}

async function getRefreshToken() {
    const result  = await AsyncStorage.getItem(AsyncStorageKeys.REFRESH_TOKEN)
    return result
}

async function refreshAccessToken() {
    const refreshToken = await getRefreshToken();
 
    const response = await SonderApi.post('/renew-token', {
        refresh_token: refreshToken
    }, {
        headers: {
            "Refresh": refreshToken
        }
    })

    return response.data.data as { access_token: string }
}


const useAccessToken = () => {
    const queryClient = useQueryClient();

    async function saveAccessToken(tokenUrl: string) {
        const res = await fetch(tokenUrl);
        const { data } = await res.json();

        AsyncStorage.setItem(AsyncStorageKeys.ACCESS_TOKEN, data.access_token)
        AsyncStorage.setItem(AsyncStorageKeys.REFRESH_TOKEN, data.refresh_token)
    }

    const { data: accessToken } = useQuery({
        queryKey: [AsyncStorageKeys.ACCESS_TOKEN],
        queryFn: getAccessToken,
    })

    const { mutate: refreshToken } = useMutation({
        mutationKey: ["refresh-access-token"],
        mutationFn: refreshAccessToken,
        onSuccess: async (data) => {
            await AsyncStorage.setItem(AsyncStorageKeys.ACCESS_TOKEN, data.access_token)
            queryClient.invalidateQueries({
                queryKey: [AsyncStorageKeys.ACCESS_TOKEN]
            })
        },
    })



}
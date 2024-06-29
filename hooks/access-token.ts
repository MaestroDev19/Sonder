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

async function deleteTokens() {
    return await Promise.all([
        await AsyncStorage.removeItem(AsyncStorageKeys.ACCESS_TOKEN),
        await AsyncStorage.removeItem(AsyncStorageKeys.REFRESH_TOKEN)
    ])
}

async function refreshAccessToken() {
    const refreshToken = await getRefreshToken();
        
    const response = await SonderApi.get('/renew-token', {
        headers: {
            "Refresh": refreshToken
        }
    })

    return response.data.data as { access_token: string }
}

async function getTokens(tokenUrl: string) {
    const res = await fetch(tokenUrl, { cache: "no-cache" });
    const { data } = await res.json();
    return data as { access_token: string, refresh_token: string }    
}



const useAccessToken = () => {

    const queryClient = useQueryClient();

    const { mutateAsync: saveAccessToken } = useMutation({
        mutationKey: ['save-access-token'],
        mutationFn: async (tokenUrl: string) => {
            return await getTokens(tokenUrl)
        },
        onSuccess: async (data) => {
            const [accessToken, refreshToken] = await Promise.all([
                await AsyncStorage.getItem(AsyncStorageKeys.ACCESS_TOKEN),
                await AsyncStorage.getItem(AsyncStorageKeys.REFRESH_TOKEN)
            ])
            if (accessToken || refreshToken) return
            
            AsyncStorage.setItem(AsyncStorageKeys.ACCESS_TOKEN, data.access_token)
            AsyncStorage.setItem(AsyncStorageKeys.REFRESH_TOKEN, data.refresh_token)
            
            return queryClient.invalidateQueries({
                queryKey: [AsyncStorageKeys.ACCESS_TOKEN]
            })
        }
    })

    const { data: accessToken } = useQuery({
        queryKey: [AsyncStorageKeys.ACCESS_TOKEN],
        queryFn: getAccessToken,
    })

    const { mutateAsync: refreshToken } = useMutation({
        mutationKey: ["refresh-access-token"],
        mutationFn: refreshAccessToken,
        onSuccess: async (data) => {
            await AsyncStorage.setItem(AsyncStorageKeys.ACCESS_TOKEN, data.access_token)
            return queryClient.invalidateQueries({
                queryKey: [AsyncStorageKeys.ACCESS_TOKEN]
            })
        },
    })

    const { mutateAsync: removeTokens } = useMutation({
        mutationFn: deleteTokens,
        mutationKey: ['logout'],
        onSuccess: async () => {
            return queryClient.invalidateQueries({
                queryKey: [AsyncStorageKeys.ACCESS_TOKEN]
            })
        }
    })

    const unstable_refreshToken = async () => {
        const { access_token } = await refreshAccessToken();
        await AsyncStorage.setItem(AsyncStorageKeys.ACCESS_TOKEN, access_token)
        queryClient.invalidateQueries({
            queryKey: [AsyncStorageKeys.ACCESS_TOKEN]
        })
    }
    return { accessToken, refreshToken, saveAccessToken, unstable_refreshToken, removeTokens }



}

export default useAccessToken
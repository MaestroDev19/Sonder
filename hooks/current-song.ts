import { useQuery, useQueryClient } from "@tanstack/react-query"
import SonderApi from "../api"
import useAccessToken from "./access-token"
import { CurrentTrack, ReactQueryKeys, User } from "../types/types";
import { useEffect, useState } from "react";
import useCurrentUser from "./current-user";
import { createSentrySpan } from "../sentry/spans";

const useCurrentTrack = () => {
    const { accessToken } = useAccessToken();
    const { userProfile } = useCurrentUser();
    const queryClient = useQueryClient();

    const { isLoading, data: currentTrack } = useQuery({
        queryKey: [ReactQueryKeys.CURRENT_TRACK],
        queryFn: async () => {
            const res =  await createSentrySpan("current-song", async () => {
                const response = await SonderApi.get(`/users/me/playing?country=${userProfile?.country}`, {
                    headers: {
                        "Authorization": `Bearer ${accessToken}`
                    }
                });
                const currentTrack = response.data.data as CurrentTrack
                setCurrentTrackProgress(currentTrack?.progress)
                return currentTrack
            })

            return res
        },
        enabled: !!accessToken && !!userProfile?.country,
        refetchOnReconnect: true,
        refetchOnMount: true,
        refetchOnWindowFocus: true,
    })

    const [currentTrackProgress, setCurrentTrackProgress] = useState<number>(0)

    useEffect(() => {
        if(!currentTrack) return
        const interval = setInterval(() => {
            setCurrentTrackProgress((prev) => prev + 1000)
        }, 1000)
        
        return () => {
            clearInterval(interval)
        }
    }, [currentTrack?.name])
    
    useEffect(() => {
        if(currentTrackProgress >= currentTrack?.duration) {
            return refreshTrack();
        }
    }, [currentTrack, currentTrackProgress])


    const refreshTrack = () => {
        queryClient.invalidateQueries({
            queryKey: [ReactQueryKeys.CURRENT_TRACK],
        })
    }



    return { isLoading, currentTrack, refreshTrack, currentTrackProgress }
}

export default useCurrentTrack
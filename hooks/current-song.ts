import { useQuery, useQueryClient } from "@tanstack/react-query"
import SonderApi from "../api"
import useAccessToken from "./access-token"
import { CurrentTrack, User } from "../types/types";
import { useEffect, useState } from "react";

const useCurrentTrack = () => {
    const { accessToken } = useAccessToken();
    const queryClient = useQueryClient();

    const { isLoading, data: currentTrack } = useQuery({
        queryKey: ['current-track'],
        queryFn: async () => {
            const response = await SonderApi.get('/users/me/playing?country=NG', {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            });
            const currentTrack = response.data.data as CurrentTrack
            console.log(currentTrack)
            setCurrentTrackProgress(currentTrack?.progress)
            return currentTrack
        },
        enabled: !!accessToken,
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
    }, [currentTrackProgress])


    const refreshTrack = () => {
        queryClient.invalidateQueries({
            queryKey: ['current-track'],
        })
    }



    return { isLoading, currentTrack, refreshTrack, currentTrackProgress }
}

export default useCurrentTrack
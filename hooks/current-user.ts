import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import SonderApi from "../api"
import useAccessToken from "./access-token"
import { ReactQueryKeys, User } from "../types/types";
import { createSentrySpan } from "../sentry/spans";
import { ImageUploadService } from "../services/ImageUpload";
import { toast, ToastPosition } from "@backpackapp-io/react-native-toast";
import { useSetOnlineStatus } from "./online-status";
import { useRouter } from "expo-router";

const useCurrentUser = () => {
    const { accessToken, removeTokens } = useAccessToken();
    const queryClient = useQueryClient();
    const { setStatusToOnline } = useSetOnlineStatus();
    const router = useRouter();


    const { isLoading, data: userProfile } = useQuery({
        queryKey: [ReactQueryKeys.CURRENT_USER],
        queryFn: async () => {
            const res = await createSentrySpan("current-user", async () => {
                const response = await SonderApi.get('/users/me', {
                    headers: {
                        "Authorization": `Bearer ${accessToken}`,
                        "Content-Type": "application/json"
                    }
                });
                const user = response.data.data as User
                await setStatusToOnline(user.id)
                return user
            })

            return res as User
        },
        enabled: !!accessToken,
    })

    const { mutateAsync: updateUser, isPending: userPending, reset: updateUserReset } = useMutation({
        mutationFn: async (updatedUser: Partial<User>) => {
            return await SonderApi.put('/users/me', { ...updatedUser }, {
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                }
            })
        },
        mutationKey: ['update'],
        onSuccess: () => {
            toast('Updated Profile Sucessfully', {
                position: ToastPosition.BOTTOM
            })

            return queryClient.invalidateQueries({
                queryKey: [ReactQueryKeys.CURRENT_USER],
            })
        }
    })

    const { mutateAsync: updateBanner, isPending: bannerPending } = useMutation({
        mutationFn: async (banner: string) => {
            const url = await ImageUploadService.uploadImage("banners", `${userProfile.id}.png`, banner)
            return await SonderApi.put('/users/me/banner', { url }, {
                params: {
                    user_id: userProfile?.id
                }
            })
        },
        onSuccess: () => {
            toast('Updated Banner Sucessfully', {
                position: ToastPosition.BOTTOM
            })

            return queryClient.invalidateQueries({
                queryKey: [ReactQueryKeys.CURRENT_USER],
            })
        }
    })

    const { mutateAsync: updateAvatar, isPending: avatarPending } = useMutation({
        mutationFn: async (avatar: string) => {
            const url = await ImageUploadService.uploadImage("avatars", `${userProfile.id}.png`, avatar)
            return await SonderApi.put('/users/me/avatar', { url }, {
                params: {
                    user_id: userProfile?.id
                }
            })
        },
        onSuccess: () => {
            toast('Updated Avatar Sucessfully', {
                position: ToastPosition.BOTTOM
            })

            return queryClient.invalidateQueries({
                queryKey: [ReactQueryKeys.CURRENT_USER],
            })
        }

    })

    const refreshUser = () => {
        queryClient.invalidateQueries({
            queryKey: [ReactQueryKeys.CURRENT_USER],
        })
    }

    const logoutUser = async () => {
        queryClient.removeQueries({
            queryKey: [ReactQueryKeys.CURRENT_USER],
        })
        await removeTokens()
        return router.replace('/login')
    }



    return { 
        isLoading, 
        userProfile, 
        refreshUser, 
        logoutUser,
        updateAvatar, 
        updateBanner,
        updateUser,
        savePending: avatarPending || bannerPending || userPending,
        updateUserReset 
    }
}

export default useCurrentUser
import { addDoc, collection, getDocs, query, Timestamp, where } from "firebase/firestore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Chat, Media, Message, ReactQueryKeys } from "../types/types";
import { createSentrySpan } from "../sentry/spans";
import { firestore } from "../lib/firebase"
import useCurrentUser from "./current-user";

const useChats = () => {
    const chatsCollection = collection(firestore, "chats");
    const queryClient = useQueryClient();

    const { userProfile } = useCurrentUser();


    const { isLoading, data } = useQuery({
        queryKey: [ReactQueryKeys.CHATS],
        queryFn: async () => {
            const res = await createSentrySpan("chats", async () => {
                const docsQuery = await getDocs(
                    query(chatsCollection, where("members", "array-contains", userProfile?.id)) 
                )
                return docsQuery.docs.map((doc) => {
                    return {
                        id: doc.id,
                        ...doc.data()
                    } as Chat
                })
            })

            return res as Chat[]
        }
    })

    const addChatMutation = useMutation({
        mutationFn: async ({ friend_id, message, media }: { media: Media[], friend_id: string, message: string}) => {
            const res = await createSentrySpan("add-chat", async () => {
                const newChat: Omit<Chat, "id"> = {
                    lastMessage: message,
                    members: [userProfile?.id, friend_id],
                    updatedAt: Timestamp.now(),
                    createdBy: userProfile?.id,
                    createdAt: Timestamp.now(),
                    type: "private"
                }
                const docRef = await addDoc(chatsCollection, newChat)
                const messagesCollection = collection(firestore, `chats/${docRef.id}/messages`)
                                
                const newMessage: Omit<Message, "id"> = {
                    content: message,
                    senderId: userProfile?.id,
                    createdAt: Timestamp.now(),
                    media
                }
                await addDoc(messagesCollection, newMessage)
                return docRef.id
            })
            
            return res
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [ReactQueryKeys.CHATS],
            })    
        }
    })

    const refreshChats = () => {
        queryClient.invalidateQueries({
            queryKey: [ReactQueryKeys.CHATS],
        })
    }

    return { isLoading, data, refreshChats, addChatMutation }



}

export default useChats

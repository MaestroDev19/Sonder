import { addDoc, collection, doc, getDocs, query, setDoc, Timestamp, where } from "firebase/firestore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Chat, Media, Message, ReactQueryKeys } from "../types/types";
import { createSentrySpan } from "../sentry/spans";
import { firestore } from "../lib/firebase"
import useCurrentUser from "./current-user";

interface NewChatData { 
    media: Media[], 
    friend_id: string, 
    message: string, 
    chat_id: string 
}

const useChats = () => {
    const queryClient = useQueryClient();

    const { userProfile } = useCurrentUser();


    const { isLoading, data } = useQuery({
        queryKey: [ReactQueryKeys.CHATS],
        queryFn: async () => {
            const res = await createSentrySpan("chats", async () => {
                const chatsCollection = collection(firestore, "chats");

                const docsQuery = await getDocs(
                    query(chatsCollection, where("members", "array-contains", userProfile?.id)) 
                )

                if (docsQuery.empty) {
                    return []
                }

                return docsQuery.docs.map((doc) => {
                    return {
                        id: doc.id,
                        ...doc.data()
                    } as Chat
                })
            })

            return res as Chat[]
        },
        enabled: !!userProfile
    })

    const addChatMutation = useMutation({
        mutationFn: async ({ friend_id, message, media, chat_id }: NewChatData) => {
            const res = await createSentrySpan("add-chat", async () => {
                const newChat: Omit<Chat, "id"> = {
                    lastMessage: message,
                    members: [userProfile?.id, friend_id],
                    updatedAt: Timestamp.now(),
                    createdBy: userProfile?.id,
                    createdAt: Timestamp.now(),
                    type: "private"
                }
                const newChatDoc = doc(firestore, "chats", chat_id);

                await setDoc(newChatDoc, newChat)
                const messagesCollection = collection(firestore, `chats/${newChatDoc.id}/messages`)
                                
                const newMessage: Omit<Message, "id"> = {
                    content: message,
                    senderId: userProfile?.id,
                    createdAt: Timestamp.now(),
                    media
                }
                await addDoc(messagesCollection, newMessage)
                return newChatDoc.id
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

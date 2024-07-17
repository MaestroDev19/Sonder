import { addDoc, collection, doc, limit, onSnapshot, orderBy, query, Timestamp, updateDoc } from "firebase/firestore"
import { firestore } from "../lib/firebase"
import { useEffect, useState } from "react";
import { Media, Message } from "../types/types";
import useCurrentUser from "./current-user";
import useChats from "./chats";

const useChatMessages = (chatId: string) => {
    const chatDocReference = doc(firestore, "chats", chatId)
    const messagesCollection = collection(firestore, `chats/${chatId}/messages`);
    const messagesQuery = query(messagesCollection, orderBy("createdAt", "desc"), limit(25))

    const [messages, setMessages] = useState<Message[]>([]);
    const { userProfile } = useCurrentUser();
    const { refreshChats } = useChats();


    useEffect(() => {

        const unsubscribe = onSnapshot(messagesQuery, {
            next: (snapshot) => {
                if(snapshot.empty) {
                    return setMessages([])
                }

                return setMessages(snapshot.docs.map((doc) => {
                    return {
                        id: doc.id,
                        ...doc.data()
                    } as Message

                    
                }).reverse())
            },
        })
        
        
        return () => {
            unsubscribe()
        }
    }, [])

    async function sendNewMessage(content: string, media: Media[]) {
        await Promise.all([
            await addDoc(messagesCollection, {
                content,
                senderId: userProfile?.id,
                createdAt: Timestamp.now(),
                media
            } satisfies Omit<Message, "id">),
            await updateDoc(chatDocReference, {
                lastMessage: content || `${media.length} Media Sent`
            })
        ])

        return refreshChats();
    }

    return {
        messages,
        sendNewMessage
    }


}

export default useChatMessages
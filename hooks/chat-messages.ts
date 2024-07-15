import { addDoc, collection, limit, onSnapshot, orderBy, query, Timestamp } from "firebase/firestore"
import { firestore } from "../lib/firebase"
import { useEffect, useState } from "react";
import { Media, Message } from "../types/types";
import useCurrentUser from "./current-user";

const useChatMessages = (chatId: string) => {
    const messagesCollection = collection(firestore, `chats/${chatId}/messages`);
    const messagesQuery = query(messagesCollection, orderBy("createdAt", "desc"), limit(25))

    const [messages, setMessages] = useState<Message[]>([]);
    const { userProfile } = useCurrentUser();


    useEffect(() => {

        const unsubscribe = onSnapshot(messagesQuery, {
            next: (snapshot) => {
                setMessages(snapshot.docs.map((doc) => {
                    return {
                        id: doc.id,
                        ...doc.data()
                    } as Message
                }))
            },
        })
        
        
        return () => {
            unsubscribe()
        }
    }, [])

    async function sendNewMessage(content: string, media: Media[]) {
        return await addDoc(messagesCollection, {
            content,
            senderId: userProfile?.id,
            createdAt: Timestamp.now(),
            media
        } satisfies Omit<Message, "id">)
    }

    return {
        messages: messages.reverse(),
        sendNewMessage
    }


}

export default useChatMessages
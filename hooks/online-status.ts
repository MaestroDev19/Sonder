import { onValue, ref, set } from "firebase/database";
import { realtimeDb } from "../lib/firebase";
import { useEffect, useState } from "react";
import { OnlineStatus } from "../types/types";


const useOnlineStatus = (userId: string) => {
    const [status, setStatus] = useState<OnlineStatus>(null);

    const databasePath = ref(realtimeDb, 
        "online-status/" + userId
    )

    useEffect(() => {
        const unsubscribe = onValue(databasePath, (snapshot) => {
            const data = snapshot.val();
            setStatus(data)
        })

        return () => {
            unsubscribe();
        }
    }, [])

    
    return { status }
}

const useSetOnlineStatus = () => {
    async function setStatusToOnline(userId: string) {
        const databasePath = ref(realtimeDb, 
            "online-status/" + userId
        )
    
        await set(databasePath, {
            status: "online"
        })
    }
    
    async function setStatusToOffline(userId: string) {
        const databasePath = ref(realtimeDb, 
            "online-status/" + userId
        )    
        await set(databasePath, {
            status: "offline",
            last_seen: new Date().toISOString()
        })
    }

    return {
        setStatusToOnline,
        setStatusToOffline
    }

}

export { useSetOnlineStatus, useOnlineStatus };

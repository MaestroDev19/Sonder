
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useCheckRequestStatus = (currentUser_id, friend_id, isFriend) => {
  const [requestSent, setRequestSent] = useState(false);

  useEffect(() => {
    const checkRequestStatus = async () => {
      if (!isFriend) {
        try {
          const key = `friendRequest-${currentUser_id}-${friend_id}`;
          const value = await AsyncStorage.getItem(key);
          setRequestSent(value !== null);
        } catch (error) {
          console.error('Error retrieving friend request status', error);
        }
      } else {
        // If they are now friends, then the request is not pending anymore
        setRequestSent(false);
      }
    };

    if (currentUser_id && friend_id) {
      checkRequestStatus();
    }
  }, [currentUser_id, friend_id, isFriend]);

  return requestSent;
};

export default useCheckRequestStatus;
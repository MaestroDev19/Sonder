import { formatDistanceToNowStrict, isToday, isYesterday, format } from 'date-fns';
import AsyncStorage from '@react-native-async-storage/async-storage';
export function formatRelativeDate(date: Date): string {
  if (isToday(date)) {
    const distance = formatDistanceToNowStrict(date, { addSuffix: false });
    if (distance.includes('second')) return 'now';
    return distance.replace(' minutes', 'm')
                   .replace(' hours', 'h')
                   .replace(' hour', 'h');
  } else if (isYesterday(date)) {
    return 'Yesterday';
  } else if (date.getFullYear() === new Date().getFullYear()) {
    return format(date, 'MMM d');
  } else {
    return format(date, 'MMM d, yyyy');
  }
}

export function millisecondsToMSFormat(milliseconds: number): string {
    // Calculate minutes and seconds from milliseconds
    const minutes = Math.floor(milliseconds / (1000 * 60)); // Minutes
    const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000); // Seconds
  
    // Format minutes and seconds with leading zeros
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');
  
    // Combine minutes and seconds with colon separator
    return `${formattedMinutes}:${formattedSeconds}`;
}

export function generateRandomId(length: number = 20): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = chars.length;
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export function generateConsistentString(str1: string, str2: string): string {
  // Concatenate the strings
  const [sortedStr1, sortedStr2] = [str1, str2].sort();
  
  // Concatenate the sorted strings
  const combined = sortedStr1 + sortedStr2;
  
  // Convert the combined string to a numeric hash
  let hash = 0;
  for (let i = 0; i < combined?.length; i++) {
    const char = combined.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  
  // Use the hash to seed a simple random number generator
  const seed = Math.abs(hash);
  
  // Generate a string based on the seeded random number generator
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 20; i++) {
    const randomIndex = (seed * (i + 1)) % chars?.length;
    result += chars.charAt(randomIndex);
  }
  
  return result;
}



export async function saveFriendRequestSent(currentUser_id: string, friend_id: string) {
  try {
    const key = `friendRequest-${currentUser_id}-${friend_id}`;
    await AsyncStorage.setItem(key, 'sent');
    console.log('Friend request status saved');
  } catch (error) {
    console.error('Error saving friend request status', error);
  }
}
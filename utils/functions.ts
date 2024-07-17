import { formatDistanceToNowStrict, isToday, isYesterday, format } from 'date-fns';

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
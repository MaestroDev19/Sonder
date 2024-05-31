// import { StyleSheet } from 'react-native'

// export const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#B3B3B31A',
//         padding: 16,
//         borderRadius: 10
//     },
//     row: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         marginBottom: 8,
//     },
//     leftColumn: {
//         flex: 1,
//     },
//     songName: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         color: '#FFFFFF',
//     },
//     artist: {
//         fontSize: 14,
//         color: '#EFEFEF80',
//     },
//     albumArt: {
//         width: 40,
//         height: 40,
//         borderRadius: 8,
//     },
//     timestamp: {
//         fontSize: 14,
//         color: '#EFEFEF80',
//     },
//     device: {
//         fontSize: 14,
//         color: '#FFFFFF',
//     },
//     divider: {
//         height: 0.5,
//         backgroundColor: '#EFEFEF33',
//         marginBottom: 8,
//     },
// });

const container = "bg-[#B3B3B31A] p-4 rounded-lg"
const row = "flex-row items-center justify-between mb-2"
const leftColumn = "flex-1"
const songName = "text-lg font-bold text-white"
const artist = "text-sm text-[#EFEFEF80]"
const albumArt = "w-10 h-10 rounded-lg"
const timestamp = "text-sm text-[#EFEFEF80]"
const device = "text-sm text-white"
const divider = "h-px bg-[#EFEFEF33] mb-2"

export default {container, row, leftColumn, songName, artist, albumArt, timestamp, device, divider}
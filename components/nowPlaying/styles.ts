// import { StyleSheet } from 'react-native'

import { StyleSheet } from "nativewind"

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



const styles = StyleSheet.create({
    container: {
        backgroundColor: "#B3B3B31A",
        padding: 12,
        borderRadius: 10,
        marginVertical: 5,
        borderWidth: 1,
        borderColor: "#EFEFEF33"
    },
    row: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 2
    },
    leftColumn: {
        flex: 1
    },
    divider: {
        marginVertical: 7,
        backgroundColor: "#EFEFEF33",
        height: 1
    },
    text: {
        color: "#EFEFEF80",
    }
})

export default styles

//export default {container, row, leftColumn, songName, artist, albumArt, timestamp, device, divider}
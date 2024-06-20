import { Pressable, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import Page from "../components/page";
import { Image } from "expo-image";
import { dismissAuthSession, openAuthSessionAsync, openBrowserAsync } from "expo-web-browser";
import { useState } from "react";
import WebView from "react-native-webview";
import { useRouter } from "expo-router";

const LoginPage = () => {

    const [loginUrl, setLoginUrl] = useState("");
    const router = useRouter()

    const getLoginUrl = async () => {
        router.push('/home')
        /*
        const res = await fetch("https://sonder-api.vercel.app/login");
        const { data } = await res.json();
        //const result = await openBrowserAsync(data.url)
        //console.log(result)
        setLoginUrl(data.url)
        */
        
    }

    const getAccessToken = (url: string) => {
        if(!url.includes('sonder-api')) return

        //Authenticate
    }
    return (
        <Page className="flex flex-col items-center justify-evenly px-3">
            <View className="flex flex-col items-center gap-3">
                <Image 
                    source={require('../assets/svg/logo.svg')} 
                    style={{ width: 210, height: 280 }}
                />
                <Text className="text-white text-4xl font-bold">
                    Welcome To <Text className="text-primary">Sonder</Text>
                </Text>

                <Text className="text-white font-bold text-xl">
                    Let's find your musical <Text className="text-primary">match</Text>!
                </Text>
            </View>

            <Pressable className="bg-primary h-14 w-full rounded-xl flex flex-row items-center justify-center gap-2" onPress={getLoginUrl}>
                <Text className="font-semibold text-xl">Login with</Text>
                <Image source={require('../assets/svg/spotify.svg')} style={{ width: 101, height: 30 }}/>
            </Pressable>

            {
                !loginUrl ? null :
                <View className="absolute w-screen h-screen top-0" style={{ flex: 1 }}>
                    <WebView
                        source={{ uri: loginUrl }}
                        onNavigationStateChange={({ url }) => getAccessToken(url)}
                        
                    />
                </View>
            }

        </Page>
    )
}

export default LoginPage;

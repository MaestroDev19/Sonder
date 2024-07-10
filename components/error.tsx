import { Text } from "react-native";
import Page from "./page";
import { Link } from "expo-router";

export default function ErrorPage() {
    return (
        <Page>
            <Text className="text-white text-2xl">An error occured</Text>
            <Link className="bg-primary p-4" href="/home">
                <Text className="text-white text-xl mx-auto">Go To Home</Text>
            </Link>
        </Page>
    )
}
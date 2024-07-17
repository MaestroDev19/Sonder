import { Dimensions, ScrollView, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { cn } from "../lib/utils"

interface PageProps {
    children?: React.ReactNode,
    className?: string
}

const { width, height } = Dimensions.get('window')

const Page = ({ children, className }: PageProps) => {

    return (
        <SafeAreaView>
            <View style={{ width, height }}  className={cn("text-white", className)}>
                { children }
            </View>
        </SafeAreaView>
    )
}

export default Page;
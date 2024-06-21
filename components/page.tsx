import { View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { cn } from "../../lib/utils"

interface PageProps {
    children?: React.ReactNode,
    className?: string
}

const Page = ({ children, className }: PageProps) => {
    return (
        <SafeAreaView>
            <View className={cn("w-screen h-screen text-white", className)}>
                { children }
            </View>
        </SafeAreaView>
    )
}

export default Page;
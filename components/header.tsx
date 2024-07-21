import { View } from "react-native"
import { cn } from "../lib/utils";

const Header = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return (
        <View className={cn('mt-9 flex items-center flex-row w-screen px-3 py-2', className)}>{children}</View>
    )
}

export default Header;
import { Control, useController } from "react-hook-form"
import { Text, TextInput, View } from "react-native"
import { cn } from "../lib/utils"
import { moderateScale } from "react-native-size-matters"

interface InputProps {
    label: string,
    multiline?: boolean,
    control: Control<any>,
    name: string,
    className?: string
}

const Input = ({ control, name, label, multiline, className }: InputProps) => {
    const { field } = useController({
        control, 
        defaultValue: '',
        name
    })
    return (
        <View className={cn("border px-3 py-1 border-[#EFEFEF33] bg-[#B3B3B31A] rounded-lg w-full", className)}>
            <Text style={{ fontSize: moderateScale(12) }} className="font-semibold text-white">{label}</Text>
            <TextInput
                value={field.value}
                onChangeText={field.onChange}
                multiline={multiline}
                numberOfLines={4}
                className="my-1.5 text-white h-max"
            />
        </View>
    )
}

export default Input
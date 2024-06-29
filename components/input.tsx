import { Control, useController } from "react-hook-form"
import { Text, TextInput, View } from "react-native"
import { cn } from "../lib/utils"

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
        <View className={cn("border border-light-grey rounded-lg w-full", className)}>
            <Text className="text-xl font-semibold text-white">{label}</Text>
            <TextInput
                value={field.value}
                onChangeText={field.onChange}
                multiline={multiline}
            />
        </View>
    )
}

export default Input
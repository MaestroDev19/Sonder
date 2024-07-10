import { useForm } from "react-hook-form";
import Page from "../../../components/page";
import useCurrentUser from "../../../hooks/current-user";
import { Pressable, Text, View } from "react-native";
import { Image } from "expo-image";
import Avatar from "../../../components/avatar";
import Input from "../../../components/input";
import { ArrowLeft } from "lucide-react-native";

export default function EditProfilePage() {

    const { userProfile } = useCurrentUser();

    const { control, handleSubmit, formState } = useForm({
        defaultValues: {
            banner: "",
            image: "",
            name: "",
            email: "",
            bio: ""
        }
    })

    const onSubmit = (data) => {
        //If bio was changed
        if (formState.touchedFields.banner) {

        }
        if (formState.touchedFields.image) {

        }

    }

    return (
        <Page>
            <View className="flex items-center flex-row gap-3">
                <Pressable>
                    <ArrowLeft stroke="#fff"/>
                </Pressable>

                <Text className="text-3xl font-semibold text-white">Edit Profile</Text>
            </View>
            <Pressable className="w-screen h-60 bg-primary">
                { 
                    userProfile?.banner && 
                    <Image 
                        source={{ uri: userProfile.banner }}
                        style={{ width: "100%", height: "100%" }}
                    /> 
                }
            </Pressable>

            <Avatar
                src={userProfile?.profile_image}
                initials={userProfile?.name.at(0) || "S"}
                width={70}
                height={70}
            />

            <Input
                name="name"
                label="Name"
                control={control}
            />
            
            <Input
                name="email"
                label="Email"
                control={control}
            />
            
            <Input
                name="bio"
                label="Bio"
                control={control}
                multiline
                className="h-32"
            />


            <Pressable className="bg-primary rounded-lg">
                <Text className="font-semibold">Save</Text>
            </Pressable>
            
        </Page>
    )


}
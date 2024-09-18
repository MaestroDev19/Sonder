import { useForm } from "react-hook-form";
import Page from "../../../components/page";
import useCurrentUser from "../../../hooks/current-user";
import { KeyboardAvoidingView, Pressable, Text, View } from "react-native";
import { Image } from "expo-image";
import Avatar from "../../../components/avatar";
import Input from "../../../components/input";
import { ArrowLeft, ImagePlus } from "lucide-react-native";
import { Link, useRouter } from "expo-router";
import { Drawer } from "expo-router/drawer";
import Header from "../../../components/header";
import {
  requestMediaLibraryPermissionsAsync,
  launchImageLibraryAsync,
  MediaLibraryPermissionResponse,
  MediaTypeOptions,
} from "expo-image-picker";
import { useState } from "react";
import CustomBackButton from "../../../components/CustomBackButton";

export default function EditProfilePage() {
  const {
    userProfile,
    updateAvatar,
    updateBanner,
    updateUser,
    savePending,
    updateUserReset,
  } = useCurrentUser();
  const [currentBanner, setCurrentBanner] = useState<string>(
    userProfile?.banner || ""
  );
  const [currentProfilePic, setCurrentProfilePic] = useState<string>(
    userProfile?.profile_image || ""
  );

  const router = useRouter();

  const { control, handleSubmit, formState, setValue, getValues, reset } =
    useForm({
      defaultValues: {
        banner: "",
        image: "",
        name: userProfile?.name || "",
        email: userProfile?.email || "",
        bio: userProfile?.bio || "",
      },
    });

  const onSubmit = (data?: any) => {
    const { banner, image, name, bio, email } = getValues();
    const formKeys = Object.keys(formState.dirtyFields);

    if (!!banner) {
      updateBanner(banner);
    }

    if (!!image) {
      updateAvatar(image);
    }

    if (formKeys.length === 0) {
      return;
    }

    const updatedFields = Object.fromEntries(
      formKeys.map((key) => {
        return [key, getValues(key as any)];
      })
    );
    updateUserReset();
    //console.log(updatedFields)
    return updateUser({ name, email, bio });
  };

  const goBack = () => {
    router.back();
    setCurrentBanner(userProfile?.banner || "");
    setCurrentProfilePic(userProfile?.profile_image || "");
    reset();
  };

  const changeBanner = async () => {
    const status = await requestMediaLibraryPermissionsAsync();

    if (!status.granted) return null;
    const photo = await launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [3, 1],
      selectionLimit: 1,
      mediaTypes: MediaTypeOptions.Images,
    });
    setCurrentBanner(photo.assets![0].uri);
    return setValue("banner", photo!.assets![0].uri);
  };

  const changeAvatar = async () => {
    const status = await requestMediaLibraryPermissionsAsync();

    if (!status.granted) return null;
    const photo = await launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      selectionLimit: 1,
      mediaTypes: MediaTypeOptions.Images,
    });
    setCurrentProfilePic(photo.assets![0].uri);
    return setValue("image", photo.assets![0].uri);
  };

  return (
    <Page>
      <Drawer.Screen options={{ header: () => null }} />
      <KeyboardAvoidingView behavior="position">
        <Header className="flex items-center my-2 flex-row gap-4">
          <CustomBackButton />

          <Text className="text-2xl font-semibold text-white">
            Edit Profile
          </Text>
        </Header>

        <Pressable
          onPress={changeBanner}
          className="w-screen h-60 relative flex flex-row items-center justify-center"
        >
          <ImagePlus stroke="white" />
          {userProfile?.banner && (
            <Image
              source={{ uri: currentBanner }}
              style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                zIndex: -20,
                opacity: 0.45,
              }}
            />
          )}
        </Pressable>

        <View className="px-4 flex flex-col gap-4 -mt-10 z-20">
          <Avatar
            src={currentProfilePic}
            initials={userProfile?.name.at(0) || "S"}
            width={70}
            height={70}
            containerStyle="opactity-50"
            editMode
            onPress={changeAvatar}
          />

          <Input name="name" label="Name" control={control} className="mt-10" />

          <Input name="email" label="Email" control={control} />

          <Input
            name="bio"
            label="Bio"
            control={control}
            multiline
            className="h-32"
          />

          <Pressable
            //disabled={!formState.isDirty || (!currentBanner || !currentProfilePic)}
            onPress={handleSubmit(onSubmit)}
            disabled={savePending}
            className="bg-primary rounded-lg w-1/4 py-2 disabled:bg-primary/50"
          >
            <Text className="font-semibold text-xl text-center">Save</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </Page>
  );
}

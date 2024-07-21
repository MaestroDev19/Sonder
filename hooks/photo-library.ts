import { launchImageLibraryAsync, MediaTypeOptions, requestMediaLibraryPermissionsAsync } from "expo-image-picker"

const usePhotoLibrary = () => {

    async function getPhotos(maxPhotos: number = 1) {
        const permission = await requestMediaLibraryPermissionsAsync();
        if(!permission.granted) return

        const photos = await launchImageLibraryAsync({
            mediaTypes: MediaTypeOptions.Images, //Will support all media types later on
            selectionLimit: maxPhotos,
            allowsMultipleSelection: true
        
        })

        return photos.assets || []
    }

    return { getPhotos }
}

export default usePhotoLibrary
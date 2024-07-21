import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { storage } from "../lib/firebase"
import { StorageFolder } from "../types/types";

class ImageUpload {
    bannersRef = ref(storage, "banners");
    avatarsRef = ref(storage, "avatars");
    imagesRef = ref(storage, "images");


    public async uploadImage(folderName: StorageFolder, fileName: string, data: any) {
        const reference = ref(storage, `${folderName}/${fileName}`)

        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
              resolve(xhr.response);
            };
            xhr.onerror = function (e) {
              reject(new TypeError("Network request failed"));
            };
            xhr.responseType = "blob";
            xhr.open("GET", data, true);
            xhr.send(null);
        });

        await uploadBytes(reference, blob as any)
        const imageUrl = await getDownloadURL(reference);
        return imageUrl
    }
}

export const ImageUploadService = new ImageUpload()

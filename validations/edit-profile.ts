import { z } from "zod";

const editProfileValidation = z.object({
    name: z.string().min(1, {
        message: "Name cannot be empty"
    }),
    email: z.string().email({
        message: "Invalid email address",
    }).min(5),
    bio: z.string().min(1, {
        message: "Bio must be at least 1 character",
    }).max(256, {
        message: "Bio must be less than 256 characters",
    }),
})

export default editProfileValidation
import axios from "axios";

const SonderApi = axios.create({
    baseURL: "https://sonder-api.vercel.app",
})

export default SonderApi
import axios, { type AxiosRequestHeaders } from "axios"
import { useAuthStore } from "@/store/auth"

export const api = axios.create({
    baseURL: "/api",
})

api.interceptors.request.use((config) => {
    const token = useAuthStore.getState().token
    if (token) {
        config.headers = { ...(config.headers || {}), Authorization: `Bearer ${token}` } as AxiosRequestHeaders
    }
    return config
})

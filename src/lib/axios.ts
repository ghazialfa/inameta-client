import axios, { type AxiosRequestHeaders } from "axios"
import { useAuthStore } from "@/store/auth"

const envBase = process.env.NEXT_PUBLIC_API_BASE_URL

export const api = axios.create({
    baseURL: envBase,
})

api.interceptors.request.use((config) => {
    const token = useAuthStore.getState().token
    if (token) {
        config.headers = { ...(config.headers || {}), Authorization: `Bearer ${token}` } as AxiosRequestHeaders
    }
    return config
})

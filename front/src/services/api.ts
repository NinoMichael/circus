import axios from "axios"
import { getCurrentLanguage } from "../context/LanguageContext"

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/api",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
})

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token")

        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }

        const lang = getCurrentLanguage()
        if (lang) {
            config.headers["Accept-Language"] = lang.toLowerCase()
        }

        return config
    },
    (error) => Promise.reject(error)
)

export default api

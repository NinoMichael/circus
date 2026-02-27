import axios from "axios"
import { getCookie } from "../lib/helpers"

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080/api",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
    withCredentials: true,
})


export const apiFormData = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080/api",
    headers: {
        "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
})

/* Manage API access if token exists & user is logged */
api.interceptors.request.use(
    (config) => {
        const token = getCookie("token")

        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config
    },
    (error) => Promise.reject(error)
)

/* Manage API access if cookie is missing */
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            window.location.href = `/auth/login`
        }
        return Promise.reject(error)
    }
)

/* Manage API access if token exists & user is logged */
apiFormData.interceptors.request.use(
    (config) => {
        const token = getCookie("token")

        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config
    },
    (error) => Promise.reject(error)
)

/* Manage API access if cookie is missing */
apiFormData.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            window.location.href = `/auth/login`
        }
        return Promise.reject(error)
    }
)

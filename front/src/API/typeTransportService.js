import axios from 'axios'

const API_URL_TYPE_TRANSPORT = 'http://localhost:8000/api/cooperative/typeTransport/'

export const getTypeTransports = async () => {
    try {
        const response = await axios.get(API_URL_TYPE_TRANSPORT, { mode: "cors" })
        return response.data
    } catch (error) {
        console.error("Erreur de récupération de type bus:", error)
        throw error
    }
}

export const createTypeTransport = async (typeTransportData) => {
    try {
        const response = await axios.post(API_URL_TYPE_TRANSPORT, typeTransportData)
        return response.data
    } catch (error) {
        console.error("Error d'ajout de type bus:", error)
        throw error
    }
}
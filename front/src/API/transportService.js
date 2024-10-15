import axios from 'axios'

const API_URL_TRANSPORT = 'http://localhost:8000/api/cooperative/transport/'

export const getTransports = async () => {
    try {
        const response = await axios.get(API_URL_TRANSPORT)
        return response.data
    } catch (error) {
        console.error("Erreur de récupération de bus:", error)
        throw error
    }
}

export const createTransport = async (transportData) => {
    try {
        const response = await axios.post(API_URL_TRANSPORT, transportData)
        return response.data
    } catch (error) {
        console.error("Error d'ajout de bus:", error)
        throw error
    }
}
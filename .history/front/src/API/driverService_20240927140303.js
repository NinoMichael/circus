import axios from 'axios'

const API_URL_CHAUFFEUR = 'http://localhost:8000/api/chauffeur/'

export const getChauffeurs = async () => {
    try {
        const response = await axios.get(API_URL_CHAUFFEUR, { mode: "cors" })
        return response.data
    } catch (error) {
        console.error("Erreur de récupération de chauffeur:", error)
        throw error
    }
}

export const createChauffeur = async (chauffeurData) => {
    try {
        const response = await axios.post(API_URL_CHAUFFEUR, chauffeurData)
        return response.data
    } catch (error) {
        console.error("Error d'ajout de chauffeur:", error)
        throw error
    }
}
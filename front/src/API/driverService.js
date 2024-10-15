import axios from 'axios'

const API_URL_CHAUFFEUR = 'http://localhost:8000/api/cooperative/chauffeur/'

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

export const deleteChauffeur = async (id) => {
    try {
        const response = await axios.delete(`${API_URL_CHAUFFEUR}${id}/`)
        return response.data
    } catch (error) {
        console.error("Erreur de suppression de chauffeur:", error)
        throw error
    }
}



export const updateDisponibiliteChauffeur = async (driverId, disponibiliteData) => {
    try {
        const response = await axios.patch(`${API_URL_CHAUFFEUR}${driverId}/`, disponibiliteData);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la mise à jour de la disponibilité du chauffeur:", error.response?.data || error.message);
        throw error;
    }
};



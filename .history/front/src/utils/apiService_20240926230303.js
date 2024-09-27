import axios from 'axios';

const API_URL_CHAUFFEUR = 'http://localhost:8000/api/chauffeur/';

const getChauffeurs = async () => {
    try {
        const response = await axios.get(API_URL_CHAUFFEUR);
        return response.data;
    } catch (error) {
        console.error("Error fetching chauffeurs:", error);
        throw error;
    }
}

export default getChauffeurs

const createChauffeur = async (chauffeurData) => {
    try {
        const response = await axios.post(API_URL_CHAUFFEUR, chauffeurData);
        return response.data;
    } catch (error) {
        console.error("Error creating chauffeur:", error);
        throw error;
    }
};

export default createChauffeur
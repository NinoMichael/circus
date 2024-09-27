import axios from 'axios';

const API_URL = 'http://localhost:8000/api/chauffeur/';

export const getChauffeurs = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching chauffeurs:", error);
        throw error;
    }
};

export const createChauffeur = async (chauffeurData) => {
    try {
        const response = await axios.post(API_URL, chauffeurData);
        return response.data;
    } catch (error) {
        console.error("Error creating chauffeur:", error);
        throw error;
    }
};
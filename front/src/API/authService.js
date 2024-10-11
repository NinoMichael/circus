// authService.js
import axios from 'axios'

const API_URL = 'http://localhost:8000/api/account/login/'

const login = async (email, password) => {
    try {
        const response = await axios.post(API_URL, {
            email: email,
            mdp: password
        })

        localStorage.setItem('access_token', response.data.tokens.access);
        localStorage.setItem('refresh_token', response.data.tokens.refresh)

        return response.data.tokens
    } catch (error) {
        throw error
    }
};

export default login
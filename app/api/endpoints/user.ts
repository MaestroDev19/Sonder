import axios from 'axios';
import { BASE_URL } from '../../constants/baseUrl';

export const getUser = (id: string): Promise<any> => {
    return axios.get(`${BASE_URL}/users/${id}`)
        .then(response => response.data)
        .catch(error => {
            throw new Error(error.response.data.message);
        });
};

export const getTopItems = (id: string, type: string): Promise<any> => {
    return axios.get(`${BASE_URL}/users/${id}/top/${type}`)
        .then(response => response.data)
        .catch(error => {
            throw new Error(error.response.data.message);
        });
};

export const createTopItems = (type: string, access_token: string, user_id: string): Promise<any> => {
    return axios.post(`${BASE_URL}/users/me/top/${type}`, { access_token, user_id })
        .then(response => response.data)
        .catch(error => {
            throw new Error(error.response.data.message);
        });
};

export const getCurrentlyPlaying = async (country, accessToken) => {
    try {
        const response = await axios.get(`${BASE_URL}/users/me/playing`, {
            params: { country },
            headers: { Authorization: `Bearer ${accessToken}` }
        });
        return response.data;
    } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
            console.error('API Error:', error.response.data.message);
            throw new Error(error.response.data.message);
        } else {
            console.error('Unknown Error:', error);
            throw new Error('An error occurred while fetching currently playing data.');
        }
    }
};

export const getSimilarUsers = (): Promise<any> => {
    return axios.get(`${BASE_URL}/users`)
        .then(response => response.data)
        .catch(error => {
            throw new Error(error.response.data.message);
        });
};
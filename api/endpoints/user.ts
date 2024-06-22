import SonderApi from '../index';

export const getUser = async (id: string): Promise<any> => {
    try {
        const response = await SonderApi.get(`/users/${id}`);
        if (!response.data.data) console.error(response.data.message)
        return response.data.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};

export const getTopItems = async (id: string, type: string): Promise<any> => {
    try {
        const response = await SonderApi.get(`/users/${id}/top/${type}`);
        if (!response.data.data) console.error(response.data.message);
        return response.data.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};

export const createTopItems = async (type: string, access_token: string, user_id: string): Promise<any> => {
    try {
        const response = await SonderApi.post(`/users/me/top/${type}`, { access_token, user_id });
        if (!response.data.data) console.error(response.data.message)
        return response.data.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};

export const getCurrentlyPlaying = async (country: string, accessToken: string): Promise<any> => {
    try {
        const response = await SonderApi.get(`/users/me/playing`, {
            params: { country },
            headers: { Authorization: `Bearer ${accessToken}` }
        });
        if (!response.data.data) console.error(response.data.message)
        console.log("hello")
        console.log(response.data.data)
        return response.data.data;
    } catch (error) {
        console.error('API Error:', error.response.data.message);
        throw new Error(error.response.data.message);
    }
};

export const getSimilarUsers = async (): Promise<any> => {
    try {
        const response = await SonderApi.get(`/users`);
        if (!response.data.data) console.error(response.data.message)
        return response.data.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};


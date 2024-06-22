import SonderApi from '../index'
import axios from 'axios';

export const welcome = async (): Promise<any> => {
    try {
        const response = await SonderApi.get('/');
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch welcome message');
    }
};

export const login = async (): Promise<string> => {
    try {
        const response = await SonderApi.get('/login');
        if (!response.data.data) console.error(response.data.message);
        return response.data.data;
    } catch (error) {
        throw new Error('Failed to fetch login URL');
    }
};

export const token = async (code: string): Promise<any> => {
    try {
        const response = await SonderApi.get(`/token?code=${code}`);
        if (!response.data.data) console.error(response.data.message);
        return response.data.data;
    } catch (error) {
        throw new Error('Failed to fetch token');
    }
};

export const renewToken = async (refreshToken: string): Promise<any> => {
    try {
        const response = await SonderApi.post('/renew-token', { refresh_token: refreshToken });
        if (!response.data.data) console.error(response.data.message);
        return response.data.data;
    } catch (error) {
        throw new Error('Failed to renew token');
    }
};

export const me = async (accessToken: string): Promise<any> => {
    try {
        const response = await SonderApi.get('/me', { headers: { Authorization: `Bearer ${accessToken}` } });
        if (!response.data.data) console.error(response.data.message);
        return response.data.data;
    } catch (error) {
        throw new Error('Failed to fetch user profile');
    }
};

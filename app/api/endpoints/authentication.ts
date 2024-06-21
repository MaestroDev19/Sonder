import axios from 'axios';
import {BASE_URL} from '../../constants/baseUrl';

export async function welcome(): Promise<string> {
    try {
        const response = await axios.get(`${BASE_URL}/`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch welcome message');
    }
}

export async function login(): Promise<string> {
    try {
        const response = await axios.get(`${BASE_URL}/login`);
        return response.data.url;
    } catch (error) {
        throw new Error('Failed to fetch login URL');
    }
}

export async function token(code: string): Promise<any> {
    try {
        const response = await axios.get(`${BASE_URL}/token?code=${code}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch token');
    }
}

export async function renewToken(refreshToken: string): Promise<any> {
    try {
        const response = await axios.post(`${BASE_URL}/renew-token`, { refresh_token: refreshToken });
        return response.data;
    } catch (error) {
        throw new Error('Failed to renew token');
    }
}

export async function me(accessToken: string): Promise<any> {
    try {
        const response = await axios.get(`${BASE_URL}/me`, { headers: { Authorization: `Bearer ${accessToken}` } });
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch user profile');
    }
}
import axios, { AxiosInstance } from 'axios';

import encodeParams from '../utils/encodeParams';
import { getAccessToken, getOrgToken } from '../utils/getToken';
import { BASE_URL } from '../constants/constant';

export const api: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 0,
    withCredentials: false,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const apiUpload: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 60000,
    headers: {
        'Content-Type': 'multipart/form-data',
    },
});
export const apiGetToken: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 0,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
});

[api, apiUpload, apiGetToken].forEach((i) =>
    i.interceptors.request.use(
        (config: any) => {
            const token = getAccessToken();
            const orgToken = getOrgToken();
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
                if (orgToken) {
                    config.headers['org-token'] = orgToken;
                }
            }
            return config;
        },
        (error: any) => Promise.reject(error)
    )
);

import axios, { AxiosInstance } from 'axios';

import encodeParams from '../utils/encodeParams';
import { BASE_URL } from '../utils/constants';
import getAccessToken from '../utils/getAccessToken';

export const api: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 0,
    headers: {
        'Content-Type': 'application/json',
    },
    paramsSerializer: {
        encode: (params) => encodeParams(params),
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
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error: any) => Promise.reject(error)
    )
);

import { LOCAL_STORAGE } from '../constants/constant';

export const getAccessToken = () => {
    try {
        return localStorage.getItem(LOCAL_STORAGE.ACCESS_TOKEN);
    } catch (err) {
        return null;
    }
};

export const getOrgToken = () => {
    try {
        return localStorage.getItem(LOCAL_STORAGE.ORG_TOKEN);
    } catch (err) {
        return null;
    }
};

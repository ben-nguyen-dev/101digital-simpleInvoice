import { LOCAL_STORAGE } from '../constants/constant';

const getAccessToken = () => {
    try {
        return localStorage.getItem(LOCAL_STORAGE.ACCESS_TOKEN);
    } catch (err) {
        return null;
    }
};

export default getAccessToken;

import { ACCESS_TOKEN } from './constants';

const getAccessToken = () => {
    try {
        return localStorage.getItem(ACCESS_TOKEN);
    } catch (err) {
        return null;
    }
};

export default getAccessToken;

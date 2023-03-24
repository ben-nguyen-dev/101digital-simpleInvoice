import { api, apiGetToken } from '../api';
import qs from 'qs';
import { IUserDataLogin } from '../../interfaces/Login/ILogin';

const clientID = process.env.REACT_APP_CLIENT_ID;
const clientSecret = process.env.REACT_APP_CLIENT_SECRET;

class UserService {
    login = async (data: IUserDataLogin) => {
        const payload = {
            client_id: clientID,
            client_secret: clientSecret,
            grant_type: 'password',
            scope: 'openid',
            username: data.userName,
            password: data.password,
        };
        return await apiGetToken.post(`/token`, qs.stringify(payload));
    };

    getUserProfile = async () => {
        return await api.get(`/membership-service/1.2.0/users/me`);
    };
}

const userService = new UserService();
export default userService;

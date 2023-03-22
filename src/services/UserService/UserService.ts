import { apiGetToken } from '../api';
import qs from 'qs';
import { IUserDataLogin } from '../../pages/Login/model/ILogin';

const ACCOUNT_URL = '/token';
const clientID = process.env.REACT_APP_CLIENT_ID;
const clientSecret = process.env.REACT_APP_CLIENT_SECRET;

class UserService {
    login = (data: IUserDataLogin) => {
        const payload = {
            client_id: clientID,
            client_secret: clientSecret,
            grant_type: 'password',
            scope: 'openid',
            username: data.userName,
            password: data.password,
        };
        return apiGetToken.post(`${ACCOUNT_URL}`, qs.stringify(payload));
    };
}

const userService = new UserService();
export default userService;

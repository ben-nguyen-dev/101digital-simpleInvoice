import React, { FC, useState } from 'react';
import Button from '../../components/Buttons/Button';
import FormTextField from '../../components/FormTextField/FormTextField';
import { IUserDataLogin } from './model/ILogin';
import _ from 'lodash';
import { useNavigate } from 'react-router-dom';
import userService from '../../services/UserService/UserService';
import { APP_ROUTER, LOCAL_STORAGE } from '../../constants/constant';

const initUserData: IUserDataLogin = {
    userName: '',
    password: '',
};

enum TYPE_FIELD {
    USER_NAME = 'userName',
    PASSWORD = 'password',
}

export interface ILoginProps {}

const Login: FC<ILoginProps> = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState<IUserDataLogin>(initUserData);

    const handleChange = (field: TYPE_FIELD, value: any) => {
        const _userData = _.cloneDeep(userData);
        _userData[field] = value;
        setUserData(_userData);
    };

    const onLogin = async (e: any) => {
        e.preventDefault();
        try {
            const res = await userService.login(userData);
            const { access_token, refresh_token, token_type } = res.data;

            localStorage.setItem(LOCAL_STORAGE.ACCESS_TOKEN, access_token);
            localStorage.setItem(LOCAL_STORAGE.REFRESH_TOKEN, refresh_token);
            localStorage.setItem(LOCAL_STORAGE.TOKEN_TYPE, token_type);
            navigate(APP_ROUTER.INVOICE.INDEX);
        } catch (e) {
            console.log(e);
        }
    };
    return (
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-purple-700 underline">Sign in</h1>
                <form className="mt-6">
                    <div className="mb-2">
                        <FormTextField
                            type={'email'}
                            required={true}
                            label={'Email'}
                            onChange={(e: any) => {
                                handleChange(TYPE_FIELD.USER_NAME, e?.target?.value || '');
                            }}
                            value={userData.userName || ''}
                        />
                    </div>
                    <div className="mb-2">
                        <FormTextField
                            type={'password'}
                            required={true}
                            label={'Password'}
                            onChange={(e: any) => {
                                handleChange(TYPE_FIELD.PASSWORD, e?.target?.value || '');
                            }}
                            value={userData.password || ''}
                        />
                    </div>
                    <a href="#" className="text-xs text-purple-600 hover:underline">
                        Forget Password?
                    </a>
                    <div className="mt-6">
                        <Button onClick={onLogin}>Login</Button>
                    </div>
                </form>

                <p className="mt-8 text-xs font-light text-center text-gray-700">
                    {' '}
                    Don't have an account? <a className="font-medium text-purple-600 hover:underline">Sign up</a>
                </p>
            </div>
        </div>
    );
};
export default Login;

import React, { FC, ReactNode, useEffect, useState } from 'react';
import { getAccessToken } from '../../utils/getToken';
import { Outlet, useNavigate } from 'react-router-dom';
import { APP_ROUTER, LOCAL_STORAGE } from '../../constants/constant';
import userService from '../../services/UserService/UserService';
import Progress from '../../components/Loadings/Progress';
import { Box } from '@mui/material';

interface AuthLayoutProps {
    children?: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        checkAuthentication();
    }, []);
    const checkAuthentication = async () => {
        const token = getAccessToken();
        if (!token) {
            navigate(APP_ROUTER.LOGIN);
            return;
        }

        const orgToken = localStorage.getItem(LOCAL_STORAGE.ORG_TOKEN);
        if (orgToken) return;

        try {
            setLoading(true);
            const res = await userService.getUserProfile();
            if (!res?.data) return;
            const org_token = res?.data?.data?.memberships[0]?.token;

            localStorage.setItem(LOCAL_STORAGE.ORG_TOKEN, org_token);
        } catch (err) {
            localStorage.removeItem(LOCAL_STORAGE.ACCESS_TOKEN);
            localStorage.removeItem(LOCAL_STORAGE.REFRESH_TOKEN);
            navigate(APP_ROUTER.LOGIN);
        } finally {
            setLoading(false);
        }
    };
    return (
        <Box height={'100vh'} display={'flex'} flexDirection={'column'}>
            {loading ? <Progress /> : children || <Outlet />}
        </Box>
    );
};

export default AuthLayout;

import { redirect } from 'react-router-dom';
import { APP_ROUTER, LOCAL_STORAGE, TOAST_MESSAGE_TYPE } from '../constants/constant';
import { ToastMessage } from '../components/ToastMessage/ToastMessage';
import { NavigateRef } from '../hooks/useNavigateRef';

export const handleError = (error: any) => {
    if (error?.response?.status === 401) {
        localStorage.removeItem(LOCAL_STORAGE.ORG_TOKEN);
        localStorage.removeItem(LOCAL_STORAGE.ACCESS_TOKEN);
        localStorage.removeItem(LOCAL_STORAGE.REFRESH_TOKEN);
        localStorage.removeItem(LOCAL_STORAGE.TOKEN_TYPE);
        (NavigateRef.current as any)?.push(APP_ROUTER.LOGIN);
    } else {
        ToastMessage(TOAST_MESSAGE_TYPE.ERROR, error?.message);
    }
};

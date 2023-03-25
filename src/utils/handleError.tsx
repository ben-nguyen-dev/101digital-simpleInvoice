import { useNavigate } from 'react-router-dom';
import { APP_ROUTER } from '../constants/constant';
import { Alert, Snackbar } from '@mui/material';
import { redirect } from 'react-router-dom';

export const handleError = (error: any) => {
    if (error?.response?.status === 401) {
        console.log('a 💩', { error }, '');
        return redirect(APP_ROUTER.LOGIN);
    } else {
        return (
            <Snackbar open={true} autoHideDuration={6000}>
                <Alert severity="error" sx={{ width: '100%' }}>
                    {error?.message}
                </Alert>
            </Snackbar>
        );
    }
};

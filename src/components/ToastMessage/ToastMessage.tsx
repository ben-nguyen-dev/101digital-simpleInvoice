import React, { createRef, useImperativeHandle, useState } from 'react';
import { Alert, Snackbar } from '@mui/material';
import { TOAST_MESSAGE_TYPE } from '../../constants/constant';

const screenRef: any = createRef();

export const ToastMessage = (type: TOAST_MESSAGE_TYPE, message: string, duration?: number) => {
    screenRef.current?.show?.();
    screenRef.current?.setMessage?.(message);
    screenRef.current?.setType?.(type);
    screenRef.current?.setDuration?.(duration);
};

const ToastMessageView = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [type, setType] = useState<TOAST_MESSAGE_TYPE>(TOAST_MESSAGE_TYPE.SUCCESS);
    const [message, setMessage] = useState<string>('');

    useImperativeHandle(screenRef, () => ({
        show: () => {
            setOpen(true);
        },
        setType: (type: TOAST_MESSAGE_TYPE) => {
            setType(type);
        },
        setMessage: (message: string) => {
            setMessage(message);
        },
        hide: () => {
            setOpen(false);
            setMessage('');
        },
    }));

    const onClose = () => {
        setOpen(false);
        setMessage('');
    };

    return (
        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={open}
            onClose={onClose}
            autoHideDuration={3000}
        >
            <Alert onClose={() => screenRef?.current?.hide?.()} severity={type} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    );
};
export default ToastMessageView;

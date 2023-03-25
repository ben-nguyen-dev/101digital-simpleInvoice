import { createRef, forwardRef, useImperativeHandle } from 'react';
import { useNavigate } from 'react-router-dom';

const Navigate = forwardRef((props, ref) => {
    let navigate = useNavigate();
    useImperativeHandle(ref, () => ({
        push: (url: any) => {
            navigate(url);
        },
    }));

    return null;
});

const NavigateRef = createRef();

export { Navigate, NavigateRef };

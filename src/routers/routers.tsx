import BaseLayout from '../layouts/BaseLayout/BaseLayout';
import { lazy, Suspense } from 'react';
import Progress from '../components/Loadings/Progress';
import AuthLayout from '../layouts/AuthLayout/AuthLayout';
import { APP_ROUTER } from '../constants/constant';
import { RouteObject } from 'react-router/dist/lib/context';
import AddEditInvoice from '../pages/Invoice/AddEditInvoice/AddEditInvoice';

const Loader = (Component: any) => (props: any) =>
    (
        <Suspense fallback={<Progress />}>
            <Component {...props} />
        </Suspense>
    );

const Login = Loader(lazy(() => import('../pages/Login/Login')));
const Invoice = Loader(lazy(() => import('../pages/Invoice/Invoice')));

export const notAuthRoutes: RouteObject[] = [
    {
        element: <BaseLayout />,
        caseSensitive: true,
        children: [
            {
                path: APP_ROUTER.HOME,
                element: <Login />,
            },
            {
                path: APP_ROUTER.LOGIN,
                element: <Login />,
            },
            // {
            //     path: '/404',
            //     element: <Login />
            // }
        ],
    },
];

export const authRoute: RouteObject[] = [
    {
        element: <AuthLayout />,
        caseSensitive: true,
        children: [
            {
                path: APP_ROUTER.INVOICE.INDEX,
                element: <Invoice />,
            },
            {
                path: APP_ROUTER.INVOICE.ADD,
                element: <AddEditInvoice />,
            },
        ],
    },
];

import BaseLayout from '../layouts/BaseLayout/BaseLayout';
import { lazy, Suspense } from 'react';
import Spinet from '../components/loadings/Spinet';
import AuthLayout from '../layouts/AuthLayout/AuthLayout';
import { APP_ROUTER } from '../constants/constant';
import { RouteObject } from 'react-router/dist/lib/context';

const Loader = (Component: any) => (props: any) =>
    (
        <Suspense fallback={<Spinet />}>
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
        ],
    },
];

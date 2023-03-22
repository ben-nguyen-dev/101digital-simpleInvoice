import BaseLayout from '../layouts/BaseLayout';
import { lazy, Suspense } from 'react';
import Spinet from '../components/loadings/Spinet';

const Loader = (Component: any) => (props: any) =>
    (
        <Suspense fallback={<Spinet />}>
            <Component {...props} />
        </Suspense>
    );

const Login = Loader(lazy(() => import('../pages/Login/Login')));

export const notAuthRoutes = [
    {
        element: <BaseLayout />,
        caseSensitive: true,
        children: [
            {
                path: '/',
                element: <Login />,
            },
            {
                path: '/login',
                element: <Login />,
            },
            // {
            //     path: '/404',
            //     element: <Login />
            // }
        ],
    },
];

export const APP_ROUTER = {
    HOME: '/',
    LOGIN: '/login',
    INVOICE: {
        INDEX: '/invoice/list',
        ADD: '/invoice/add',
    },
};

export const LOCAL_STORAGE = {
    ACCESS_TOKEN: 'ACCESS_TOKEN',
    REFRESH_TOKEN: 'REFRESH_TOKEN',
    TOKEN_TYPE: 'TOKEN_TYPE',
    ORG_TOKEN: 'ORG_TOKEN',
};

export const BASE_URL = process.env.REACT_APP_BASE_URL || 'https://sandbox.101digital.io';

export const FORMAT_DATE = 'YYYY-MM-DD';

export const STATUS = [
    { label: 'Paid', value: 'Paid' },
    { label: 'Overdue', value: 'Overdue' },
    { label: 'Due', value: 'Due' },
    { label: '', value: '' },
];

export enum TOAST_MESSAGE_TYPE {
    ERROR = 'error',
    SUCCESS = 'success',
}

import { FORM_TYPE, IFormFiled } from '../../../interfaces/CRUD/crud';

export const BANK_FORM: IFormFiled[] = [
    {
        label: 'Bank ID',
        path: 'bankAccount.bankId',
        field: 'bankId',
        isRequired: true,
        type: FORM_TYPE.TEXT,
    },
    {
        label: 'Sort Code',
        path: 'bankAccount.sortCode',
        field: 'sortCode',
        isRequired: true,
        type: FORM_TYPE.TEXT,
    },
    {
        label: 'Account Number',
        path: 'bankAccount.accountNumber',
        field: 'accountNumber',
        isRequired: true,
        type: FORM_TYPE.TEXT,
    },
    {
        label: 'Account Name',
        path: 'bankAccount.accountName',
        field: 'accountName',
        isRequired: true,
        type: FORM_TYPE.TEXT,
    },
];

export const CUSTOMER_FORM: IFormFiled[] = [
    {
        label: 'First Name',
        path: 'customer.firstName',
        field: 'firstName',
        isRequired: true,
        type: FORM_TYPE.TEXT,
    },
    {
        label: 'Last Name',
        path: 'customer.lastName',
        field: 'lastName',
        isRequired: true,
        type: FORM_TYPE.TEXT,
    },
    {
        label: 'Email',
        path: 'customer.contact.email',
        field: 'email',
        isRequired: true,
        type: FORM_TYPE.EMAIL,
    },
    {
        label: 'Mobile Number',
        path: 'customer.contact.mobileNumber',
        field: 'mobileNumber',
        isRequired: false,
        type: FORM_TYPE.TEXT,
    },
];

export const DOCUMENT_FORM: IFormFiled[] = [
    {
        label: 'Document ID',
        path: 'documents[0].documentId',
        field: 'documentId',
        isRequired: false,
        type: FORM_TYPE.TEXT,
    },
    {
        label: 'Document Name',
        path: 'documents[0].documentName',
        field: 'documentName',
        isRequired: false,
        type: FORM_TYPE.TEXT,
    },
    {
        label: 'Document URL',
        path: 'documents[0].documentUrl',
        field: 'documentUrl',
        isRequired: false,
        type: FORM_TYPE.TEXT,
    },
];

export const INVOICE_FORM: IFormFiled[] = [
    {
        label: 'Invoice Reference',
        path: 'invoiceReference',
        field: 'invoiceReference',
        isRequired: true,
        type: FORM_TYPE.TEXT,
    },
    {
        label: 'Invoice Number',
        path: 'invoiceNumber',
        field: 'invoiceNumber',
        isRequired: true,
        type: FORM_TYPE.TEXT,
    },
    {
        label: 'Currency',
        path: 'currency',
        field: 'currency',
        isRequired: true,
        type: FORM_TYPE.TEXT,
    },
    {
        label: 'Invoice Date',
        path: 'invoiceDate',
        field: 'invoiceDate',
        isRequired: true,
        type: FORM_TYPE.DATE,
    },
    {
        label: 'Due Date',
        path: 'dueDate',
        field: 'dueDate',
        isRequired: true,
        type: FORM_TYPE.DATE,
    },
    {
        label: 'Description',
        path: 'description',
        field: 'description',
        isRequired: false,
        type: FORM_TYPE.TEXTAREA,
    },
];

export const CUSTOM_FIELD_FORM: IFormFiled[] = [
    {
        label: 'Key',
        path: 'key',
        field: 'key',
        isRequired: false,
        type: FORM_TYPE.TEXT,
    },
    {
        label: 'Value',
        path: 'value',
        field: 'value',
        isRequired: false,
        type: FORM_TYPE.TEXT,
    },
];

export const ITEM_FORM: IFormFiled[] = [
    {
        label: 'Item Reference',
        path: 'itemReference',
        field: 'itemReference',
        isRequired: true,
        type: FORM_TYPE.TEXT,
    },
    {
        label: 'Item Name',
        path: 'itemName',
        field: 'itemName',
        isRequired: true,
        type: FORM_TYPE.TEXT,
    },
    {
        label: 'Item UOM',
        path: 'itemUOM',
        field: 'itemUOM',
        isRequired: true,
        type: FORM_TYPE.TEXT,
    },
    {
        label: 'Quantity',
        path: 'quantity',
        field: 'quantity',
        isRequired: true,
        type: FORM_TYPE.TEXT,
    },
    {
        label: 'Rate',
        path: 'rate',
        field: 'rate',
        isRequired: true,
        type: FORM_TYPE.TEXT,
    },
    {
        label: 'Description',
        path: 'description',
        field: 'description',
        isRequired: false,
        type: FORM_TYPE.TEXTAREA,
    },
];

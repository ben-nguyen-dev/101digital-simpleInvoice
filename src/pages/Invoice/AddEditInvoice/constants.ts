import { FORM_TYPE, IFormFiled } from '../../../interfaces/CRUD/crud';

export const BANK_FORM: IFormFiled[] = [
    {
        label: 'Bank ID',
        field: 'bankAccount.bankId',
        isRequired: true,
        type: FORM_TYPE.TEXT,
    },
    {
        label: 'Sort Code',
        field: 'bankAccount.sortCode',
        isRequired: true,
        type: FORM_TYPE.TEXT,
    },
    {
        label: 'Account Number',
        field: 'bankAccount.accountNumber',
        isRequired: true,
        type: FORM_TYPE.TEXT,
    },
    {
        label: 'Account Name',
        field: 'bankAccount.accountName',
        isRequired: true,
        type: FORM_TYPE.TEXT,
    },
];

export const CUSTOMER_FORM: IFormFiled[] = [
    {
        label: 'First Name',
        field: 'customer.firstName',
        isRequired: true,
        type: FORM_TYPE.TEXT,
    },
    {
        label: 'Last Name',
        field: 'customer.lastName',
        isRequired: true,
        type: FORM_TYPE.TEXT,
    },
    {
        label: 'Email',
        field: 'customer.contact.email',
        isRequired: true,
        type: FORM_TYPE.TEXT,
    },
    {
        label: 'Mobile Number',
        field: 'customer.contact.mobileNumber',
        isRequired: true,
        type: FORM_TYPE.TEXT,
    },
];

export const DOCUMENT_FORM: IFormFiled[] = [
    {
        label: 'Document ID',
        field: 'documents[0].documentId',
        isRequired: true,
        type: FORM_TYPE.TEXT,
    },
    {
        label: 'Document Name',
        field: 'documents[0].documentName',
        isRequired: true,
        type: FORM_TYPE.TEXT,
    },
    {
        label: 'Document URL',
        field: 'documents[0].documentUrl',
        isRequired: true,
        type: FORM_TYPE.TEXT,
    },
];

export const INVOICE_FORM: IFormFiled[] = [
    {
        label: 'Invoice Reference',
        field: 'invoiceReference',
        isRequired: true,
        type: FORM_TYPE.TEXT,
    },
    {
        label: 'Invoice Number',
        field: 'invoiceNumber',
        isRequired: true,
        type: FORM_TYPE.TEXT,
    },
    {
        label: 'Currency',
        field: 'currency',
        isRequired: true,
        type: FORM_TYPE.TEXT,
    },
    {
        label: 'Invoice Date',
        field: 'invoiceDate',
        isRequired: true,
        type: FORM_TYPE.DATE,
    },
    {
        label: 'Due Date',
        field: 'dueDate',
        isRequired: true,
        type: FORM_TYPE.DATE,
    },
    {
        label: 'Description',
        field: 'description',
        isRequired: true,
        type: FORM_TYPE.TEXTAREA,
    },
];

export const CUSTOM_FIELD_FORM: IFormFiled[] = [
    {
        label: 'Key',
        field: 'key',
        isRequired: true,
        type: FORM_TYPE.TEXT,
    },
    {
        label: 'Value',
        field: 'value',
        isRequired: true,
        type: FORM_TYPE.TEXT,
    },
];

export const ITEM_FORM: IFormFiled[] = [
    {
        label: 'Item Reference',
        field: 'itemReference',
        isRequired: true,
        type: FORM_TYPE.TEXT,
    },
    {
        label: 'Item Name',
        field: 'itemName',
        isRequired: false,
        type: FORM_TYPE.TEXT,
    },
    {
        label: 'Item UOM',
        field: 'itemUOM',
        isRequired: false,
        type: FORM_TYPE.TEXT,
    },
    {
        label: 'Quantity',
        field: 'quantity',
        isRequired: false,
        type: FORM_TYPE.NUMBER,
    },
    {
        label: 'Rate',
        field: 'rate',
        isRequired: false,
        type: FORM_TYPE.NUMBER,
    },
    {
        label: 'Description',
        field: 'description',
        isRequired: false,
        type: FORM_TYPE.TEXTAREA,
    },
];

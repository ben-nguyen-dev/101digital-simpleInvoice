export interface ICustomer {
    id?: string;
    firstName: string;
    lastName: string;
    name?: string;
    contact: {
        email: string;
        mobileNumber: string;
    };
    addresses?: {
        premise: string;
        countryCode: string;
        postcode: string;
        county: string;
        city: string;
    }[];
    [key: string]: any;
}

export interface IStatus {
    key: string;
    value: boolean;
}
export interface IInvoice {
    invoiceId: string;
    invoiceNumber: string;
    type: string;
    balanceAmount: number;
    currency: string;
    invoiceDate: string;
    dueDate: string;
    totalTax: number;
    totalAmount: number;
    totalDiscount: number;
    totalPaid: number;
    customer: ICustomer;
    status: IStatus[];
    version: string;
    description?: string;
}

export interface IBankAccount {
    bankId: string;
    sortCode: string;
    accountNumber: string;
    accountName: string;
}

export interface IBankAccount {
    bankId: string;
    sortCode: string;
    accountNumber: string;
    accountName: string;
}

export interface IExtension {
    addDeduct: string;
    value: number;
    type: string;
    name: string;
}

export interface ICustomField {
    key: string;
    value: string;
}

export interface IInvoiceItem {
    itemReference: string;
    description: string;
    quantity: number;
    rate: number;
    itemName: string;
    itemUOM: string;
    customFields?: ICustomField[];
    extensions: IExtension[];
}

export interface IInvoiceDetail {
    bankAccount: IBankAccount;
    customer: ICustomer;
    documents?: {
        documentId: string;
        documentName: string;
        documentUrl: string;
    }[];
    invoiceReference: string;
    invoiceNumber: string;
    currency: string;
    invoiceDate: string;
    dueDate: string;
    description: string;
    customFields?: ICustomField[];
    extensions: IExtension[];
    items: IInvoiceItem[];
}

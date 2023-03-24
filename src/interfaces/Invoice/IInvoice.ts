export interface ICustomer {
    id: string;
    firstName: string;
    lastName: string;
    name: string;
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

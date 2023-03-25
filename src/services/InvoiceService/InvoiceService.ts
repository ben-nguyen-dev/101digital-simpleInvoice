import { api } from '../api';
import { IInvoiceDetail } from '../../interfaces/Invoice/IInvoice';

class InvoiceService {
    get = async (params: any) => {
        return await api.get(`/invoice-service/1.0.0/invoices`, { params });
    };

    create = async (payload: any) => {
        api.interceptors.request.use((config) => {
            config.headers['Operation-Mode'] = 'SYNC';
            return config;
        });
        return await api.post(`/invoice-service/2.0.0/invoices`, payload);
    };
}

const invoiceService = new InvoiceService();
export default invoiceService;

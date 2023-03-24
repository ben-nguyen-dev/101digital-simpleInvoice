import { api, apiGetToken } from '../api';
import qs from 'qs';
import { IUserDataLogin } from '../../pages/Login/model/ILogin';

class InvoiceService {
    get = async (params: any) => {
        const payload = {};
        return await apiGetToken.get(`/invoice-service/1.0.0/invoices`, { params });
    };
}

const invoiceService = new InvoiceService();
export default invoiceService;

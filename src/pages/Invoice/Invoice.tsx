import React, { useEffect } from 'react';
import Table from '../../components/Table/Table';
import invoiceService from '../../services/InvoiceService/InvoiceService';
import useList from '../../hooks/useList';
import { IInvoice } from '../../interfaces/Invoice/IInvoice';
import { IHeaderCell } from '../../components/Table/ITable';
import Pagination from '../../components/Pagination/Pagination';

const headerCell: IHeaderCell[] = [
    {
        label: 'id',
        field: 'invoiceId',
    },
    {
        label: 'Type',
        field: 'type',
    },
    {
        label: 'Amount',
        field: 'balanceAmount',
    },
    {
        label: 'Due Date',
        field: 'dueDate',
    },
    {
        label: 'Status',
        field: 'status[0].key',
    },
    {
        label: 'Customer',
        field: 'customer.name',
    },
];

const Invoice = () => {
    const { data, total, filters, changeFilters, setSearchString, searchString } = useList<IInvoice>({
        get: invoiceService.get,
        title: 'Invoice page',
    });

    console.log('data 💩', { data }, '');

    return (
        <div>
            <h1 className="text-4xl">Invoice page</h1>
            <Table headerCell={headerCell} data={data} />
            <Pagination gotoPage={() => {}} pageCount={total} pageIndex={filters.pageNum} total={total} />
        </div>
    );
};
export default Invoice;

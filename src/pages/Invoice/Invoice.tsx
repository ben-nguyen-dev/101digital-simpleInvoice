import React, { useRef } from 'react';
import invoiceService from '../../services/InvoiceService/InvoiceService';
import useList from '../../hooks/useList';
import { IInvoice } from '../../interfaces/Invoice/IInvoice';
import {
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
    TextField,
    Typography,
} from '@mui/material';
import { ORDERING } from '../../interfaces/CRUD/crud';
import { debounce } from 'lodash';
import { DatePicker } from '@mui/x-date-pickers';
import { FORMAT_DATE, STATUS } from '../../constants/constant';
import dayjs from 'dayjs';

const headerCell = [
    {
        sortable: false,
        label: 'ID',
        field: 'invoiceId',
    },
    {
        sortable: true,
        label: 'Invoice Number',
        field: 'invoiceNumber',
        sortField: 'invoiceNumber',
    },
    {
        sortable: true,
        label: 'Invoice Date',
        field: 'invoiceDate',
        sortField: 'invoiceDate',
    },
    {
        sortable: true,
        label: 'Type',
        field: 'type',
        sortField: 'type',
    },
    {
        sortable: true,
        label: 'Status',
        field: 'status[0]?.key',
        sortField: 'status',
    },
];

const Invoice = () => {
    const { data, total, filters, changeFilters, setSearchString, searchString } = useList<IInvoice>({
        get: invoiceService.get,
        title: 'Invoice page',
    });

    const searchKeyword = debounce((searchString: string) => {
        changeFilters({ keyword: searchString });
    }, 1000);

    const handleSort = (sortByField: string) => {
        let ordering: ORDERING | null = ORDERING.DESC;
        let sortBy: string | undefined = sortByField;

        // if user sort current field
        if (filters.sortBy === sortByField) {
            if (filters.ordering === ORDERING.DESC) {
                ordering = ORDERING.ASC;
            } else if (filters.ordering === ORDERING.ASC) {
                ordering = null;
                sortBy = undefined;
            }
        }

        changeFilters({ sortBy, ordering });
    };

    const handleChangePage = (e: any, newPage: number) => {
        changeFilters({ pageNum: newPage + 1 });
    };
    const handleChangeRowsPerPage = (e: any) => {
        changeFilters({ pageSize: e?.target?.value });
    };

    const handleChangeDate = (e: any, field: string) => {
        const value = dayjs(e).format(FORMAT_DATE);
        if (value === 'Invalid Date') {
            changeFilters({ [field]: null });
        } else {
            changeFilters({ [field]: value, dateType: 'INVOICE_DATE' });
        }
    };
    const handleChangeStatus = (e: any) => {
        changeFilters({ status: !!e ? e : null });
    };

    console.log('data 💩', { data }, '');

    return (
        <Box sx={{ p: 2 }} display={'flex'} flexDirection={'column'} flex={1} overflow={'hidden'}>
            <Typography variant="h5" sx={{ mb: 2 }}>
                Invoice Page
            </Typography>
            <Box sx={{ display: 'flex', mb: 2 }}>
                <TextField
                    label="Search"
                    onChange={(event) => searchKeyword(event.target.value)}
                    size="medium"
                    sx={{ mr: 2 }}
                />
                <DatePicker
                    format={FORMAT_DATE}
                    onChange={(event) => handleChangeDate(event, 'fromDate')}
                    label="From Date"
                    sx={{ mr: 2 }}
                />
                <DatePicker
                    format={FORMAT_DATE}
                    onChange={(event) => handleChangeDate(event, 'toDate')}
                    label="To Date"
                    sx={{ mr: 2 }}
                />
                <FormControl variant="outlined" size="medium" sx={{ width: 200 }}>
                    <InputLabel htmlFor="status">Status</InputLabel>
                    <Select
                        label="Status"
                        value={filters.status || ''}
                        onChange={(event) => handleChangeStatus(event.target.value as string)}
                        inputProps={{ id: 'status' }}
                    >
                        {STATUS.map((status) => (
                            <MenuItem key={status.value} value={status.value}>
                                {status.label === '' ? <em>None</em> : status.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>

            <TableContainer sx={{ flex: 1 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {headerCell.map((header) => (
                                <TableCell
                                    key={header.field}
                                    sx={{ cursor: header.sortable ? 'pointer' : 'default' }}
                                    onClick={() =>
                                        header.sortable && header.sortField ? handleSort(header?.sortField) : {}
                                    }
                                >
                                    {header.sortable && header.sortField ? (
                                        <TableSortLabel
                                            active={filters.sortBy === header.sortField}
                                            direction={filters.ordering === ORDERING.ASC ? 'asc' : 'desc'}
                                        >
                                            {header.label}
                                        </TableSortLabel>
                                    ) : (
                                        header.label
                                    )}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((invoice) => (
                            <TableRow key={invoice.invoiceId}>
                                <TableCell>{invoice.invoiceId}</TableCell>
                                <TableCell>{invoice.invoiceNumber}</TableCell>
                                <TableCell>{invoice.invoiceDate}</TableCell>
                                <TableCell>{invoice.type}</TableCell>
                                <TableCell>{invoice.status[0]?.key}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box sx={{ mt: 2 }}>
                <TablePagination
                    count={total}
                    page={filters.pageNum - 1}
                    component="div"
                    onPageChange={handleChangePage}
                    rowsPerPage={filters.pageSize}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Box>
        </Box>
    );
};
export default Invoice;

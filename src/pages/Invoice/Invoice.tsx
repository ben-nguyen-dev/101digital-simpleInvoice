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

    const handleSearch = (value: string) => {
        setSearchString(value);
        searchKeyword(value);
    };

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

    console.log('data 💩', { data }, '');

    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>
                Invoice Page
            </Typography>
            <Box sx={{ display: 'flex', mb: 2 }}>
                <TextField
                    label="Search"
                    // value={searchString}
                    onChange={(event) => searchKeyword(event.target.value)}
                    size="small"
                    sx={{ mr: 2 }}
                />

                <FormControl variant="outlined" size="small" sx={{ mr: 2 }}>
                    <InputLabel htmlFor="from-date">Từ ngày</InputLabel>
                    <Select
                        label="Từ ngày"
                        // value={fromDate}
                        // onChange={(event) => setFromDate(event.target.value as string)}
                        inputProps={{ id: 'from-date' }}
                    >
                        <MenuItem value="">Tất cả</MenuItem>
                        <MenuItem value="2022-01-01">1/1/2022</MenuItem>
                        <MenuItem value="2022-02-01">1/2/2022</MenuItem>
                        <MenuItem value="2022-03-01">1/3/2022</MenuItem>
                        {/* Add more options as needed */}
                    </Select>
                </FormControl>
                <FormControl variant="outlined" size="small" sx={{ mr: 2 }}>
                    <InputLabel htmlFor="to-date">Đến ngày</InputLabel>
                    <Select
                        label="Đến ngày"
                        // value={toDate}
                        // onChange={(event) => setToDate(event.target.value as string)}
                        inputProps={{ id: 'to-date' }}
                    >
                        <MenuItem value="">Tất cả</MenuItem>
                        <MenuItem value="2022-03-31">31/3/2022</MenuItem>
                        <MenuItem value="2022-04-30">30/4/2022</MenuItem>
                        <MenuItem value="2022-05-31">31/5/2022</MenuItem>
                        {/* Add more options as needed */}
                    </Select>
                </FormControl>

                <FormControl variant="outlined" size="small">
                    <InputLabel htmlFor="sort-by">Sắp xếp</InputLabel>
                    <Select
                        label="Sắp xếp"
                        // value={sortField}
                        // onChange={(event) => handleSort(event.target.value as string)}
                        inputProps={{ id: 'sort-by' }}
                    >
                        <MenuItem value="id">ID</MenuItem>
                        <MenuItem value="name">Tên khách hàng</MenuItem>
                        <MenuItem value="date">Ngày tạo</MenuItem>
                        <MenuItem value="total">Tổng tiền</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            {headerCell.map((header) => (
                                <TableCell
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
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
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

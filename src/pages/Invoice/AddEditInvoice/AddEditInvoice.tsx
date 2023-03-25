import React, { useState } from 'react';
import { Box, Button, FormControl, Grid, TextField, Typography } from '@mui/material';
import { IInvoiceDetail } from '../../../interfaces/Invoice/IInvoice';
import { BANK_FORM, CUSTOM_FIELD_FORM, CUSTOMER_FORM, DOCUMENT_FORM, INVOICE_FORM, ITEM_FORM } from './constants';
import { FORM_TYPE } from '../../../interfaces/CRUD/crud';
import { DatePicker } from '@mui/x-date-pickers';
import { APP_ROUTER, FORMAT_DATE, TOAST_MESSAGE_TYPE } from '../../../constants/constant';
import AddIcon from '@mui/icons-material/Add';
import dayjs from 'dayjs';
import { cloneDeep, get, set } from 'lodash';
import { handleError } from '../../../utils/handleError';
import invoiceService from '../../../services/InvoiceService/InvoiceService';
import { useNavigate } from 'react-router-dom';
import { ToastMessage } from '../../../components/ToastMessage/ToastMessage';

const invoiceInit = {
    bankAccount: {
        bankId: '',
        sortCode: '',
        accountNumber: '',
        accountName: '',
    },
    customer: {
        firstName: '',
        lastName: '',
        contact: {
            email: '',
            mobileNumber: '',
        },
        addresses: [],
    },
    documents: [],
    invoiceReference: '',
    invoiceNumber: '',
    currency: '',
    invoiceDate: '',
    dueDate: '',
    description: '',
    customFields: [],
    extensions: [],
    items: [],
};

const FormField = ({ type, value, ...props }: { type: FORM_TYPE; value?: string; [key: string]: any }) => {
    if (type === FORM_TYPE.DATE) {
        return <DatePicker format={FORMAT_DATE} value={dayjs(value)} {...props} sx={{ mb: 2 }} />;
    } else if (type === FORM_TYPE.TEXTAREA) {
        return <TextField fullWidth multiline rows={4} {...props} sx={{ mb: 2 }} />;
    } else {
        return <TextField fullWidth type={type} {...props} sx={{ mb: 2 }} />;
    }
};

interface INumberOfFiledOfItem {
    [key: number]: number; // key is index of item and value is number of field
}

const AddEditInvoice = () => {
    const navigate = useNavigate();
    const [invoiceData, setInvoiceData] = useState<IInvoiceDetail>(invoiceInit);
    const [numberOfItem, setNumberOfItem] = useState<number>(1);
    const [numberOfFiledOfItem, setNumberOfFieldOfItem] = useState<INumberOfFiledOfItem>({ 0: 0 });

    const handleChangeForm = (e: any, type: FORM_TYPE, field: string) => {
        let value: string = e?.target?.value || '';
        if (type === FORM_TYPE.DATE) {
            value = dayjs(e).format(FORMAT_DATE) !== 'Invalid Date' ? dayjs(e).format(FORMAT_DATE) : '';
        }

        const _invoiceData = cloneDeep(invoiceData);
        set(_invoiceData, field, value);

        setInvoiceData(_invoiceData);
    };

    const onSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const res = await invoiceService.create({ invoices: [invoiceData] });
            ToastMessage(TOAST_MESSAGE_TYPE.SUCCESS, 'Add successful');
            navigate(APP_ROUTER.INVOICE.INDEX);
        } catch (error) {
            handleError(error);
        }
    };

    return (
        <Box sx={{ p: 2 }} display={'flex'} flexDirection={'column'} flex={1}>
            <Typography variant="h5" sx={{ mb: 2 }}>
                Add Invoice Page
            </Typography>
            <Box component="form">
                <Grid container spacing={4}>
                    <Grid item xs={6}>
                        <Typography variant="h6" sx={{ mb: 2 }}>
                            Bank Account
                        </Typography>
                        {BANK_FORM.map((form) => (
                            <FormControl key={form.field} fullWidth>
                                <FormField
                                    label={form.label}
                                    type={form.type}
                                    value={get(invoiceData, form.field)}
                                    onChange={(event: any) => handleChangeForm(event, form.type, form.field)}
                                />
                            </FormControl>
                        ))}
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h6" sx={{ mb: 2 }}>
                            Customer
                        </Typography>
                        {CUSTOMER_FORM.map((form) => (
                            <FormControl key={form.field} fullWidth>
                                <FormField
                                    label={form.label}
                                    type={form.type}
                                    value={get(invoiceData, form.field)}
                                    onChange={(event: any) => handleChangeForm(event, form.type, form.field)}
                                    sx={{ mb: 2 }}
                                />
                            </FormControl>
                        ))}
                    </Grid>
                </Grid>
                <Box>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        Document
                    </Typography>
                    <Grid container spacing={4}>
                        {DOCUMENT_FORM.map((form) => (
                            <Grid key={form.field} item xs={4}>
                                <FormControl fullWidth>
                                    <FormField
                                        required={form.isRequired}
                                        type={form.type}
                                        label={form.label}
                                        value={get(invoiceData, form.field)}
                                        onChange={(event: any) => handleChangeForm(event, form.type, form.field)}
                                        sx={{ mb: 2 }}
                                    />
                                </FormControl>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                <Box>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        Invoice Information
                    </Typography>
                    <Grid container spacing={2}>
                        {INVOICE_FORM.map((form) => (
                            <Grid item xs={6} padding={0} key={form.field}>
                                <FormControl fullWidth>
                                    <FormField
                                        required={form.isRequired}
                                        type={form.type}
                                        label={form.label}
                                        value={get(invoiceData, form.field)}
                                        onChange={(event: any) => handleChangeForm(event, form.type, form.field)}
                                        sx={{ mb: 2 }}
                                    />
                                </FormControl>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                <Box>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        Custom Field
                    </Typography>
                    <Grid container spacing={2}>
                        {CUSTOM_FIELD_FORM.map((form) => (
                            <Grid key={form.field} item xs={6}>
                                <FormControl fullWidth>
                                    <FormField
                                        required={form.isRequired}
                                        type={form.type}
                                        label={form.label}
                                        value={get(invoiceData, form.field)}
                                        onChange={(event: any) => handleChangeForm(event, form.type, form.field)}
                                        sx={{ mb: 2 }}
                                    />
                                </FormControl>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                <Box>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        Items{' '}
                        <AddIcon
                            onClick={() => {
                                setNumberOfItem(numberOfItem + 1);
                                setNumberOfFieldOfItem({ ...numberOfFiledOfItem, [numberOfItem]: 0 });
                            }}
                        />
                    </Typography>
                    {Array.from(Array(numberOfItem).keys()).map((indexItem, index: number) => (
                        <Grid
                            key={indexItem}
                            container
                            spacing={2}
                            margin={0}
                            border={1}
                            padding={2}
                            width={'auto'}
                            sx={{ mb: 4, pl: 0 }}
                        >
                            {ITEM_FORM.map((form) => {
                                const currentField = `items[${indexItem}].${form.field}`;
                                return (
                                    <Grid key={form.field} item xs={6} padding={0} sx={{ p: 0 }}>
                                        <FormControl fullWidth>
                                            <FormField
                                                required={form.isRequired}
                                                type={form.type}
                                                label={form.label}
                                                value={get(invoiceData, currentField)}
                                                onChange={(event: any) =>
                                                    handleChangeForm(event, form.type, currentField)
                                                }
                                                sx={{ mb: 2 }}
                                            />
                                        </FormControl>
                                    </Grid>
                                );
                            })}
                            <Box padding={2} sx={{ width: '100%' }}>
                                <Typography sx={{ mb: 2 }}>
                                    Custom Fields{' '}
                                    <AddIcon
                                        onClick={() =>
                                            setNumberOfFieldOfItem({
                                                ...numberOfFiledOfItem,
                                                [indexItem]: numberOfFiledOfItem[indexItem] + 1,
                                            })
                                        }
                                    />
                                </Typography>
                                {Array.from(Array(numberOfFiledOfItem[indexItem]).keys()).map(
                                    (indexField, index: number) => (
                                        <Grid container spacing={2} width={'auto'} key={indexField} item xs={4}>
                                            {CUSTOM_FIELD_FORM.map((form) => {
                                                const currentField = `items[${indexItem}].customFields[${indexField}].${form.field}`;
                                                return (
                                                    <Grid item xs={6}>
                                                        <FormControl fullWidth>
                                                            <FormField
                                                                required={form.isRequired}
                                                                type={form.type}
                                                                label={form.label}
                                                                value={get(invoiceData, form.field)}
                                                                onChange={(event: any) =>
                                                                    handleChangeForm(event, form.type, currentField)
                                                                }
                                                                sx={{ mb: 2 }}
                                                            />
                                                        </FormControl>
                                                    </Grid>
                                                );
                                            })}
                                        </Grid>
                                    )
                                )}
                            </Box>
                        </Grid>
                    ))}
                </Box>

                <Button onClick={onSubmit} type="submit" variant="contained" color="primary">
                    Add Invoice
                </Button>
            </Box>
        </Box>
    );
};
export default AddEditInvoice;

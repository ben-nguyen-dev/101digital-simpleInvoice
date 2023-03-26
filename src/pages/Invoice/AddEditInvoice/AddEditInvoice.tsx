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
import { useYup } from './Yup';
import { useForm } from 'react-hook-form';
import { IUserDataLogin } from '../../../interfaces/Login/ILogin';
import { yupResolver } from '@hookform/resolvers/yup';

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

const FormField = ({ type, getValues, register, setValue, field, ...rest }: any) => {
    if (type === FORM_TYPE.DATE) {
        return (
            <DatePicker
                format={FORMAT_DATE}
                value={dayjs(getValues(field)) || ''}
                {...register(field)}
                {...rest}
                sx={{ mb: 2 }}
                onChange={(e: any) => {
                    const value = dayjs(e).format(FORMAT_DATE) !== 'Invalid Date' ? dayjs(e).format(FORMAT_DATE) : '';

                    setValue(field, value, { shouldValidate: true, shouldDirty: true });
                }}
                renderInput={(params: any) => <TextField {...params} {...rest} sx={{ width: '100%' }} />}
            />
        );
    } else if (type === FORM_TYPE.TEXTAREA) {
        return <TextField fullWidth multiline rows={4} {...register(field)} {...rest} sx={{ mb: 2 }} />;
    } else {
        return <TextField fullWidth type={type} {...register(field)} {...rest} sx={{ mb: 2 }} />;
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

    const { schema } = useYup();
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors, isValid },
    } = useForm({
        mode: 'all',
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data: any) => {
        try {
            const res = await invoiceService.create({ invoices: [data] });
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
            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Typography variant="h6" sx={{ mb: 2 }}>
                            Bank Account
                        </Typography>
                        {BANK_FORM.map((form) => (
                            <FormControl key={form.path} fullWidth>
                                <FormField
                                    required={form.isRequired}
                                    label={form.label}
                                    type={form.type}
                                    register={register}
                                    field={form.path}
                                    error={!!get(errors, form.path)}
                                    helperText={get(errors, `${form.path}.message`)}
                                />
                            </FormControl>
                        ))}
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h6" sx={{ mb: 2 }}>
                            Customer
                        </Typography>
                        {CUSTOMER_FORM.map((form) => (
                            <FormControl key={form.path} fullWidth>
                                <FormField
                                    required={form.isRequired}
                                    label={form.label}
                                    type={form.type}
                                    register={register}
                                    field={form.path}
                                    error={!!get(errors, form.path)}
                                    helperText={get(errors, `${form.path}.message`)}
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
                    <Grid container spacing={2}>
                        {DOCUMENT_FORM.map((form) => (
                            <Grid key={form.path} item xs={4}>
                                <FormControl fullWidth>
                                    <FormField
                                        required={form.isRequired}
                                        type={form.type}
                                        label={form.label}
                                        register={register}
                                        field={form.path}
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
                            <Grid item xs={6} padding={0} key={form.path}>
                                <FormControl fullWidth>
                                    <FormField
                                        setValue={setValue}
                                        getValues={getValues}
                                        required={form.isRequired}
                                        type={form.type}
                                        label={form.label}
                                        register={register}
                                        field={form.path}
                                        error={!!get(errors, form.path)}
                                        helperText={get(errors, `${form.path}.message`)}
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
                            <Grid key={form.path} item xs={6}>
                                <FormControl fullWidth>
                                    <FormField
                                        required={form.isRequired}
                                        type={form.type}
                                        label={form.label}
                                        register={register}
                                        field={form.path}
                                        error={!!get(errors, form.path)}
                                        helperText={get(errors, `${form.path}.message`)}
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
                                const currentField = `items[${indexItem}].${form.path}`;
                                return (
                                    <Grid key={form.path} item xs={6} padding={0} sx={{ p: 0 }}>
                                        <FormControl fullWidth>
                                            <FormField
                                                required={form.isRequired}
                                                type={form.type}
                                                label={form.label}
                                                register={register}
                                                field={currentField}
                                                error={!!get(errors, currentField)}
                                                helperText={get(errors, `${currentField}.message`)}
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
                                                const currentField = `items[${indexItem}].customFields[${indexField}].${form.path}`;
                                                return (
                                                    <Grid item xs={6}>
                                                        <FormControl fullWidth>
                                                            <FormField
                                                                required={form.isRequired}
                                                                type={form.type}
                                                                label={form.label}
                                                                register={register}
                                                                field={currentField}
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

                <Button disabled={!isValid} type="submit" variant="contained" color="primary">
                    Add Invoice
                </Button>
            </Box>
        </Box>
    );
};
export default AddEditInvoice;

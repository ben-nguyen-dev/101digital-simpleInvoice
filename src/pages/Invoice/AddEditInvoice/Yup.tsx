import React from 'react';
import * as yup from 'yup';

export const useYup = () => {
    const bankSchema = yup.object().shape({
        bankId: yup.string().required().label('Bank ID'),
        sortCode: yup.number().required().label('Sort Code'),
        accountNumber: yup.string().required().label('Account Number'),
        accountName: yup.string().required().label('Account Name'),
    });

    const customerSchema = yup.object().shape({
        firstName: yup.string().required().label('First Name'),
        lastName: yup.string().required().label('Last Name'),
        contact: yup.object().shape({
            email: yup.string().email().required().label('Email'),
        }),
    });

    const itemsSchema = yup.array().of(
        yup.object().shape({
            itemReference: yup.string().required().label('Item Reference'),
            itemName: yup.string().required().label('Item Name'),
            itemUOM: yup.string().required().label('Item UOM'),
            quantity: yup.number().required().label('Quantity'),
            rate: yup.number().required().label('Rate'),
        })
    );

    const schema = yup.object().shape({
        bankAccount: bankSchema,
        customer: customerSchema,
        invoiceReference: yup.string().required().label('Invoice Reference'),
        invoiceNumber: yup.number().required().label('Invoice Number'),
        currency: yup.string().required().label('Currency'),
        invoiceDate: yup.string().required().label('Invoice Date'),
        dueDate: yup.string().required().label('Due Date'),
        items: itemsSchema,
    });
    return { schema };
};

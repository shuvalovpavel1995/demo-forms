// eslint-disable-next-line no-restricted-syntax
import React, {useEffect, useState} from 'react';

import {FormProvider, useForm} from 'react-hook-form';

import {computeConfig} from '../../mocks/configs';
import {initialState} from '../../mocks/initial';
import {FormFieldsValues} from '../../types';
import {sleep} from '../utils/validators';

import FormBlocks from './FormBlocks';

export interface FormProps {}

const onSubmit = async (values: FormFieldsValues) => {
    await sleep(300);
    window.alert(JSON.stringify(values, 0, 2));
};

export const Form = React.forwardRef<FormProps>(function FormComponent() {
    const [config, setConfig] = useState<typeof computeConfig | null>(null);

    useEffect(() => {
        setTimeout(() => {
            setConfig(computeConfig);
        }, 100);
    }, []);

    const methods = useForm<FormFieldsValues>({mode: 'onBlur', defaultValues: initialState});

    if (!config) {
        return <React.Fragment>Loading</React.Fragment>;
    }

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                <FormBlocks config={config} />
            </form>
        </FormProvider>
    );
});

import React, {useEffect, useState} from 'react';

import {FormProvider, useForm} from 'react-hook-form';

import {computeConfig} from '../../mocks/configs';
import {sleep} from '../utils/validators';

import {FormBlocks} from './FormBlocks';
import {FormFieldsValues} from '../../types';

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

    const methods = useForm<FormFieldsValues>();

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

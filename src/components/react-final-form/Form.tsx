// eslint-disable-next-line no-restricted-syntax
import React, {useEffect, useState} from 'react';

import arrayMutators from 'final-form-arrays';
import createDecorator from 'final-form-calculate';
import {Form as FinalForm} from 'react-final-form';

import {computeConfig} from '../../mocks/configs';
import {initialState} from '../../mocks/initial';
import {defaultMemoryByPlatform} from '../utils/utils';
import {sleep} from '../utils/validators';

import {FormBlocks} from './FormBlocks';

export interface FormProps {}

const onSubmit = async (values: Record<string, unknown>) => {
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

    const calculator = createDecorator({
        field: /blocks\[\d+\]\.configurations\[\d+\].platform/,
        updates: (newPlatform: string, name: string) => {
            const fieldPath = name.replace('.platform', '');

            return {
                [`${fieldPath}.gpuCores`]: '1',
                [`${fieldPath}.cores`]: '20',
                [`${fieldPath}.memory`]: defaultMemoryByPlatform(newPlatform[0]),
                [`${fieldPath}.preemptible`]: true,
            };
        },
    });

    if (!config) {
        return <React.Fragment>Loading</React.Fragment>;
    }

    return (
        <FinalForm
            decorators={[calculator]}
            onSubmit={onSubmit}
            mutators={{
                ...arrayMutators,
            }}
            initialValues={initialState}
            subscription={{}}
            render={({handleSubmit}) => {
                return (
                    <form onSubmit={handleSubmit}>
                        <FormBlocks config={config} />
                    </form>
                );
            }}
        />
    );
});

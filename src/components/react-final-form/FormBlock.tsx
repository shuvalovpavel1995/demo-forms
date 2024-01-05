import React from 'react';

import {Button, Card} from '@gravity-ui/uikit';
import {useForm} from 'react-final-form';
import {useFieldArray} from 'react-final-form-arrays';

import {computeConfig} from '../../mocks/configs';
import {ComputeConfiguration, FormFieldsValues, K8sConfiguration} from '../../types';
import {Counter} from '../counter/Counter';
import {block} from '../utils/cn';

import {Configuration} from './Configuration';

import './Form.scss';

const b = block('form-block');

export interface FormBlockProps {
    config: typeof computeConfig;
    name: string;
    blockIndex: number;
    remove: (index: number) => void;
}

export const FormBlock = ({name, config, blockIndex, remove}: FormBlockProps) => {
    const {fields} = useFieldArray<K8sConfiguration | ComputeConfiguration>(
        `${name}.configurations`,
        {subscription: {}},
    );
    const form = useForm<FormFieldsValues>();

    return (
        <Card
            type="container"
            view="outlined"
            key={`blockIndex=${blockIndex}`}
            className={b('card')}
        >
            <label>Block #{blockIndex + 1}</label>
            <Counter />
            <Button
                size={'l'}
                view="flat-action"
                onClick={() =>
                    form.mutators.push(`${name}.configurations`, {type: 'compute', disks: {}})
                }
            >
                Add new compute configuration
            </Button>
            <Button
                size={'l'}
                view="flat-action"
                onClick={() => form.mutators.push(`${name}.configurations`, {type: 'k8s'})}
            >
                Add new k8s configuration
            </Button>
            <Button size={'l'} view="flat-action" onClick={() => remove(blockIndex)}>
                ❌
            </Button>

            {fields.map((configurationName, configurationIndex) => {
                return (
                    <Configuration
                        key={`${configurationName}.${configurationIndex}`}
                        configurationName={configurationName}
                        configurationIndex={configurationIndex}
                        config={config}
                    />
                );
            })}
        </Card>
    );
};

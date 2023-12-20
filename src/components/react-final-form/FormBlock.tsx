import React from 'react';
import {Button, Card} from '@gravity-ui/uikit';
import {useFieldArray} from 'react-final-form-arrays';
import {useForm} from 'react-final-form';

import {Configuration} from './Configuration';
import {block} from '../utils/cn';
import {computeConfig} from '../../mocks/configs';
import {ComputeConfiguration, ComputeFormFieldsValues, K8sConfiguration} from './ComputeFormView';

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
    );
    const form = useForm<ComputeFormFieldsValues>();

    return (
        <Card
            type="container"
            view="outlined"
            key={`blockIndex=${blockIndex}`}
            className={b('card')}
        >
            <label>Block #{blockIndex + 1}</label>
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

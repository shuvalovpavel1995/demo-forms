import React from 'react';

import {Button, Card} from '@gravity-ui/uikit';
import {useFieldArray} from 'react-hook-form';

import {computeConfig} from '../../mocks/configs';
import {block} from '../utils/cn';

import {Configuration} from './Configuration';

import './Form.scss';

const b = block('form-block');

export interface FormBlockProps {
    config: typeof computeConfig;
    field: Record<'id', string>;
    blockIndex: number;
    remove: (index: number) => void;
}

export const FormBlock = ({field, config, blockIndex, remove}: FormBlockProps) => {
    const {fields, append: appendConfiguration} = useFieldArray({
        name: `blocks.${blockIndex}.configurations`,
    });

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
                onClick={() => appendConfiguration({type: 'compute', disks: {}})}
            >
                Add new compute configuration
            </Button>
            <Button
                size={'l'}
                view="flat-action"
                onClick={() => appendConfiguration({type: 'k8s'})}
            >
                Add new k8s configuration
            </Button>
            <Button size={'l'} view="flat-action" onClick={() => remove(blockIndex)}>
                ❌
            </Button>

            {fields.map((configurationField, configurationIndex) => {
                return (
                    <Configuration
                        key={configurationField.id}
                        blockIndex={blockIndex}
                        configurationIndex={configurationIndex}
                        config={config}
                    />
                );
            })}
        </Card>
    );
};

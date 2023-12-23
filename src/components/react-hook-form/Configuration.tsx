import React from 'react';

import {Card, TextInput} from '@gravity-ui/uikit';
import {Controller, useFormContext} from 'react-hook-form';

import {computeConfig} from '../../mocks/configs';
import {FormFieldsValues} from '../../types';
import {block} from '../utils/cn';

import ComputeFormView from './ComputeFormView';

import './Form.scss';

const b = block('form-block');

export interface ConfigurationProps {
    blockIndex: number;
    configurationIndex: number;
    config: typeof computeConfig;
}

export const Configuration = ({blockIndex, configurationIndex, config}: ConfigurationProps) => {
    const {register, control, getValues} = useFormContext<FormFieldsValues>();
    const type = getValues(`blocks.${blockIndex}.configurations.${configurationIndex}`).type;

    return (
        <Card type="container" view="outlined" className={b('card')}>
            {type === 'compute' ? (
                <div>
                    Compute
                    <div>
                        <ComputeFormView
                            blockIndex={blockIndex}
                            configurationIndex={configurationIndex}
                            platforms={config.platforms}
                            osProducts={config.osProducts}
                            diskTypes={config.diskTypes}
                        />
                    </div>
                </div>
            ) : (
                <div>
                    K8S
                    <div>
                        Name&nbsp;
                        <Controller
                            render={({field}) => (
                                <TextInput
                                    {...field}
                                    value={field.value}
                                    onUpdate={field.onChange}
                                />
                            )}
                            control={control}
                            name={`blocks.${blockIndex}.configurations.${configurationIndex}.name`}
                        />
                    </div>
                </div>
            )}
        </Card>
    );
};

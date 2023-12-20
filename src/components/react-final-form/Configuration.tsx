import React from 'react';
import {Card, TextInput} from '@gravity-ui/uikit';
import {useForm, useField, Field} from 'react-final-form';

import {block} from '../utils/cn';
import ComputeFormView, {FormFieldsValues} from './ComputeFormView';
import {computeConfig} from '../../mocks/configs';

import './Form.scss';

const b = block('form-block');

export interface ConfigurationProps {
    configurationName: string;
    configurationIndex: number;
    config: typeof computeConfig;
}

export const Configuration = ({configurationName, config}: ConfigurationProps) => {
    const form = useForm<FormFieldsValues>();
    const typeInput = useField<string, HTMLElement, string>(`${configurationName}.type`, form);
    const type = typeInput.input.value;

    return (
        <Card type="container" view="outlined" key={configurationName} className={b('card')}>
            {type === 'compute' ? (
                <div>
                    Compute
                    <div>
                        <ComputeFormView
                            fieldName={configurationName}
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
                        <Field name={`${configurationName}.name`}>
                            {(fieldProps) => (
                                <TextInput
                                    {...fieldProps}
                                    value={fieldProps.input.value}
                                    onUpdate={fieldProps.input.onChange}
                                />
                            )}
                        </Field>
                    </div>
                </div>
            )}
        </Card>
    );
};

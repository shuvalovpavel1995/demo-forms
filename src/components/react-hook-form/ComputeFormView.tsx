import React, {Fragment} from 'react';

import {Select} from '@gravity-ui/uikit';
import _ from 'lodash';
import {Field, FieldRenderProps} from 'react-final-form';
import {Controller, useFormContext} from 'react-hook-form';

import {computeConfig} from '../../mocks/configs';
import {FormFieldsValues, Option} from '../../types';
import {block} from '../utils/cn';
import {osAvaliable} from '../utils/validators';

import './Form.scss';

const b = block('form-block');

export interface ComputeFormFieldsProps {
    blockIndex: number;
    configurationIndex: number;
    platforms: typeof computeConfig.platforms;
    osProducts: Option[];
    diskTypes: Option[];
}

const ErrorText = ({text}: {text: string}) => <span className={b('error')}>{text}</span>;

const ComputeFormFields = ({
    blockIndex,
    configurationIndex,
    platforms,
    osProducts,
    diskTypes,
}: ComputeFormFieldsProps) => {
    const {control} = useFormContext<FormFieldsValues>();

    return (
        <React.Fragment>
            <div>
                OS Product&nbsp;
                <Controller
                    render={({field}) => (
                        <Select
                            {...field}
                            value={field.value}
                            onUpdate={field.onChange}
                            options={osProducts}
                        />
                    )}
                    control={control}
                    name={`blocks.${blockIndex}.configurations.${configurationIndex}.osProduct`}
                />
            </div>
        </React.Fragment>
    );
};

export default ComputeFormFields;

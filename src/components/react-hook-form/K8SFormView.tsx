// eslint-disable-next-line no-restricted-syntax
import React, {Fragment, memo} from 'react';

import {TextInput} from '@gravity-ui/uikit';
import {Control, Controller} from 'react-hook-form';

import {FormFieldsValues} from '../../types';
import {Counter} from '../counter/Counter';

export interface K8SFormViewProps {
    blockIndex: number;
    configurationIndex: number;
    control: Control<FormFieldsValues>;
}

const K8SFormView = ({blockIndex, configurationIndex, control}: K8SFormViewProps) => {
    return (
        <Fragment>
            <Counter />
            Name&nbsp;
            <Controller
                render={({field}) => (
                    <TextInput {...field} value={field.value} onUpdate={field.onChange} />
                )}
                control={control}
                name={`blocks.${blockIndex}.configurations.${configurationIndex}.name`}
            />
        </Fragment>
    );
};

export default memo(K8SFormView);

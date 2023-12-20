import React from 'react';
import {useFieldArray} from 'react-final-form-arrays';
import {useForm, useFormState} from 'react-final-form';
import {Button} from '@gravity-ui/uikit';

import {FormBlock} from './FormBlock';
import {computeConfig} from '../../mocks/configs';
import {FormFieldsValues} from './ComputeFormView';

export interface FormBlocksProps {
    config: typeof computeConfig;
}

export const FormBlocks = ({config}: FormBlocksProps) => {
    const form = useForm<FormFieldsValues>();
    const {values} = useFormState<FormFieldsValues>();
    const {fields} = useFieldArray<FormFieldsValues['blocks']>(`blocks`);

    return (
        <div>
            <div>
                {fields.map((name, blockIndex) => (
                    <FormBlock
                        name={name}
                        blockIndex={blockIndex}
                        remove={fields.remove}
                        config={config}
                        key={`block=${blockIndex}`}
                    />
                ))}
                <Button
                    size={'l'}
                    onClick={() => form.mutators.push('blocks', undefined)}
                    view={'flat'}
                >
                    Add new block
                </Button>
            </div>
            <div className="buttons">
                <Button type="submit" view="action">
                    Submit
                </Button>
                <Button view="flat-action" onClick={() => form.reset()}>
                    Reset
                </Button>
            </div>
            <pre>{JSON.stringify(values, 0, 2)}</pre>
        </div>
    );
};

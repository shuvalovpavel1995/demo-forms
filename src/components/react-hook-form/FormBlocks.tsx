import React from 'react';

import {Button} from '@gravity-ui/uikit';
import {useFieldArray, useFormContext} from 'react-hook-form';

import {computeConfig} from '../../mocks/configs';

import {FormBlock} from './FormBlock';

export interface FormBlocksProps {
    config: typeof computeConfig;
}

export const FormBlocks = ({config}: FormBlocksProps) => {
    const {fields, append, remove} = useFieldArray({name: 'blocks'});
    const {watch} = useFormContext();

    return (
        <div>
            <div>
                {fields.map((field, blockIndex) => (
                    <FormBlock
                        field={field}
                        blockIndex={blockIndex}
                        remove={remove}
                        config={config}
                        key={field.id}
                    />
                ))}
                <Button size={'l'} onClick={() => append({blocks: undefined})} view={'flat'}>
                    Add new block
                </Button>
            </div>
            <div className="buttons">
                <Button type="submit" view="action">
                    Submit
                </Button>
                <Button view="flat-action" onClick={() => {}}>
                    Reset
                </Button>
            </div>
            <pre>{JSON.stringify(watch(), 0, 2)}</pre>
        </div>
    );
};

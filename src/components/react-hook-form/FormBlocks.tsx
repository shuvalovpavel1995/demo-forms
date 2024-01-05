// eslint-disable-next-line no-restricted-syntax
import React, {memo} from 'react';

import {Button} from '@gravity-ui/uikit';
import {useFieldArray, useFormContext} from 'react-hook-form';

import {computeConfig} from '../../mocks/configs';
import {Counter} from '../counter/Counter';

import FormBlock from './FormBlock';

export interface FormBlocksProps {
    config: typeof computeConfig;
}

const FormBlocks = ({config}: FormBlocksProps) => {
    const {fields, append, remove} = useFieldArray({name: 'blocks'});
    const {watch} = useFormContext();

    return (
        <div>
            <Counter />
            <div>
                {fields.map((field, blockIndex) => (
                    <FormBlock
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

export default memo(FormBlocks);

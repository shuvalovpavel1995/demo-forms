// eslint-disable-next-line no-restricted-syntax
import React, {memo} from 'react';

import {Card} from '@gravity-ui/uikit';
import {useFormContext} from 'react-hook-form';

import {computeConfig} from '../../mocks/configs';
import {FormFieldsValues} from '../../types';
import {Counter} from '../counter/Counter';
import {block} from '../utils/cn';

import ComputeFormView from './ComputeFormView';
import K8SFormView from './K8SFormView';

import './Form.scss';

const b = block('form-block');

export interface ConfigurationProps {
    blockIndex: number;
    configurationIndex: number;
    config: typeof computeConfig;
}

const Configuration = ({blockIndex, configurationIndex, config}: ConfigurationProps) => {
    const {control, getValues} = useFormContext<FormFieldsValues>();
    const type = getValues(`blocks.${blockIndex}.configurations.${configurationIndex}`).type;

    return (
        <Card type="container" view="outlined" className={b('card')}>
            <Counter />
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
                        <K8SFormView
                            blockIndex={blockIndex}
                            configurationIndex={configurationIndex}
                            control={control}
                        />
                    </div>
                </div>
            )}
        </Card>
    );
};

export default memo(Configuration);

import React from 'react';

import {Card} from '@gravity-ui/uikit';
import {useFormContext} from 'react-hook-form';

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
    const {register, getValues} = useFormContext<FormFieldsValues>();
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
                        <input
                            placeholder="Name"
                            {...register(
                                `blocks.${blockIndex}.configurations.${configurationIndex}.name`,
                                {required: true},
                            )}
                        />
                    </div>
                </div>
            )}
        </Card>
    );
};

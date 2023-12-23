import React from 'react';

import {Button, Card, Checkbox, RadioButton, Select, TextInput} from '@gravity-ui/uikit';
import _ from 'lodash';
import {Controller, useFieldArray, useFormContext} from 'react-hook-form';

import {computeConfig} from '../../mocks/configs';
import {FormFieldsValues, Option} from '../../types';
import {block} from '../utils/cn';

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
    const {register, control, getValues} = useFormContext<FormFieldsValues>();
    const platform = getValues(
        `blocks.${blockIndex}.configurations.${configurationIndex}.platform`,
    )?.[0];

    const gpuPlatforms = React.useMemo(() => platforms.map(({id}) => id), [platforms]);

    const rejectPreemptible = React.useMemo(
        () => Boolean(platforms.find(({id}) => id === platform)?.rejectPreemptible),
        [platforms, platform],
    );

    const gpuCoresOptions = React.useMemo(
        () =>
            (platforms.find(({id}) => id === platform)?.allowedConfigurations ?? []).map(
                ({gpus}) => ({
                    content: String(gpus),
                    value: String(gpus),
                }),
            ),
        [platform, platforms],
    );

    const {fields, append: appendDisks} = useFieldArray({
        name: `blocks.${blockIndex}.configurations.${configurationIndex}.disks`,
    });

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
            <div>
                Platform&nbsp;
                <Controller
                    render={({field}) => (
                        <Select
                            {...field}
                            value={field.value}
                            onUpdate={field.onChange}
                            options={platforms.map(({id: value, name: content}) => ({
                                content,
                                value,
                            }))}
                        />
                    )}
                    control={control}
                    name={`blocks.${blockIndex}.configurations.${configurationIndex}.platform`}
                />
            </div>
            {gpuPlatforms.includes(platform) && (
                <div>
                    Gpu Cores&nbsp;
                    <Controller
                        render={({field}) => (
                            <RadioButton
                                {...field}
                                value={field.value}
                                onUpdate={field.onChange}
                                options={gpuCoresOptions}
                            />
                        )}
                        control={control}
                        name={`blocks.${blockIndex}.configurations.${configurationIndex}.gpuCores`}
                    />
                </div>
            )}
            <div>
                Cores&nbsp;
                <Controller
                    render={({field}) => (
                        <TextInput {...field} value={field.value} onUpdate={field.onChange} />
                    )}
                    control={control}
                    name={`blocks.${blockIndex}.configurations.${configurationIndex}.cores`}
                />
            </div>
            <div>
                Memory&nbsp;
                <Controller
                    render={({field}) => (
                        <TextInput {...field} value={field.value} onUpdate={field.onChange} />
                    )}
                    control={control}
                    name={`blocks.${blockIndex}.configurations.${configurationIndex}.memory`}
                />
            </div>

            <div>
                <Controller
                    render={({field}) => (
                        <Checkbox
                            checked={field.value}
                            size="l"
                            onUpdate={field.onChange}
                            disabled={rejectPreemptible}
                        >
                            &nbsp;Preemptible&nbsp;
                        </Checkbox>
                    )}
                    control={control}
                    name={`blocks.${blockIndex}.configurations.${configurationIndex}.preemptible`}
                />
            </div>
            <div>
                <Controller
                    render={({field}) => (
                        <Checkbox checked={field.value} size="l" onUpdate={field.onChange}>
                            &nbsp;Network&nbsp;
                        </Checkbox>
                    )}
                    control={control}
                    name={`blocks.${blockIndex}.configurations.${configurationIndex}.network`}
                />
            </div>
            <div>
                <div>
                    Disk&nbsp;
                    <Button size={'m'} onClick={() => appendDisks({})} view="action">
                        Add new disk
                    </Button>
                </div>
                {fields.map((diskField, diskIndex) => (
                    <Card type="container" view="outlined" key={diskField.id} className={b('card')}>
                        <div>
                            Disk type&nbsp;
                            <Controller
                                render={({field}) => (
                                    <Select
                                        {...field}
                                        value={field.value}
                                        onUpdate={field.onChange}
                                        options={diskTypes}
                                    />
                                )}
                                control={control}
                                name={`blocks.${blockIndex}.configurations.${configurationIndex}.disks.${diskIndex}.type`}
                            />
                        </div>
                        <div>
                            Disk size&nbsp;
                            <Controller
                                render={({field}) => (
                                    <TextInput
                                        {...field}
                                        value={field.value}
                                        onUpdate={field.onChange}
                                    />
                                )}
                                control={control}
                                name={`blocks.${blockIndex}.configurations.${configurationIndex}.disks.${diskIndex}.size`}
                            />
                        </div>
                    </Card>
                ))}
            </div>
        </React.Fragment>
    );
};

export default ComputeFormFields;

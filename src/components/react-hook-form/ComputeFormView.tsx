// eslint-disable-next-line no-restricted-syntax
import React, {memo, useCallback, useEffect} from 'react';

import {Button, Card, Checkbox, RadioButton, Select, TextInput} from '@gravity-ui/uikit';
import _ from 'lodash';
import {
    Controller,
    FieldError,
    FieldErrorsImpl,
    Merge,
    useFieldArray,
    useFormContext,
} from 'react-hook-form';

import {computeConfig} from '../../mocks/configs';
import {
    ComputeConfiguration,
    DiskType,
    FormFieldsValues,
    Option,
    isComputeConfiguration,
} from '../../types';
import {Counter} from '../counter/Counter';
import {block} from '../utils/cn';
import {defaultMemoryByPlatform} from '../utils/utils';
import {composeValidators, minValue, mustBeNumber, required} from '../utils/validators';

import {osAvaliable} from './utils';

import './Form.scss';

const b = block('form-block');

export interface ComputeFormFieldsProps {
    blockIndex: number;
    configurationIndex: number;
    platforms: typeof computeConfig.platforms;
    osProducts: Option[];
    diskTypes: Option[];
}

const ComputeFormFields = ({
    blockIndex,
    configurationIndex,
    platforms,
    osProducts,
    diskTypes,
}: ComputeFormFieldsProps) => {
    const {
        control,
        formState: {errors},
        getValues,
        resetField,
    } = useFormContext<FormFieldsValues>();
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

    useEffect(() => {
        if (platform) {
            resetField(`blocks.${blockIndex}.configurations.${configurationIndex}.gpuCores`, {
                defaultValue: '1',
            });
            resetField(`blocks.${blockIndex}.configurations.${configurationIndex}.cores`, {
                defaultValue: '20',
            });
            resetField(`blocks.${blockIndex}.configurations.${configurationIndex}.memory`, {
                defaultValue: defaultMemoryByPlatform(platform),
            });
            resetField(`blocks.${blockIndex}.configurations.${configurationIndex}.preemptible`, {
                defaultValue: true,
            });
        }
    }, [resetField, platform, blockIndex, configurationIndex]);

    const configurationError = errors.blocks?.[blockIndex]?.configurations?.[
        configurationIndex
    ] as Merge<FieldError, FieldErrorsImpl<NonNullable<ComputeConfiguration>>>;

    const memoryValidate = useCallback(
        (value: string, allValues: FormFieldsValues) => {
            const configurationValues =
                allValues.blocks[blockIndex].configurations[configurationIndex];
            if (!isComputeConfiguration(configurationValues)) {
                return undefined;
            }

            if (
                (Number(value) < 0 || Number(value) > 500) &&
                configurationValues.platform?.includes('gpu-h100')
            ) {
                return 'Only 0-500 avaliable for gpu-h100 platform';
            }

            if (
                (Number(value) < 500 || Number(value) > 1000) &&
                configurationValues.platform?.includes('gpu-standard-v3')
            ) {
                return 'Only 500-1000 avaliable for gpu-standard-v3 platform';
            }

            if (
                (Number(value) < 1000 || Number(value) > 5000) &&
                configurationValues.platform?.includes('standard-v2')
            ) {
                return 'Only 1000-5000 avaliable for gpu-standard-v3 platform';
            }

            return undefined;
        },
        [blockIndex, configurationIndex],
    );

    return (
        <React.Fragment>
            <Counter />
            <div>
                OS Product&nbsp;
                <Controller
                    render={({field}) => (
                        <Select
                            {...field}
                            value={field.value}
                            onUpdate={field.onChange}
                            options={osProducts}
                            error={configurationError?.osProduct?.message}
                        />
                    )}
                    rules={{validate: osAvaliable}}
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
                            error={configurationError?.platform?.message}
                        />
                    )}
                    rules={{validate: required}}
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
                        rules={{validate: required}}
                        control={control}
                        name={`blocks.${blockIndex}.configurations.${configurationIndex}.gpuCores`}
                    />
                </div>
            )}
            <div>
                Cores&nbsp;
                <Controller
                    render={({field}) => (
                        <TextInput
                            {...field}
                            value={field.value}
                            onUpdate={field.onChange}
                            error={configurationError?.cores?.message}
                            errorMessage={configurationError?.cores?.message}
                        />
                    )}
                    rules={{
                        validate: (value: string) =>
                            composeValidators(required, mustBeNumber, minValue(1))(value),
                    }}
                    control={control}
                    name={`blocks.${blockIndex}.configurations.${configurationIndex}.cores`}
                />
            </div>
            <div>
                Memory&nbsp;
                <Controller
                    render={({field}) => (
                        <TextInput
                            {...field}
                            value={field.value}
                            onUpdate={field.onChange}
                            error={configurationError?.memory?.message}
                            errorMessage={configurationError?.memory?.message}
                        />
                    )}
                    rules={{validate: memoryValidate}}
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
                                        error={
                                            (
                                                configurationError?.disks?.[diskIndex]
                                                    ?.type as Merge<
                                                    FieldError,
                                                    FieldErrorsImpl<NonNullable<DiskType>>
                                                >
                                            )?.message
                                        }
                                    />
                                )}
                                rules={{validate: required}}
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
                                        error={
                                            configurationError?.disks?.[diskIndex]?.size?.message
                                        }
                                        errorMessage={
                                            configurationError?.disks?.[diskIndex]?.size?.message
                                        }
                                    />
                                )}
                                rules={{validate: required}}
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

export default memo(ComputeFormFields);

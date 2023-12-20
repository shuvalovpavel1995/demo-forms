import React, {useMemo} from 'react';

import {useForm, Field, useField} from 'react-final-form';
import {Button, Card, Checkbox, RadioButton, Select, TextInput} from '@gravity-ui/uikit';

import {useFieldArray} from 'react-final-form-arrays';

import {block} from '../utils/cn';
import {computeConfig} from '../../mocks/configs';

import './Form.scss';

const b = block('form-block');

interface Option {
    value: string;
    content: string;
}

export interface ComputeConfiguration {
    type: 'compute';
    osProduct: string;
    platform: string;
    cores: number;
    gpuCores?: number;
    memory: number;
    preemptible?: boolean;
    network?: boolean;
    traffic: number;
    disks: Option[];
}

export interface K8sConfiguration {
    type: 'k8s';
    name: string;
}

export interface ComputeFormFieldsValues {
    blocks: {
        configurations: (K8sConfiguration | ComputeConfiguration)[];
    }[];
}

export interface ComputeFormFieldsProps {
    fieldName: string;
    platforms: typeof computeConfig.platforms;
    osProducts: Option[];
    diskTypes: Option[];
}

const ComputeFormFields = ({
    fieldName,
    platforms,
    osProducts,
    diskTypes,
}: ComputeFormFieldsProps) => {
    const form = useForm<ComputeFormFieldsValues>();
    const platformInput = useField<string[], HTMLElement, string[]>(`${fieldName}.platform`, form);
    const platform = platformInput.input.value[0];

    const gpuPlatforms = React.useMemo(() => platforms.map(({id}) => id), [platforms]);

    const rejectPreemptible = React.useMemo(
        () => Boolean(platforms.find(({id}) => id === platform)?.rejectPreemptible),
        [platforms, platform],
    );

    const {fields} = useFieldArray<Option>(`${fieldName}.disks`);

    const gpuCoresOptions = useMemo(
        () =>
            (platforms.find(({id}) => id === platform)?.allowedConfigurations ?? []).map(
                ({gpus}) => ({
                    content: String(gpus),
                    value: String(gpus),
                }),
            ),
        [platform, platforms],
    );

    return (
        <React.Fragment>
            <div>
                osProduct&nbsp;
                <Field name={`${fieldName}.osProduct`}>
                    {(fieldProps) => (
                        <Select
                            {...fieldProps}
                            value={fieldProps.input.value}
                            onUpdate={fieldProps.input.onChange}
                            options={osProducts}
                        />
                    )}
                </Field>
            </div>
            <div>
                Platform&nbsp;
                <Field name={`${fieldName}.platform`}>
                    {(fieldProps) => (
                        <Select
                            {...fieldProps}
                            value={fieldProps.input.value}
                            onUpdate={fieldProps.input.onChange}
                            options={platforms.map(({id: value, name: content}) => ({
                                content,
                                value,
                            }))}
                        />
                    )}
                </Field>
            </div>

            {gpuPlatforms.includes(platform) && (
                <div>
                    Gpu Cores&nbsp;
                    <Field name={`${fieldName}.gpuCores`}>
                        {(fieldProps) => (
                            <RadioButton
                                {...fieldProps}
                                value={fieldProps.input.value}
                                onUpdate={fieldProps.input.onChange}
                                options={gpuCoresOptions}
                            />
                        )}
                    </Field>
                </div>
            )}
            <div>
                Cores&nbsp;
                <Field name={`${fieldName}.cores`}>
                    {(fieldProps) => (
                        <TextInput
                            {...fieldProps}
                            value={fieldProps.input.value}
                            onUpdate={fieldProps.input.onChange}
                        />
                    )}
                </Field>
            </div>
            <div>
                Memory&nbsp;
                <Field name={`${fieldName}.memory`}>
                    {(fieldProps) => (
                        <TextInput
                            {...fieldProps}
                            value={fieldProps.input.value}
                            onUpdate={fieldProps.input.onChange}
                        />
                    )}
                </Field>
            </div>
            <div>
                <Field name={`${fieldName}.preemptible`}>
                    {(fieldProps) => (
                        <Checkbox
                            checked={fieldProps.input.value}
                            size="l"
                            onUpdate={fieldProps.input.onChange}
                            disabled={rejectPreemptible}
                        >
                            &nbsp;Preemptible&nbsp;
                        </Checkbox>
                    )}
                </Field>
            </div>
            <div>
                <Field name={`${fieldName}.network`}>
                    {(fieldProps) => (
                        <Checkbox
                            checked={fieldProps.input.value}
                            size="l"
                            onUpdate={fieldProps.input.onChange}
                        >
                            &nbsp;Network&nbsp;
                        </Checkbox>
                    )}
                </Field>
            </div>
            <div>
                <div>
                    Disk&nbsp;
                    <Button
                        size={'m'}
                        onClick={() => form.mutators.push(`${fieldName}.disks`, {})}
                        view="action"
                    >
                        Add new disk
                    </Button>
                </div>
                {fields.map((disk) => (
                    <Card type="container" view="outlined" key={disk} className={b('card')}>
                        <div>
                            Disk type&nbsp;
                            <Field name={`${disk}.type`}>
                                {(fieldProps) => (
                                    <Select
                                        {...fieldProps}
                                        value={fieldProps.input.value}
                                        onUpdate={fieldProps.input.onChange}
                                        options={diskTypes}
                                    />
                                )}
                            </Field>
                        </div>
                        <div>
                            Disk size&nbsp;
                            <Field name={`${disk}.size`}>
                                {(fieldProps) => (
                                    <TextInput
                                        {...fieldProps}
                                        value={fieldProps.input.value}
                                        onUpdate={fieldProps.input.onChange}
                                    />
                                )}
                            </Field>
                        </div>
                    </Card>
                ))}
            </div>
        </React.Fragment>
    );
};

export default ComputeFormFields;

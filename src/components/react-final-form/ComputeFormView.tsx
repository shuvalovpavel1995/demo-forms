import React, {Fragment, useCallback, useMemo} from 'react';

import {Button, Card, Checkbox, RadioButton, Select, TextInput} from '@gravity-ui/uikit';
import {FieldState} from 'final-form';
import _ from 'lodash';
import {Field, FieldRenderProps, useField, useForm} from 'react-final-form';
import {useFieldArray} from 'react-final-form-arrays';

import {computeConfig} from '../../mocks/configs';
import {FormFieldsValues, Option} from '../../types';
import {block} from '../utils/cn';
import {
    composeValidators,
    minValue,
    mustBeNumber,
    osAvaliable,
    required,
} from '../utils/validators';

import './Form.scss';

const b = block('form-block');

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
    const form = useForm<FormFieldsValues>();
    const platformInput = useField<string[], HTMLElement, string[]>(`${fieldName}.platform`, form);
    const platform = platformInput.input.value[0];

    const gpuPlatforms = React.useMemo(() => platforms.map(({id}) => id), [platforms]);

    const rejectPreemptible = React.useMemo(
        () => Boolean(platforms.find(({id}) => id === platform)?.rejectPreemptible),
        [platforms, platform],
    );

    const {fields} = useFieldArray<Option>(`${fieldName}.disks`, {
        subscription: {submitting: true, pristine: true},
    });

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

    const memoryValidate = useCallback(
        (value: string, allValues: FormFieldsValues, state: FieldState<string>) => {
            const path = state.name?.replace('.memory', '');
            const values = _.get(allValues, path);

            if (
                (Number(value) < 0 || Number(value) > 500) &&
                values.platform?.includes('gpu-h100')
            ) {
                return 'Only 0-500 avaliable for gpu-h100 platform';
            }

            if (
                (Number(value) < 500 || Number(value) > 1000) &&
                values.platform?.includes('gpu-standard-v3')
            ) {
                return 'Only 500-1000 avaliable for gpu-standard-v3 platform';
            }

            if (
                (Number(value) < 1000 || Number(value) > 5000) &&
                values.platform?.includes('standard-v2')
            ) {
                return 'Only 1000-5000 avaliable for gpu-standard-v3 platform';
            }
            return undefined;
        },
        [],
    );

    return (
        <React.Fragment>
            <div>
                OS Product&nbsp;
                <Field name={`${fieldName}.osProduct`} validate={osAvaliable}>
                    {(fieldProps: FieldRenderProps<string[], HTMLElement, string[]>) => {
                        return (
                            <Fragment>
                                <Select
                                    {...fieldProps}
                                    value={fieldProps.input.value}
                                    onUpdate={fieldProps.input.onChange}
                                    options={osProducts}
                                    error={
                                        fieldProps.meta.error &&
                                        !fieldProps.meta.pristine &&
                                        fieldProps.meta.error[0]
                                    }
                                />
                            </Fragment>
                        );
                    }}
                </Field>
            </div>
            <div>
                Platform&nbsp;
                <Field name={`${fieldName}.platform`} validate={required}>
                    {(fieldProps: FieldRenderProps<string, HTMLElement, string[]>) => (
                        <Fragment>
                            <Select
                                {...fieldProps}
                                value={fieldProps.input.value}
                                onUpdate={fieldProps.input.onChange}
                                options={platforms.map(({id: value, name: content}) => ({
                                    content,
                                    value,
                                }))}
                                error={
                                    fieldProps.meta.error &&
                                    !fieldProps.meta.pristine &&
                                    fieldProps.meta.error[0]
                                }
                            />
                        </Fragment>
                    )}
                </Field>
            </div>

            {gpuPlatforms.includes(platform) && (
                <div>
                    Gpu Cores&nbsp;
                    <Field name={`${fieldName}.gpuCores`} validate={required}>
                        {(fieldProps) => (
                            <Fragment>
                                <RadioButton
                                    {...fieldProps}
                                    value={fieldProps.input.value}
                                    onUpdate={fieldProps.input.onChange}
                                    options={gpuCoresOptions}
                                />

                                {fieldProps.meta.error && !fieldProps.meta.pristine && (
                                    <span className={b('error')}>{fieldProps.meta.error}</span>
                                )}
                            </Fragment>
                        )}
                    </Field>
                </div>
            )}
            <div>
                Cores&nbsp;
                <Field
                    name={`${fieldName}.cores`}
                    validate={composeValidators(required, mustBeNumber, minValue(1))}
                >
                    {(fieldProps: FieldRenderProps<string, HTMLElement, string>) => (
                        <Fragment>
                            <TextInput
                                {...fieldProps}
                                value={fieldProps.input.value}
                                onUpdate={fieldProps.input.onChange}
                                error={fieldProps.meta.error && !fieldProps.meta.pristine}
                                errorMessage={fieldProps.meta.error}
                            />
                        </Fragment>
                    )}
                </Field>
            </div>
            <div>
                Memory&nbsp;
                <Field name={`${fieldName}.memory`} validate={memoryValidate}>
                    {(fieldProps: FieldRenderProps<string, HTMLElement, string>) => (
                        <Fragment>
                            <TextInput
                                {...fieldProps}
                                value={fieldProps.input.value}
                                onUpdate={fieldProps.input.onChange}
                                error={fieldProps.meta.error && !fieldProps.meta.pristine}
                                errorMessage={fieldProps.meta.error}
                            />
                        </Fragment>
                    )}
                </Field>
            </div>
            <div>
                <Field name={`${fieldName}.preemptible`}>
                    {(fieldProps: FieldRenderProps<boolean, HTMLElement, boolean>) => (
                        <Fragment>
                            <Checkbox
                                checked={fieldProps.input.value}
                                size="l"
                                onUpdate={fieldProps.input.onChange}
                                disabled={rejectPreemptible}
                            >
                                &nbsp;Preemptible&nbsp;
                            </Checkbox>
                        </Fragment>
                    )}
                </Field>
            </div>
            <div>
                <Field name={`${fieldName}.network`}>
                    {(fieldProps: FieldRenderProps<boolean, HTMLElement, boolean>) => (
                        <Fragment>
                            <Checkbox
                                checked={fieldProps.input.value}
                                size="l"
                                onUpdate={fieldProps.input.onChange}
                            >
                                &nbsp;Network&nbsp;
                            </Checkbox>
                        </Fragment>
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
                            <Field name={`${disk}.type`} validate={required}>
                                {(fieldProps: FieldRenderProps<string, HTMLElement, string[]>) => (
                                    <Fragment>
                                        <Select
                                            {...fieldProps}
                                            value={fieldProps.input.value}
                                            onUpdate={fieldProps.input.onChange}
                                            options={diskTypes}
                                            error={
                                                fieldProps.meta.error &&
                                                !fieldProps.meta.pristine &&
                                                fieldProps.meta.error[0]
                                            }
                                        />
                                    </Fragment>
                                )}
                            </Field>
                        </div>
                        <div>
                            Disk size&nbsp;
                            <Field name={`${disk}.size`} validate={required}>
                                {(fieldProps: FieldRenderProps<string, HTMLElement, string>) => (
                                    <Fragment>
                                        <TextInput
                                            {...fieldProps}
                                            value={fieldProps.input.value}
                                            onUpdate={fieldProps.input.onChange}
                                            error={
                                                fieldProps.meta.error && !fieldProps.meta.pristine
                                            }
                                            errorMessage={fieldProps.meta.error}
                                        />
                                    </Fragment>
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

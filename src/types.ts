export interface Option {
    value: string;
    content: string;
}

export interface DiskType {
    type: string[];
    size: string;
}

export interface ComputeConfiguration {
    type: 'compute';
    osProduct: string[];
    platform: string[];
    cores: string;
    gpuCores?: string;
    memory: string;
    preemptible?: boolean;
    network?: boolean;
    traffic: number;
    disks: DiskType[];
}

export interface K8sConfiguration {
    type: 'k8s';
    name: string;
}

export type ConfigurationType = K8sConfiguration | ComputeConfiguration;

export function isComputeConfiguration(
    configuration: ConfigurationType,
): configuration is ComputeConfiguration {
    return (configuration as ComputeConfiguration).type === 'compute';
}

export interface FormFieldsValues {
    blocks: {
        configurations: ConfigurationType[];
    }[];
}

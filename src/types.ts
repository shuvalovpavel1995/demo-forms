export interface Option {
    value: string;
    content: string;
}

export interface ComputeConfiguration {
    type: 'compute';
    osProduct: string[];
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

export type ConfigurationType = K8sConfiguration | ComputeConfiguration;

export interface FormFieldsValues {
    blocks: {
        configurations: ConfigurationType[];
    }[];
}

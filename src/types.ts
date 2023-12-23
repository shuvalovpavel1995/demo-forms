export interface Option {
    value: string;
    content: string;
}

export interface ComputeConfiguration {
    type: 'compute';
    osProduct: string[];
    platform: string[];
    cores: string;
    gpuCores?: number;
    memory: string;
    preemptible?: boolean;
    network?: boolean;
    traffic: number;
    disks: {
        type: string[];
        size: string;
    }[];
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

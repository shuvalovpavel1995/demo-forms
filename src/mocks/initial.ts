import {FormFieldsValues} from '../types';

export const initialState = {
    blocks: [
        {
            configurations: [
                {
                    type: 'compute',
                    disks: [
                        {
                            type: ['network-ssd-io-m3'],
                            size: '123',
                        },
                        {
                            type: ['network-ssd-io-m3'],
                            size: '12341234',
                        },
                    ],
                    osProduct: ['1'],
                    platform: ['gpu-standard-v3'],
                    cores: '2012123123123',
                    memory: '5001',
                    preemptible: true,
                    network: true,
                },
            ],
        },
        {
            configurations: [
                {
                    type: 'k8s',
                    name: 'asdfasdf',
                },
            ],
        },
    ],
} as FormFieldsValues;

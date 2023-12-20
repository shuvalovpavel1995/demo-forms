export const computeConfig = {
    osProducts: [
        {
            content: 'Ubuntu',
            value: '1',
        },
        {
            content: 'Windows',
            value: '2',
        },
    ],
    platforms: [
        {
            allowedConfigurations: [{gpus: '1'}, {gpus: '2'}, {gpus: '4'}, {gpus: '8'}],

            id: 'gpu-h100',
            name: 'Intel Sapphire Rapids with NVIDIA® Hopper® H100',
            rejectPreemptible: true,
        },
        {
            allowedConfigurations: [{gpus: '1'}, {gpus: '4'}],

            id: 'gpu-standard-v3',
            name: 'AMD EPYC™ with NVIDIA® Ampere® A100',
            rejectPreemptible: true,
        },
        {
            allowedConfigurations: [{gpus: '1'}],

            id: 'standard-v2',
            name: 'Intel Cascade Lake',
            rejectPreemptible: false,
        },
    ],
    diskTypes: [
        {value: 'network-hdd', content: 'Network storage with HDD backend'},
        {value: 'network-ssd', content: 'Network storage with SSD backend'},
        {
            value: 'network-ssd-io-m3',
            content: 'Fast network storage with three replicas',
        },
        {
            value: 'network-ssd-nonreplicated',
            content: 'Non-replicated network storage with SSD backend',
        },
    ],
};

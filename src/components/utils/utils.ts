export const defaultMemoryByPlatform = (platform: string) => {
    if (platform === 'gpu-h100') {
        return '1';
    }
    if (platform === 'gpu-standard-v3') {
        return '501';
    }
    if (platform === 'standard-v2') {
        return '1001';
    }

    return '5001';
};

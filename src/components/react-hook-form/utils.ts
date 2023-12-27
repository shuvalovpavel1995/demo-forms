import {simpleMemoize, sleep} from '../utils/validators';

export const osAvaliable = simpleMemoize(async (value?: string[]) => {
    if (!value) {
        return 'Required';
    }
    await sleep(400);
    if (value.includes('2')) {
        return 'Not avaliable OS!';
    }

    return undefined;
});

export const simpleMemoize = (fn: (arg?: string[]) => Promise<string[] | string | undefined>) => {
    let lastArg: string[] | undefined;
    let lastResult: Promise<string[] | string | undefined>;
    return (arg?: string[]) => {
        if (arg?.[0] !== lastArg?.[0]) {
            lastArg = arg;
            lastResult = fn(arg);
        }
        return lastResult;
    };
};
export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const required = (value: unknown) => (value ? undefined : 'Required');

export const mustBeNumber = (value: unknown) =>
    isNaN(Number(value)) ? 'Must be a number' : undefined;

export const minValue = (min: number) => (value: unknown) =>
    isNaN(Number(value)) || Number(value) >= min ? undefined : `Should be greater than ${min}`;

export const osAvaliable = simpleMemoize(async (value?: string[]) => {
    if (!value) {
        return ['Required'];
    }
    await sleep(400);
    if (value.includes('2')) {
        return ['Not avaliable OS!'];
    }

    return undefined;
});

export const composeValidators =
    (...validators: ((value: unknown) => string | undefined)[]) =>
    (value: unknown) =>
        validators.reduce<string | undefined>(
            (error: string | undefined, validator) => error || validator(value),
            undefined,
        );

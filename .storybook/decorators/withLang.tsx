import React from 'react';

import type {DecoratorFn} from '@storybook/react';



export const withLang: DecoratorFn = (Story, context) => {
    const lang = context.globals.lang;

    return <Story key={lang} {...context} />;
};

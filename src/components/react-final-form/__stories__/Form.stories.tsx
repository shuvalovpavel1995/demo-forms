import React from 'react';

import type {Meta, StoryObj} from '@storybook/react';

import {Form} from '../Form';

export default {
    title: 'Components/FinalForm',
    component: Form,
} as Meta;

type Story = StoryObj<typeof Form>;

export const Size: Story = {
    render: (args) => <Form {...args} />,
};

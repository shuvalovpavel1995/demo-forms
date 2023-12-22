import React from 'react';

import type {Meta, StoryObj} from '@storybook/react';

import {Form} from '../Form';

export default {
    title: 'ReactHookForm',
    component: Form,
} as Meta;

type Story = StoryObj<typeof Form>;

export const Default: Story = {
    render: (args) => <Form {...args} />,
};

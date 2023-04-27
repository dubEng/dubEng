import type { Meta, StoryObj } from '@storybook/react';

import Background from './Background';

const meta: Meta<typeof Background> = {
    title: 'components/atoms/Background',
    component: Background,
  };

export default meta;

type Story = StoryObj<typeof Background>;

export const Default: Story = {
    render: () => <Background onClick={() => {}} />,
};
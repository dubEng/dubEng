import type { Meta, StoryObj } from '@storybook/react';

import DubProductList from "./DubProductList";

const meta: Meta<typeof DubProductList> = {
    title: 'features/home/organism/DubProductList',
    component: DubProductList,
  };

export default meta;

type Story = StoryObj<typeof DubProductList>;

export const Default: Story = {
    render: () => <DubProductList />,
};
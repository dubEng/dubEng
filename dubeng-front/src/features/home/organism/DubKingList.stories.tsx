import type { Meta, StoryObj } from '@storybook/react';

import DubKingList from "./DubKingList";

const meta: Meta<typeof DubKingList> = {
    title: 'features/home/organism/DubKingList',
    component: DubKingList,
  };

export default meta;

type Story = StoryObj<typeof DubKingList>;

export const Default: Story = {
    render: () => <DubKingList />,
};
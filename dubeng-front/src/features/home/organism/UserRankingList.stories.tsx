import type { Meta, StoryObj } from '@storybook/react';

import UserRankingList from "./UserRankingList";

const meta: Meta<typeof UserRankingList> = {
    title: 'features/home/organism/UserRankingList',
    component: UserRankingList,
  };

export default meta;

type Story = StoryObj<typeof UserRankingList>;

export const Default: Story = {
    render: () => <UserRankingList />,
};
import type { Meta, StoryObj } from '@storybook/react';

import DubKingItem from './DubKingItem';
import ProfileOne from '../../../../public/images/dump/profile_01.svg';
import ProfileTwo from '../../../../public/images/dump/profile_02.svg';
import ProfileThree from '../../../../public/images/dump/profile_03.svg';

const meta: Meta<typeof DubKingItem> = {
    title: 'features/home/molecules/DubKingItem',
    component: DubKingItem,
  };

export default meta;

type Story = StoryObj<typeof DubKingItem>;

export const Gold: Story = {
  args: {
    ranking: 1,
    nickname: "김언도",
    totalCount: 38560,
    dubKingImageUrl: ProfileOne
  },
};
export const Sliver: Story = {
  args: {
    ranking: 2,
    nickname: "김언도",
    totalCount: 3856,
    dubKingImageUrl: ProfileTwo
  },
};
export const Bronze: Story = {
  args: {
    ranking: 3,
    nickname: "김언도",
    totalCount: 385,
    dubKingImageUrl: ProfileThree
  },
};

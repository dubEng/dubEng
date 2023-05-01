import type { Meta, StoryObj } from '@storybook/react';

import UserRankingListItem from './UserRankingListItem';
import ProfileOne from '../../../../public/images/dump/profile_01.svg';
import ProfileTwo from '../../../../public/images/dump/profile_02.svg';
import ProfileThree from '../../../../public/images/dump/profile_03.svg';
import ProfileFour from '../../../../public/images/dump/profile_04.svg';
import ProfileFive from '../../../../public/images/dump/profile_05.svg';

const meta: Meta<typeof UserRankingListItem> = {
    title: 'features/home/molecules/UserRankingListItem',
    component: UserRankingListItem,
  };

export default meta;

type Story = StoryObj<typeof UserRankingListItem>;

export const RankingOne: Story = {
  args: {
    ranking: 1,
    imageUrl: ProfileOne,
    nickname: "김언도",
    introduce: "안녕하세요, 언도입니다.",
    recordingTime: 10,
    dubingCount: 53
  },
};

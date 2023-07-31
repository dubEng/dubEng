import type { Meta, StoryObj } from "@storybook/react";

import VoteCard from "./VoteCard";

const meta: Meta<typeof VoteCard> = {
  title: "features/community/molecules/VoteCard",
  component: VoteCard,
};

export default meta;

type Story = StoryObj<typeof VoteCard>;

export const Default: Story = {
  render: () => (
    <VoteCard
      username={"언도"}
      description={"김도언의 한 줄 소개 입니다."}
      userImage={
        "https://i.pinimg.com/236x/80/fc/65/80fc651f056eb580f743ecd939fbd2f0.jpg"
      }
      isPlaying={false}
      onClick={() => {}}
    />
  ),
};

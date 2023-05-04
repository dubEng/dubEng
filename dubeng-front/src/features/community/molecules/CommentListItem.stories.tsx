import type { Meta, StoryObj } from "@storybook/react";

import CommentListItem from "./CommentListItem";

const meta: Meta<typeof CommentListItem> = {
  title: "features/community/molecules/CommentListItem",
  component: CommentListItem,
};

export default meta;

type Story = StoryObj<typeof CommentListItem>;

export const Default: Story = {
  render: () => (
    <CommentListItem
      userId={"1"}
      nickName={"언도더씨"}
      userImage={
        "https://i.pinimg.com/236x/80/fc/65/80fc651f056eb580f743ecd939fbd2f0.jpg"
      }
      content={
        "잘 봤습니다. 정말 멋지네요. 가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하"
      }
      updatedDate={"11분"}
    />
  ),
};

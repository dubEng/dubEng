import type { Meta, StoryObj } from "@storybook/react";

import CommentInputBox from "./CommentInputBox";

const meta: Meta<typeof CommentInputBox> = {
  title: "features/community/molecules/CommentInputBox",
  component: CommentInputBox,
};

export default meta;

type Story = StoryObj<typeof CommentInputBox>;

export const Default: Story = {
  args: {
    value: "",
  },
};
export const TextInput: Story = {
  args: {
    value: "댓글을 입력한 상태입니다.",
  },
};

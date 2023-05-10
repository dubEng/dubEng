import type { Meta, StoryObj } from "@storybook/react";

import CommentTaskButton from "./CommentTaskButton";

const meta: Meta<typeof CommentTaskButton> = {
  title: "features/community/molecules/CommentTaskButton",
  component: CommentTaskButton,
};

export default meta;

type Story = StoryObj<typeof CommentTaskButton>;

export const Default: Story = {
  render: () => <CommentTaskButton />,
};

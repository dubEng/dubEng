import type { Meta, StoryObj } from "@storybook/react";

import VoteButton from "./VoteButton";

const meta: Meta<typeof VoteButton> = {
  title: "features/community/atoms/VoteButton",
  component: VoteButton,
};

export default meta;

type Story = StoryObj<typeof VoteButton>;

export const Default: Story = {
  render: () => <VoteButton isSelected={false} onClick={() => {}} />,
};

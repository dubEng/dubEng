import type { Meta, StoryObj } from "@storybook/react";

import DubProductTaskButton from "./DubProductTaskButton";

const meta: Meta<typeof DubProductTaskButton> = {
  title: "features/community/molecules/DubProductTaskButton",
  component: DubProductTaskButton,
};

export default meta;

type Story = StoryObj<typeof DubProductTaskButton>;

export const Default: Story = {
  render: () => <DubProductTaskButton />,
};

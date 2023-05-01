import type { Meta, StoryObj } from "@storybook/react";

import DubButton from "./DubButton";

const meta: Meta<typeof DubButton> = {
  title: "components/atoms/DubButton",
  component: DubButton,
};

export default meta;

type Story = StoryObj<typeof DubButton>;

export const Default: Story = {
  args: {
    page: "/community/shorts",
  },
};
export const Others: Story = {
  args: {
    page: "/others",
  },
};

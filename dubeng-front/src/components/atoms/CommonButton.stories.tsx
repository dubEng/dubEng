import type { Meta, StoryObj } from "@storybook/react";

import CommonButton from "./CommonButton";

const meta: Meta<typeof CommonButton> = {
  title: "components/atoms/CommonButton",
  component: CommonButton,
};

export default meta;

type Story = StoryObj<typeof CommonButton>;

export const Default: Story = {
  render: () => <CommonButton isDisabled={true} children="아무거나" />,
};

import type { Meta, StoryObj } from "@storybook/react";

import CommonButton from "./CommonButton";

const meta: Meta<typeof CommonButton> = {
  title: "components/atoms/CommonButton",
  component: CommonButton,
};

export default meta;

type Story = StoryObj<typeof CommonButton>;

export const Default: Story = {
<<<<<<< HEAD
  render: () => <CommonButton />,
=======
  render: () => <CommonButton isDisabled={true} children="저장하기" onClick={() => {}} />,
>>>>>>> develop-front
};

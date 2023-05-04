import type { Meta, StoryObj } from "@storybook/react";

import CategoryButton from "./CategoryButton";

const meta: Meta<typeof CategoryButton> = {
  title: "features/community/atoms/CategoryButton",
  component: CategoryButton,
};

export default meta;

type Story = StoryObj<typeof CategoryButton>;

export const Default: Story = {
  render: () => (
    <CategoryButton
      id={1}
      name={"애니메이션"}
      isSelected={true}
      onClick={() => {}}
    />
  ),
};

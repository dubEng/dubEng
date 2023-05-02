import type { Meta, StoryObj } from "@storybook/react";

import TagButton from "./TagButton";

const meta: Meta<typeof TagButton> = {
  title: "components/atoms/TagButton",
  component: TagButton,
};

export default meta;

type Story = StoryObj<typeof TagButton>;

export const Default: Story = {
  render: () => <TagButton id={1} isSelected={true} name="TagButton" onClick={()=>{}} />,
};

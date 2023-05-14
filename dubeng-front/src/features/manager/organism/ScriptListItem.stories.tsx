import type { Meta, StoryObj } from "@storybook/react";

import ScriptListItem from "./ScriptListItem";

const meta: Meta<typeof ScriptListItem> = {
  title: "features/manager/organism/ScriptListItem",
  component: ScriptListItem,
};

export default meta;

type Story = StoryObj<typeof ScriptListItem>;

export const Default: Story = {
  render: () => (
    <ScriptListItem
      start={0}
      text="aaa"
      duration={10}
      translation=""
      handleListenScript={() => {}}
    />
  ),
};

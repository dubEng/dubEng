import type { Meta, StoryObj } from "@storybook/react";

import ScriptListItem from "./ScriptListItem";

const meta: Meta<typeof ScriptListItem> = {
  title: "features/manager/organism/ScriptListItem",
  component: ScriptListItem,
};

export default meta;

type Story = StoryObj<typeof ScriptListItem>;

export const Default: Story = {
<<<<<<< HEAD:dubeng-front/src/features/manager/organism/ScriptListIem.stories.tsx
  render: () => <ScriptListItem />,
=======
  render: () => (
    <ScriptListItem
      start={0}
      text="aaa"
      duration={10}
      translation=""
      handleListenScript={() => {}}
    />
  ),
>>>>>>> develop-front:dubeng-front/src/features/manager/organism/ScriptListItem.stories.tsx
};

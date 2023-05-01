import type { Meta, StoryObj } from "@storybook/react";

import MissionList from "./MissionList";

const meta: Meta<typeof MissionList> = {
  title: "features/mission/atoms/MissionList",
  component: MissionList,
};

export default meta;

type Story = StoryObj<typeof MissionList>;

export const Default: Story = {
  render: () => <MissionList  />,
};

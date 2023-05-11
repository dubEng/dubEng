import type { Meta, StoryObj } from "@storybook/react";

import MissionListItem from "./MissionListItem";
import MissionImageOne from "../../../../public/images/dump/mission_image_01.svg";

const meta: Meta<typeof MissionListItem> = {
  title: "features/mission/atoms/MissionListItem",
  component: MissionListItem,
};

export default meta;

type Story = StoryObj<typeof MissionListItem>;

export const Default: Story = {
  render: () => <MissionListItem color="#A6BAF5" imageUrl={MissionImageOne} missionContent="미션내용입니다." />,
};
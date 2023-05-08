import type { Meta, StoryObj } from "@storybook/react";
import DubVideoListItem from "./DubVideoListItem";

const meta: Meta<typeof DubVideoListItem> = {
  title: "components/molecules/DubVideoListItem",
  component: DubVideoListItem,
};

export default meta;

type Story = StoryObj<typeof DubVideoListItem>;

export const Default: Story = {
  render: () => (
    <DubVideoListItem
      id={1}
      title={"제목입니다. 길어져서 2줄이 "}
      thumbnail={""}
      runtime={"2분 11초"}
    />
  ),
};

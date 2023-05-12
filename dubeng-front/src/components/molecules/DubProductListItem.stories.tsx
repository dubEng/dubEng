import type { Meta, StoryObj } from "@storybook/react";
import DubProductListItem from "./DubProductListItem";
import WeBareBears from "../../../public/images/dump/webarebears_image.png";
import profileImg from "../../../public/images/dump/profile_01.svg";

const meta: Meta<typeof DubProductListItem> = {
  title: "components/molecules/DubProductListItem",
  component: DubProductListItem,
};

export default meta;

type Story = StoryObj<typeof DubProductListItem>;

export const Default: Story = {
  render: () => (
    <DubProductListItem
      recordId={0}
      title={"길어져서 2줄이 되면 어떻게 도나요 최대로 "}
      thumbnail={""}
      runtime={10}
      imageUrl={profileImg}
      nickname={"언도"}
      playCount={10}
      createdDate={"11분"}
      id={0}
    />
  ),
};

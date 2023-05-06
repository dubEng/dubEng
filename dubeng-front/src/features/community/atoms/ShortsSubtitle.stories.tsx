import type { Meta, StoryObj } from "@storybook/react";

import ShortsSubtitle from "./ShortsSubtitle";

const meta: Meta<typeof ShortsSubtitle> = {
  title: "features/community/atoms/ShortsSubtitle",
  component: ShortsSubtitle,
};

export default meta;

type Story = StoryObj<typeof ShortsSubtitle>;

export const Default: Story = {
  render: () => (
    <ShortsSubtitle
      content={"Hi, my name is Doeon."}
      contentTranslate={"안녕, 내 이름은 언도야. 중앙 정렬이 되는지 확인 좀"}
    />
  ),
};

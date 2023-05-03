import type { Meta, StoryObj } from "@storybook/react";

import SearchInputBox from "./SearchInputBox";

const meta: Meta<typeof SearchInputBox> = {
  title: "features/community/atoms/SearchInputBox",
  component: SearchInputBox,
};

export default meta;

type Story = StoryObj<typeof SearchInputBox>;

export const Default: Story = {
  args: {
    value: "",
  },
};
export const TextInput: Story = {
  args: {
    value: "더빙할 콘텐츠 검색 중",
  },
};

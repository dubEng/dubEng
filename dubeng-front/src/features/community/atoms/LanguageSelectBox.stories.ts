import type { Meta, StoryObj } from "@storybook/react";

import LanguageSelectBox from "./LanguageSelectBox";
import { LangType } from "../../../enum/statusType";

const meta: Meta<typeof LanguageSelectBox> = {
  title: "features/community/atoms/LanguageSelectBox",
  component: LanguageSelectBox,
};

export default meta;

type Story = StoryObj<typeof LanguageSelectBox>;

export const ENGLISH: Story = {
  args: {
    langType: LangType.ENGLISH,
  },
};
export const KOREAN: Story = {
  args: {
    langType: LangType.KOREAN,
  },
};

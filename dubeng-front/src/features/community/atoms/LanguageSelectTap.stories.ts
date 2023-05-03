import type { Meta, StoryObj } from "@storybook/react";

import LanguageSelectTap from "./LanguageSelectTap";
import { LangType } from "../../../enum/statusType";

const meta: Meta<typeof LanguageSelectTap> = {
  title: "features/community/atoms/LanguageSelectTap",
  component: LanguageSelectTap,
};

export default meta;

type Story = StoryObj<typeof LanguageSelectTap>;

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

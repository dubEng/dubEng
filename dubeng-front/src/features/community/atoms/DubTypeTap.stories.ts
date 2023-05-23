import type { Meta, StoryObj } from "@storybook/react";

import DubTypeTap from "./DubTypeTap";
import { DubType } from "../../../enum/statusType";

const meta: Meta<typeof DubTypeTap> = {
  title: "features/community/atoms/DubTypeTap",
  component: DubTypeTap,
};

export default meta;

type Story = StoryObj<typeof DubTypeTap>;

export const DUB_VIDEO: Story = {
  args: {
    dubType: DubType.DUB_VIDEO,
  },
};
export const DUB_PRODUCT: Story = {
  args: {
    dubType: DubType.DUB_PRODUCT,
  },
};

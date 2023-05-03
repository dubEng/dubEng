import type { Meta, StoryObj } from "@storybook/react";

import EmptyComponent from "./EmptyComponent";
import { EmptyType } from "../../enum/statusType";

const meta: Meta<typeof EmptyComponent> = {
  title: "components/atoms/EmptyComponent",
  component: EmptyComponent,
};

export default meta;

type Story = StoryObj<typeof EmptyComponent>;

export const EMPTY_DUB_PRODUCT: Story = {
  args: {
    status: EmptyType.EMPTY_DUB_PRODUCT,
  },
};
export const EMPTY_LIKE_DUB_PRODUCT: Story = {
  args: {
    status: EmptyType.EMPTY_LIKE_DUB_PRODUCT,
  },
};
export const EMPTY_SCRAP_DUB_VIDEO: Story = {
  args: {
    status: EmptyType.EMPTY_SCRAP_DUB_VIDEO,
  },
};
export const EMPTY_COMMENT: Story = {
  args: {
    status: EmptyType.EMPTY_COMMENT,
  },
};
export const EMPTY_VOTE: Story = {
  args: {
    status: EmptyType.EMPTY_VOTE,
  },
};

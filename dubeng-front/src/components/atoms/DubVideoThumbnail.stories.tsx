import type { Meta, StoryObj } from "@storybook/react";

import DubVideoThumbnail from "./DubVideoThumbnail";

const meta: Meta<typeof DubVideoThumbnail> = {
  title: "components/atoms/DubVideoThumbnail",
  component: DubVideoThumbnail,
};

export default meta;

type Story = StoryObj<typeof DubVideoThumbnail>;

export const Default: Story = {
  render: () => (
    <DubVideoThumbnail
      title="New Year, New Bears | We Bare Bears"
      thumbnail=""
      id={1}
    />
  ),
};

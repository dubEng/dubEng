import type { Meta, StoryObj } from "@storybook/react";

import PlayBar from "./PlayBar";

const meta: Meta<typeof PlayBar> = {
  title: "features/dubbing/atoms/PlayBar",
  component: PlayBar,
};

export default meta;

type Story = StoryObj<typeof PlayBar>;

export const Default: Story = {
  render: () => (
    <PlayBar

    />
  ),
};

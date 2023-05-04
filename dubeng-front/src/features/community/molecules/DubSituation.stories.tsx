import type { Meta, StoryObj } from "@storybook/react";

import DubSituation from "./DubSituation";

const meta: Meta<typeof DubSituation> = {
  title: "features/community/molecules/DubSituation",
  component: DubSituation,
};

export default meta;

type Story = StoryObj<typeof DubSituation>;

export const Default: Story = {
  render: () => <DubSituation />,
};

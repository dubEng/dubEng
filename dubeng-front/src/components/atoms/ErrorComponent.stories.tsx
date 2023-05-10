import type { Meta, StoryObj } from "@storybook/react";

import ErrorComponent from "./ErrorComponent";

const meta: Meta<typeof ErrorComponent> = {
  title: "components/atoms/ErrorComponent",
  component: ErrorComponent,
};

export default meta;

type Story = StoryObj<typeof ErrorComponent>;

export const Default: Story = {
  render: () => <ErrorComponent onClick={() => {}} retry={false} />,
};

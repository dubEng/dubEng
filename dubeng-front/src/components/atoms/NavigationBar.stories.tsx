import type { Meta, StoryObj } from '@storybook/react';

import NavigationBar from "./NavigationBar";

const meta: Meta<typeof NavigationBar> = {
    title: 'components/atoms/NavigationBar',
    component: NavigationBar,
  };

export default meta;

type Story = StoryObj<typeof NavigationBar>;

export const Default: Story = {
    render: () => <NavigationBar />,
};
import type { Meta, StoryObj } from '@storybook/react';

import ListenButton from './ListenButton';

const meta: Meta<typeof ListenButton> = {
    title: 'features/dubbing/atoms/ListenButton',
    component: ListenButton,
  };

export default meta;

type Story = StoryObj<typeof ListenButton>;

export const DEFAULT: Story = {
  args: {
    soundStatus: "DEFAULT"
  },
};

export const PLAYING: Story = {
  args: {
    soundStatus: "PLAYING"
  },
};

export const DISABLE: Story = {
  args: {
    soundStatus: "DISABLE"
  },
};

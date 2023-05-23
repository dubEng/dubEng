import type { Meta, StoryObj } from '@storybook/react';

import PlayButton from './PlayButton';

const meta: Meta<typeof PlayButton> = {
    title: 'features/dubbing/atoms/PlayButton',
    component: PlayButton,
  };

export default meta;

type Story = StoryObj<typeof PlayButton>;

export const DEFAULT: Story = {
  args: {
    isPlaying: false
  },
};

export const ISPLAYING: Story = {
  args: {
    isPlaying: true
  },
};

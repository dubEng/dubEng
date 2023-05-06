import type { Meta, StoryObj } from '@storybook/react';

import RecordButton from './RecordButton';

const meta: Meta<typeof RecordButton> = {
    title: 'features/dubbing/atoms/RecordButton',
    component: RecordButton,
  };

export default meta;

type Story = StoryObj<typeof RecordButton>;

export const DEFAULT: Story = {
  args: {
    isRecording: false
  },
};

export const ISRECORDING: Story = {
  args: {
    isRecording: true
  },
};

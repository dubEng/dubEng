import type { Meta, StoryObj } from '@storybook/react';

import RecordingButton from './RecordingButton';

const meta: Meta<typeof RecordingButton> = {
    title: 'components/atoms/RecordingButton',
    component: RecordingButton,
  };

export default meta;

type Story = StoryObj<typeof RecordingButton>;

export const Others: Story = {
  args: {
    page: "/others"
  },
};
export const Dubbing: Story = {
  args: {
    page: "/dubbing"
  },
};
export const Shorts: Story = {
  args: {
    page: "/community/shorts"
  },
};
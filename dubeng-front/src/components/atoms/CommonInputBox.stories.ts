import type { Meta, StoryObj } from '@storybook/react';

import CommonInputBox from './CommonInputBox';

const meta: Meta<typeof CommonInputBox> = {
    title: 'components/atoms/CommonInputBox',
    component: CommonInputBox,
  };

export default meta;

type Story = StoryObj<typeof CommonInputBox>;

export const Default: Story = {
  args: {
    value: "",
  },
};
export const TextInput: Story = {
  args: {
    value: "텍스트를 입력한 상태입니다.",
  },
};

import type { Meta, StoryObj } from '@storybook/react';

import CheckMessage from './CheckMessage';
import {CheckMessageStatus} from "../../enum/statusType";

const meta: Meta<typeof CheckMessage> = {
    title: 'components/atoms/CheckMessage',
    component: CheckMessage,
  };

export default meta;

type Story = StoryObj<typeof CheckMessage>;

export const ISVALID: Story = {
  args: {
    status: CheckMessageStatus.ISVALID
  },
};
export const NICKNAME_DUPLICATION: Story = {
  args: {
    status: CheckMessageStatus.NICKNAME_DUPLICATION
  },
};
export const NICKNAME_LIMIT_SIX: Story = {
  args: {
    status: CheckMessageStatus.NICKNAME_LIMIT_SIX
  },
};
export const INTRODUCE_LIMIT_FIFTEEN: Story = {
  args: {
    status: CheckMessageStatus.INTRODUCE_LIMIT_FIFTEEN
  },
};
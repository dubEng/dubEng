import type { Meta, StoryObj } from '@storybook/react';
import { CommonAlertType} from "../../enum/statusType";

import CommonAlert from './CommonAlert';

const meta: Meta<typeof CommonAlert> = {
    title: 'components/molecules/CommonAlert',
    component: CommonAlert,
  };

export default meta;

type Story = StoryObj<typeof CommonAlert>;

export const DUBBING_OUT: Story = {
  args: {
    type: CommonAlertType.DUBBING_OUT
  },
};
export const COMMENT_DELETE: Story = {
  args: {
    type: CommonAlertType.COMMENT_DELETE
  },
};
export const CONTENTS_DELETE: Story = {
  args: {
    type: CommonAlertType.CONTENTS_DELETE
  },
};
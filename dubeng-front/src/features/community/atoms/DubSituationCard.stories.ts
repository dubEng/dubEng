import type { Meta, StoryObj } from "@storybook/react";

import DubSituationCard from "./DubSituationCard";
import { SituationType } from "../../../enum/statusType";

const meta: Meta<typeof DubSituationCard> = {
  title: "features/community/atoms/DubSituationCard",
  component: DubSituationCard,
};

export default meta;

type Story = StoryObj<typeof DubSituationCard>;

export const PLACE_1: Story = {
  args: {
    type: SituationType.PLACE_1,
  },
};

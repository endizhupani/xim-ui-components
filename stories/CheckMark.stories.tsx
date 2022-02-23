import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { CheckMark } from "../src";

export default {
	component: CheckMark,
} as ComponentMeta<typeof CheckMark>;
const Template: ComponentStory<typeof CheckMark> = (args) => (
	<CheckMark {...args}></CheckMark>
);
export const CheckIcon = Template.bind({});

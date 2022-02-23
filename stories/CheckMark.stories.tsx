import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { CheckMark, XimThemeProvider } from "../src";

export default {
	component: CheckMark,
} as ComponentMeta<typeof CheckMark>;
const Template: ComponentStory<typeof CheckMark> = (args) => (
	<XimThemeProvider>
		<CheckMark {...args}></CheckMark>
	</XimThemeProvider>
);
export const CheckIcon = Template.bind({});

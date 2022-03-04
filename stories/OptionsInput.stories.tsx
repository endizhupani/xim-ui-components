import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { OptionsInput, OptionsInputProps } from "../src";

export default {
	title: "OptionsInput",
	component: OptionsInput,
} as ComponentMeta<typeof OptionsInput>;

const defaultProps: Partial<OptionsInputProps> = {
	options: {
		"1": "Option 1",
		"2": "Option 2",
		"3": "Option 3",
	},
	value: "1",
	label: "Select an option",
	onChange: () => {},
};

const Template: ComponentStory<typeof OptionsInput> = (
	args: OptionsInputProps
) => <OptionsInput {...args} />;

export const DefaultOptionsInput = Template.bind({});
DefaultOptionsInput.args = {
	...defaultProps,
	disabled: false,
};

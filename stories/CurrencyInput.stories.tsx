import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { CurrencyInput, XimThemeProvider } from "../src";

export default {
	title: "Currency Input",
	component: CurrencyInput,
} as ComponentMeta<typeof CurrencyInput>;

const Template: ComponentStory<typeof CurrencyInput> = (args) => (
	<XimThemeProvider>
		<CurrencyInput {...args}></CurrencyInput>
	</XimThemeProvider>
);
export const CurrencyInputStory = Template.bind({});
CurrencyInputStory.args = {
	value: {
		amount: 100,
		amountFormatted: "$100.00",
		currencyCode: "USD",
	},
	defaultValue: {
		amount: 100,
		amountFormatted: "$100.00",
		currencyCode: "USD",
	},
	onValueChanged: (value) => {},
	error: "",
	label: "Currency Input",
	max: {
		amount: 500,
		amountFormatted: "$500.00",
		currencyCode: "USD",
	},
	hideControls: false,
};

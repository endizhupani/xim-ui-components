import { Typography } from "@mui/material";
import { ComponentMeta, ComponentStory } from "@storybook/react";

export default {
	title: "Titles",
	component: Typography,
} as ComponentMeta<typeof Typography>;

const Template: ComponentStory<typeof Typography> = (args) => (
	<Typography {...args}>Example Title</Typography>
);

export const TitlesStory = Template.bind({});
TitlesStory.args = {
	variant: "h1",
	color: "textPrimary",
	fontWeight: "",
};

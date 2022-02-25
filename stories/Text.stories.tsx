import { Typography } from "@mui/material";
import { ComponentMeta, ComponentStory } from "@storybook/react";

export default {
	title: "Text",
	component: Typography,
} as ComponentMeta<typeof Typography>;

const Template: ComponentStory<typeof Typography> = (args) => (
	<Typography {...args}>
		Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ligula
		velit, facilisis ut mi malesuada, fringilla accumsan ante. Vestibulum
		accumsan, mauris vel mollis placerat, dui justo scelerisque risus, ut
		commodo elit felis sed purus. Sed at congue est. Quisque velit eros,
		auctor sed rhoncus et, pellentesque eget ex. Nam ligula lacus, convallis
		eu condimentum id, ornare suscipit ipsum. Proin varius sagittis ante, ut
		ornare nulla mollis ultricies. Donec luctus tortor in enim eleifend, et
		luctus felis gravida. Ut euismod est ac blandit fermentum. Pellentesque
		tristique neque lorem, at venenatis lorem gravida in. Sed blandit
		vehicula augue quis posuere. Vivamus accumsan eros tincidunt, elementum
		nisi ut, pellentesque urna.
	</Typography>
);

export const TitlesStory = Template.bind({});
TitlesStory.args = {
	variant: "body1",
	color: "textPrimary",
	fontWeight: "",
};

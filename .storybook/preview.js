import { XimThemeProvider } from "../src";

const withThemeProvider = (Story, context) => {
	return (
		<XimThemeProvider>
			<Story {...context} />
		</XimThemeProvider>
	);
};

export const decorators = [withThemeProvider];

// https://storybook.js.org/docs/react/writing-stories/parameters#global-parameters
export const parameters = {
	// https://storybook.js.org/docs/react/essentials/actions#automatically-matching-args
	actions: { argTypesRegex: "^on.*" },
};

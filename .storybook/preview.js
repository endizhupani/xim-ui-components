import { ThemeProvider, createTheme } from "@mui/material/styles";
import { ThemeProvider as Emotion10ThemeProvider } from "emotion-theming";

const defaultTheme = createTheme(); // or your custom theme

const withThemeProvider = (Story, context) => {
	return (
		<Emotion10ThemeProvider theme={defaultTheme}>
			<ThemeProvider theme={defaultTheme}>
				<Story {...context} />
			</ThemeProvider>
		</Emotion10ThemeProvider>
	);
};

export const decorators = [withThemeProvider];

// https://storybook.js.org/docs/react/writing-stories/parameters#global-parameters
export const parameters = {
	// https://storybook.js.org/docs/react/essentials/actions#automatically-matching-args
	actions: { argTypesRegex: "^on.*" },
};

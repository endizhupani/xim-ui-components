import {
	createTheme,
	ThemeProvider,
	Theme,
	StyledEngineProvider,
	ThemeOptions,
} from "@mui/material";
import React from "react";
import { FunctionComponent } from "react";

declare module "@mui/styles/defaultTheme" {
	// eslint-disable-next-line @typescript-eslint/no-empty-interface
	interface DefaultTheme extends Theme {}
}

const themeOptionsV5: ThemeOptions = {
	palette: {
		mode: "dark",
		secondary: {
			main: "#ec6608",
			dark: "#ec6608",
		},
		primary: {
			main: "#ec6608",
			dark: "#ec6608",
		},
		background: {
			paper: "#3d3d3d",
			default: "#252525",
		},
		text: {
			primary: "#fff",
			disabled: "#7d7d7d",
			secondary: "#ec6608",
		},
		action: {
			disabled: "#7d7d7d",
		},
	},
	breakpoints: {
		values: {
			xs: 0,
			sm: 850,
			md: 960,
			lg: 1280,
			xl: 1920,
		},
	},
	typography: {
		fontSize: 14,
		body1: {
			fontSize: "14px",
		},
		h1: {
			fontFamily: "BenchNine",
			textTransform: "uppercase",
		},
		h2: {
			fontFamily: "BenchNine",
			textTransform: "uppercase",
		},
		h3: {
			fontFamily: "BenchNine",
			textTransform: "uppercase",
		},
		h4: {
			fontFamily: "BenchNine",
			textTransform: "uppercase",
		},
	},
	components: {
		MuiCssBaseline: {
			styleOverrides: {
				root: {
					fontSize: "1rem",
				},
			},
		},
	},
};

const theme = createTheme(themeOptionsV5);

export const XimThemeProvider: FunctionComponent<{}> = (props) => {
	return (
		<StyledEngineProvider injectFirst>
			<ThemeProvider theme={theme}>{props.children}</ThemeProvider>
		</StyledEngineProvider>
	);
};

import { Typography } from "@mui/material";
import { ComponentMeta } from "@storybook/react";
import { ConfirmProvider, XimStepper } from "../src";

export default {
	title: "XimStepper",
	component: XimStepper,
} as ComponentMeta<typeof XimStepper>;

export const StepsWithNoContent = () => {
	return (
		<ConfirmProvider>
			<XimStepper
				onReset={() => {}}
				endScreen={<Typography>End Screen</Typography>}
				steps={[
					{
						title: "Step 1",
						content: <Typography>Step 1 Content</Typography>,
						properties: {
							helperText: "Step 1 Helper Text",
							next: {
								action: async () => {},
								disabled: false,
								label: "Next",
							},
							back: {
								action: async () => {},
								disabled: true,
								label: "Back",
							},
							reset: {
								disabled: false,
								label: "Reset",
							},
						},
					},
					{
						title: "Step 3",
						content: <Typography>Step 2 Content</Typography>,
						properties: {
							helperText: "Step 2 Helper Text",
							next: {
								action: async () => {},
								disabled: false,
								label: "Next",
							},
							back: {
								action: async () => {},
								disabled: true,
								label: "Back",
							},
							reset: {
								disabled: false,
								label: "Reset",
							},
						},
					},
					{
						title: "Step 2",
						content: <Typography>Final Step Content</Typography>,
						properties: {
							next: {
								action: async () => {},
								disabled: false,
								label: "Finish",
							},
							back: {
								action: async () => {},
								disabled: false,
								label: "Back",
							},
							reset: {
								disabled: false,
								label: "Reset",
							},
						},
					},
				]}
			></XimStepper>
		</ConfirmProvider>
	);
};

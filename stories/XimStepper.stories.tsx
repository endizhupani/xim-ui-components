import { ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { ComponentMeta } from "@storybook/react";
import { useState } from "react";
import { ConfirmProvider, XimStepper } from "../src";

export default {
	title: "XimStepper",
	component: XimStepper,
} as ComponentMeta<typeof XimStepper>;

export const StepsWithNoContent = () => {
	const [enabledSteps, setEnabledSteps] = useState<number[]>([1, 2, 3, 4]);
	const handleFormat = (event, newFormats) => {
		setEnabledSteps(newFormats);
	};

	return (
		<ConfirmProvider>
			<ToggleButtonGroup
				value={enabledSteps}
				sx={{
					marginBottom: (theme) => theme.spacing(2),
				}}
				onChange={handleFormat}
				aria-label="text formatting"
			>
				<ToggleButton value={1} aria-label="1">
					Step 1
				</ToggleButton>
				<ToggleButton value={2} aria-label="2">
					Step 2
				</ToggleButton>
				<ToggleButton value={3} aria-label="3">
					Step 3
				</ToggleButton>
				<ToggleButton value={4} aria-label="4">
					Step 4
				</ToggleButton>
			</ToggleButtonGroup>
			<XimStepper
				onReset={() => {}}
				endScreen={<Typography>End Screen</Typography>}
				steps={[
					{
						title: "Step 1",
						content: <Typography>Step 1 Content</Typography>,
						disabled: enabledSteps.indexOf(1) === -1,
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
						title: "Step 2",
						content: <Typography>Step 2 Content</Typography>,
						disabled: enabledSteps.indexOf(2) === -1,
						properties: {
							helperText: "Step 2 Helper Text",
							next: {
								action: async () => {},
								disabled: false,
								label: "Next",
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
					{
						title: "Step 3",
						disabled: enabledSteps.indexOf(3) === -1,
						content: <Typography>Step 3 Content</Typography>,
						properties: {
							helperText: "Step 3 Helper Text",
							next: {
								action: async () => {},
								disabled: false,
								label: "Next",
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
					{
						title: "Step 4",
						disabled: enabledSteps.indexOf(4) === -1,
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

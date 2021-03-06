import {
	Button,
	Divider,
	Step,
	StepLabel,
	Stepper,
	Typography,
	useTheme,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useConfirm } from "./ConfirmationDialog";
import React, { FunctionComponent, useEffect } from "react";
import { XimInstructionsText } from "./XimInstructionsText";
const PREFIX = "XimStepper";

const classes = {
	button: `${PREFIX}-button`,
	root: `${PREFIX}-root`,
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled("div")(({ theme: Theme }) => ({
	[`& .${classes.button}`]: {
		marginRight: Theme.spacing(1),
	},

	[`& .${classes.root}`]: {
		width: "100%",
		display: "flex",
		flexDirection: "column",
		height: "100%",
	},
}));
function lastEnabledStepIdx(steps: XimeaProcessStepData[]) {
	for (let i = steps.length - 1; i >= 0; i--) {
		if (!steps[i].disabled) {
			return i;
		}
	}

	return -1;
}

function nextEnabledStepIdx(steps: XimeaProcessStepData[], currentIdx: number) {
	if (currentIdx >= steps.length - 1) {
		return steps.length;
	}
	for (let i = currentIdx + 1; i < steps.length; i++) {
		if (!steps[i].disabled) {
			return i;
		}
	}

	return steps.length;
}

function previousEnabledStepIdx(
	steps: XimeaProcessStepData[],
	currentIdx: number
) {
	for (let i = currentIdx - 1; i >= 0; i--) {
		if (!steps[i].disabled) {
			return i;
		}
	}

	return -1;
}
export type StepperProps = {
	onReset: () => void;
	endScreen?: React.ReactNode;
	steps: XimeaProcessStepData[];
};

export const XimStepper = (props: StepperProps) => {
	const [activeStep, setActiveStep] = React.useState(0);
	const confirm = useConfirm();
	const theme = useTheme();
	const handleNext = () => {
		setActiveStep((prevActiveStep) =>
			nextEnabledStepIdx(props.steps, prevActiveStep)
		);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) =>
			previousEnabledStepIdx(props.steps, prevActiveStep)
		);
	};

	const handleReset = () => {
		return confirm({
			description:
				"Are you sure you want to reset the process? The current progress will be lost.",
			title: "Reset Process",
			confirmationText: "Yes",
		}).then(() => {
			props.onReset();
			setActiveStep(0);
		});
	};
	useEffect(() => {
		if (
			activeStep >= props.steps.length ||
			!props.steps[activeStep].disabled ||
			activeStep === 0
		) {
			return;
		}

		// find the first enabled step smaller than active one.
		for (let i = activeStep - 1; i >= 0; i--) {
			if (!props.steps[i].disabled) {
				setActiveStep(i);
				return;
			}
		}
	});

	return (
		<div className={classes.root}>
			<Stepper
				sx={{ marginBottom: (theme) => theme.spacing(1) }}
				activeStep={activeStep}
			>
				{props.steps.map((step, _) => {
					const stepProps: { completed?: boolean } = {};

					return (
						<Step
							key={step.title}
							{...stepProps}
							disabled={step.disabled}
						>
							<StepLabel
								color={
									step.disabled
										? theme.palette.text.disabled
										: theme.palette.text.primary
								}
							>
								<Typography
									color={
										step.disabled
											? "GrayText"
											: theme.palette.text.primary
									}
								>
									{step.title}
								</Typography>
							</StepLabel>
						</Step>
					);
				})}
			</Stepper>
			<Divider></Divider>
			{activeStep <= lastEnabledStepIdx(props.steps) ? (
				<XimeaProcessStep
					helperText={props.steps[activeStep].properties.helperText}
					back={{
						...props.steps[activeStep].properties.back,
						action: async () => {
							if (
								(await props.steps[
									activeStep
								].properties.back.action()) !== false
							)
								handleBack();
						},
					}}
					next={{
						...props.steps[activeStep].properties.next,
						action: async () => {
							if (
								(await props.steps[
									activeStep
								].properties.next.action()) !== false
							) {
								handleNext();
							}
						},
					}}
					reset={{
						...props.steps[activeStep].properties.reset,
						action: handleReset,
					}}
				>
					{props.steps[activeStep].content}
				</XimeaProcessStep>
			) : (
				props.endScreen || (
					<XimInstructionsText text="Process is finished." />
				)
			)}
		</div>
	);
};

export type XimeaProcessStepData = {
	title: string;
	properties: ProcessStepProperties;
	content: React.ReactNode;
	disabled?: boolean;
};

type ButtonData = {
	action: () => Promise<boolean | void>;
	disabled?: boolean;
	label?: string;
};

type InternalProcessStepProperties = {
	next: ButtonData;
	back: ButtonData;
	reset: ButtonData;
	helperText?: string;
};

export type ProcessStepProperties = {
	next: ButtonData;
	back: ButtonData;
	reset: { disabled?: boolean; label?: string };
	helperText?: string;
};

export const XimeaProcessStep: FunctionComponent<InternalProcessStepProperties> =
	(props) => {
		const { reset, back, next, helperText } = props;

		return (
			<Root>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						flexGrow: 1,
					}}
				>
					{helperText && <XimInstructionsText text={helperText} />}
					{props.children}
				</div>
				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						width: "100%",
					}}
				>
					<div>
						<Button
							onClick={() => {
								reset.action();
							}}
							className={classes.button}
							variant="contained"
							color="info"
						>
							{reset.label || "Reset"}
						</Button>
					</div>
					<div>
						<Button
							disabled={back.disabled}
							className={classes.button}
							onClick={() => {
								back.action();
							}}
						>
							{back.label || "Back"}
						</Button>
						<Button
							onClick={() => {
								next.action();
							}}
							variant="contained"
							color="primary"
							disabled={next.disabled}
							className={classes.button}
						>
							{next.label || "Next"}
						</Button>
					</div>
				</div>
			</Root>
		);
	};

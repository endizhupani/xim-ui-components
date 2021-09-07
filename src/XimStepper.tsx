import {
	Button,
	Divider,
	Step,
	StepLabel,
	Stepper,
	Theme,
} from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/styles";
import { useConfirm } from "material-ui-confirm";
import React, { FunctionComponent } from "react";
import { XimInstructionsText } from "./XimInstructionsText";
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		button: {
			marginRight: theme.spacing(1),
		},
		root: {
			width: "100%",
			display: "flex",
			flexDirection: "column",
			height: "100%",
		},
	})
);

export type StepperProps = {
	onReset: () => void;
	steps: XimeaProcessStepData[];
};

export const XimStepper = (props: StepperProps) => {
	const classes = useStyles();
	const [activeStep, setActiveStep] = React.useState(0);
	const confirm = useConfirm();
	const handleNext = () => {
		if (activeStep + 1 >= props.steps.length) {
			return;
		}

		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
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

	return (
		<div className={classes.root}>
			<Stepper activeStep={activeStep}>
				{props.steps.map((step, _) => {
					const stepProps: { completed?: boolean } = {};
					const labelProps: { optional?: React.ReactNode } = {};

					return (
						<Step key={step.title} {...stepProps}>
							<StepLabel {...labelProps}>{step.title}</StepLabel>
						</Step>
					);
				})}
			</Stepper>
			<Divider></Divider>
			<XimeaProcessStep
				helperText={props.steps[activeStep].properties.helperText}
				back={{
					action: async () => {
						await props.steps[activeStep].properties.back.action();
						handleBack();
					},
					disabled: props.steps[activeStep].properties.back.disabled,
				}}
				next={{
					action: async () => {
						await props.steps[activeStep].properties.next.action();
						handleNext();
					},
					disabled: props.steps[activeStep].properties.next.disabled,
				}}
				reset={{
					disabled:
						props.steps[activeStep].properties.next.disabled ??
						false,
					action: handleReset,
				}}
			>
				{props.steps[activeStep].content}
			</XimeaProcessStep>
		</div>
	);
};

export type XimeaProcessStepData = {
	title: string;
	properties: ProcessStepProperties;
	content: React.ReactNode;
};

type ButtonData = {
	action: () => Promise<void>;
	disabled?: boolean;
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
	reset: { disabled: boolean };
	helperText?: string;
};

export const XimeaProcessStep: FunctionComponent<InternalProcessStepProperties> = (
	props
) => {
	const { reset, back, next, helperText } = props;
	const classes = useStyles();
	return (
		<>
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
					>
						Reset
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
						Back
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
						Next
					</Button>
				</div>
			</div>
		</>
	);
};

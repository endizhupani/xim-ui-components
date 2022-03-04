import {
	FormGroup,
	FormControlLabel,
	ToggleButtonGroup,
	ToggleButton,
} from "@mui/material";
import React from "react";

export type OptionsInputProps = {
	options: {
		[value: string]: string;
	};
	value: string;
	label: string;
	onChange: (newVal: string) => void;
	disabled?: boolean;
};

export const OptionsInput = (props: OptionsInputProps) => {
	return (
		<FormGroup>
			<FormControlLabel
				sx={{
					margin: (theme) => theme.spacing(1, 0),
					alignItems: "start",
				}}
				control={
					<ToggleButtonGroup
						aria-label={props.label}
						color="primary"
						disabled={props.disabled}
						value={props.value}
						exclusive
						onChange={(_, value: string) => {
							props.onChange(value);
						}}
					>
						{Object.keys(props.options).map((key) => {
							return (
								<ToggleButton
									size="small"
									key={key}
									value={key}
								>
									{props.options[key]}
								</ToggleButton>
							);
						})}
					</ToggleButtonGroup>
				}
				label={props.label}
				labelPlacement="top"
			></FormControlLabel>
		</FormGroup>
	);
};

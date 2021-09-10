import { makeStyles, Theme, createStyles, TextField } from "@material-ui/core";
import React, { useState } from "react";

const useQuantityInputStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			maxWidth: "130px",
			"& .MuiFilledInput-inputMarginDense": {
				paddingTop: theme.spacing(1),
				textAlign: "right",
			},
		},
	})
);
export const QuantityInput = (props: {
	value: number;
	setValue: (newVal: number) => void;
	disabled?: boolean;
	min?: number;
	max?: number;
}) => {
	const [error, setError] = useState<string>();
	const [val, setVal] = useState<number>(props.value);
	const classes = useQuantityInputStyles();
	return (
		<TextField
			variant="filled"
			size="small"
			type="number"
			classes={{ root: classes.root }}
			disabled={props.disabled}
			error={!!error}
			onChange={(e) => {
				if (!e.target.value) {
					setVal(0);
					return;
				}
				setVal(parseInt(e.target.value));
			}}
			onBlur={(e) => {
				if (
					val > (props.max ?? Infinity) ||
					val < (props.min ?? -Infinity)
				) {
					setError(
						`Quantity must be between ${
							props.min ?? -Infinity
						} and ${props.max ?? Infinity}`
					);
					return;
				}
				setError(undefined);
				props.setValue(val);
			}}
			helperText={error}
			value={val}
		/>
	);
};

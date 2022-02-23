import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useState } from "react";

const PREFIX = "QuantityInput";

const classes = {
	root: `${PREFIX}-root`,
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled(TextField)(({ theme: Theme }) => ({
	[`& .${classes.root}`]: {
		maxWidth: "130px",
		"& .MuiFilledInput-inputMarginDense": {
			paddingTop: Theme.spacing(1),
			textAlign: "right",
		},
	},
}));

export const QuantityInput = (props: {
	value: number;
	setValue: (newVal: number) => void;
	disabled?: boolean;
	min?: number;
	max?: number;
}) => {
	const [error, setError] = useState<string>();
	const [val, setVal] = useState<number>(props.value);

	return (
		<Root
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
			onBlur={(_) => {
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

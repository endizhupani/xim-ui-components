import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
const PREFIX = "XimInstructionsText";

const classes = {
	instructions: `${PREFIX}-instructions`,
};

const StyledTypography = styled(Typography)(({ theme: Theme }) => ({
	[`&.${classes.instructions}`]: {
		marginTop: Theme.spacing(1),
		marginBottom: Theme.spacing(1),
	},
}));

export const XimInstructionsText = (props: { text: string }) => {
	return (
		<StyledTypography className={classes.instructions}>
			{props.text}
		</StyledTypography>
	);
};

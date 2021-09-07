import { createStyles, makeStyles, Theme, Typography } from "@material-ui/core";
import React from "react";
export const useInstructionsStyles = makeStyles((theme: Theme) =>
	createStyles({
		instructions: {
			marginTop: theme.spacing(1),
			marginBottom: theme.spacing(1),
		},
	})
);
export const XimInstructionsText = (props: { text: string }) => {
	const classes = useInstructionsStyles();
	return (
		<Typography className={classes.instructions}>{props.text}</Typography>
	);
};

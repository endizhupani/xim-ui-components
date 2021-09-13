import {
	Backdrop,
	CircularProgress,
	Theme,
	Typography,
} from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/styles";
import React from "react";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		backdrop: {
			zIndex: theme.zIndex.drawer + 1,
			flexDirection: "column",
		},
	})
);

export const XimBackdrop = (props: { loadingText: string; open: boolean }) => {
	const { loadingText, open } = props;
	const classes = useStyles();
	return (
		<Backdrop className={classes.backdrop} open={open}>
			<CircularProgress color="primary" />
			<Typography style={{ marginTop: "1em", color: "white" }}>
				{loadingText}
			</Typography>
		</Backdrop>
	);
};

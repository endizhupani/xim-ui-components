import { Backdrop, CircularProgress, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";

const PREFIX = "XimBackdrop";

const classes = {
	backdrop: `${PREFIX}-backdrop`,
};

const StyledBackdrop = styled(Backdrop)(({ theme: Theme }) => ({
	[`&.${classes.backdrop}`]: {
		zIndex: Theme.zIndex.drawer + 1,
		flexDirection: "column",
	},
}));

export const XimBackdrop = (props: { loadingText: string; open: boolean }) => {
	const { loadingText, open } = props;

	return (
		<StyledBackdrop className={classes.backdrop} open={open}>
			<CircularProgress color="primary" />
			<Typography style={{ marginTop: "1em", color: "white" }}>
				{loadingText}
			</Typography>
		</StyledBackdrop>
	);
};

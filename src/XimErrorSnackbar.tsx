import React from "react";
import { styled } from "@mui/material/styles";
import { Snackbar, SnackbarCloseReason } from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const PREFIX = "XimErrorSnackbar";

const classes = {
	root: `${PREFIX}-root`,
};

const Root = styled("div")(({ theme: Theme }) => ({
	[`&.${classes.root}`]: {
		width: "100%",
		"& > * + *": {
			marginTop: Theme.spacing(2),
		},
		"& .MuiAlert-outlinedError": {
			color: Theme.palette.error.main,
		},
		"& .MuiAlert-outlinedError .message-details": {
			color: Theme.palette.text.primary,
		},
	},
}));

function Alert(props: AlertProps) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const XimErrorSnackbar = (props: {
	error: string | undefined;
	errorRemover: () => void;
}) => {
	const handleClose = (
		_: Event | React.SyntheticEvent<any, Event>,
		reason: SnackbarCloseReason
	) => {
		if (reason === "clickaway") {
			return;
		}
		props.errorRemover();
	};

	return (
		<Root className={classes.root}>
			<Snackbar
				open={!!props.error}
				TransitionProps={{}}
				onClose={handleClose}
			>
				<Alert variant="outlined" severity="error">
					Oops, an error occurred:{" "}
					<span className="message-details">{props.error}</span>
				</Alert>
			</Snackbar>
		</Root>
	);
};

import React from 'react';
import { makeStyles, Theme, Snackbar } from '@material-ui/core';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
    '& .MuiAlert-outlinedError': {
      color: theme.palette.error.main,
    },
    '& .MuiAlert-outlinedError .message-details': {
      color: theme.palette.text.primary,
    },
  },
}));

export const XimErrorSnackbar = (props: {
  error: string | undefined;
  errorRemover: () => void;
}) => {
  const classes = useStyles();
  const handleClose = (_?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    props.errorRemover();
  };

  return (
    <div className={classes.root}>
      <Snackbar open={!!props.error} onClose={handleClose}>
        <Alert onClose={handleClose} variant="outlined" severity="error">
          Oops, an error occurred:{' '}
          <span className="message-details">{props.error}</span>
        </Alert>
      </Snackbar>
    </div>
  );
};

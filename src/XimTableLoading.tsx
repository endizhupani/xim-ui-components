import Skeleton from '@material-ui/lab/Skeleton';
import React from 'react';

export const XimTableLoading = (props: { height: string }) => {
  return (
    <div style={{ marginTop: '1em' }}>
      <Skeleton
        variant="rect"
        animation="wave"
        width="100%"
        height={props.height}
      ></Skeleton>
    </div>
  );
};

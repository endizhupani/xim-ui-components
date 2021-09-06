import Skeleton from "@material-ui/lab/Skeleton";
import React from "react";

export type TableLoadingProps = {
	height: string;
};

export const XimTableLoading = (props: TableLoadingProps) => {
	return (
		<div style={{ marginTop: "1em" }}>
			<Skeleton
				variant="rect"
				animation="wave"
				width="100%"
				height={props.height}
			></Skeleton>
		</div>
	);
};

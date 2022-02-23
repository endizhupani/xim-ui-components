import Skeleton from '@mui/material/Skeleton';
import React from "react";

export const XimDetailsBoxLoading = (props: {
	lines: number;
	lineHeight: string;
	lineWidth: string;
}) => {
	let lines = [];
	for (let i = 0; i < props.lines; i++) {
		lines.push(
			<Skeleton
				animation="wave"
				key={i.toString()}
				style={{ marginTop: ".5em" }}
				height={props.lineHeight}
				width={props.lineWidth}
			/>
		);
	}
	return <div style={{ marginTop: "1em", marginRight: "2em" }}>{lines}</div>;
};

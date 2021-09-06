import { WithHighlightStripe } from "./HighlightStripe";
import { CheckMark } from "./CheckMark";
import { formatDate } from "./helpers/Formating";
import React from "react";

const detailDisplay = (value: DetailValue) => {
	if (value instanceof Date) {
		return formatDate(value);
	}

	switch (typeof value) {
		case "boolean":
			return <CheckMark value={value as boolean}></CheckMark>;
		default:
			return value;
	}
};

type DetailValue = number | string | boolean | Date | JSX.Element;

export type DetailValuePair = { label: string; value: DetailValue };

export const XimDetailsBox = (props: {
	values: DetailValuePair[];
	highlightStripe?: boolean;
}) => {
	if (!props.highlightStripe) {
		return (
			<div
				style={{
					display: "grid",
					gridTemplateColumns: "auto auto",
					columnGap: "1em",
					rowGap: ".5em",
					marginRight: "3em",
				}}
			>
				{props.values.map((v) => {
					return [
						<div
							style={{ display: "flex", alignItems: "center" }}
							key={v.label + "-label"}
						>
							{v.label}
						</div>,
						<div
							style={{
								fontWeight: "bold",
								display: "flex",
								alignItems: "center",
							}}
							key={v.label + "-value"}
						>
							{detailDisplay(v.value)}
						</div>,
					];
				})}
			</div>
		);
	}
	return (
		<WithHighlightStripe style={{ marginTop: "1em" }}>
			<div
				style={{
					display: "grid",
					gridTemplateColumns: "auto auto",
					columnGap: "1em",
					rowGap: ".5em",
					marginRight: "3em",
				}}
			>
				{props.values.map((v) => {
					return [
						<div
							style={{ display: "flex", alignItems: "center" }}
							key={v.label + "-label"}
						>
							{v.label}
						</div>,
						<div
							style={{
								fontWeight: "bold",
								display: "flex",
								alignItems: "center",
							}}
							key={v.label + "-value"}
						>
							{detailDisplay(v.value)}
						</div>,
					];
				})}
			</div>
		</WithHighlightStripe>
	);
};

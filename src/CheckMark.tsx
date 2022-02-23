import { Cancel, CheckCircle } from "@mui/icons-material";
import React from "react";

/**
 *
 * @param props Object that contains a boolean value to display a checkmark for
 * @returns
 */
export const CheckMark = (props: { value: boolean }) => {
	if (props.value) {
		return (
			<CheckCircle
				style={{ width: "17px", height: "17px" }}
				className="icon-default"
			></CheckCircle>
		);
	}

	return (
		<Cancel
			style={{ width: "17px", height: "17px" }}
			className="icon-disabled"
		></Cancel>
	);
};

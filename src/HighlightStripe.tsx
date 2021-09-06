import React from "react";
export const HighlightStripe = () => {
	return (
		<div
			style={{
				height: "100%",
				background: "linear-gradient(0deg, rgba(208,75,13,1) 0%, rgba(240,99,0,1) 100%)",
				minWidth: "6px",
				borderRadius: "3px",
				marginRight: ".75em",
			}}
		></div>
	);
};

export const WithHighlightStripe = (props: React.ComponentProps<"div">) => {
	return (
		<div {...props} style={{ display: "flex", alignItems: "center", ...props.style }}>
			<HighlightStripe></HighlightStripe>
			{props.children}
		</div>
	);
};

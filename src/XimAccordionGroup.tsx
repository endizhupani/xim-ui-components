import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React from "react";
import { useState } from "react";

const PREFIX = "XimAccordionGroup";

const classes = {
	root: `${PREFIX}-root`,
	accordionRoot: `${PREFIX}-accordionRoot`,
	accordionDetails: `${PREFIX}-accordionDetails`,
	heading: `${PREFIX}-heading`,
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled("div")(({ theme: Theme }) => ({
	[`& .${classes.root}`]: {
		width: "100%",
	},

	[`& .${classes.accordionRoot}`]: {
		backgroundColor: "#474747",
	},

	[`& .${classes.accordionDetails}`]: {
		flexDirection: "column",
	},

	[`& .${classes.heading}`]: {
		fontSize: Theme.typography.pxToRem(15),
		fontWeight: Theme.typography.fontWeightRegular,
		color: Theme.palette.primary.main,
	},
}));

// const useAccordionStyles = makeStyles((
//     {
//         theme: Theme
//     }
// ) => ({
//     [`& .${classes.root}`]: {
//         width: "100%",
//     },

//     [`& .${classes.accordionRoot}`]: {
//         backgroundColor: "#474747",
//     },

//     [`& .${classes.accordionDetails}`]: {
//         flexDirection: "column",
//     },

//     [`& .${classes.heading}`]: {
//         fontSize: Theme.typography.pxToRem(15),
//         fontWeight: Theme.typography.fontWeightRegular,
//         color: Theme.palette.primary.main,
//     }
// })
// );
export type XimAccordionItem = {
	title: string | React.ReactNode;
	content: string | React.ReactNode;
	id: string;
	defaultExpanded: boolean;
};

export type XimAccordionProps = {
	items: XimAccordionItem[];
};

export const XimAccordionGroup = (props: XimAccordionProps) => {
	const accordionClasses = classes;
	const { items } = props;
	const [expanded, setExpanded] = useState<{ [id: string]: boolean }>(
		Object.assign(
			{},
			...items.map((item) => ({ [item.id]: item.defaultExpanded }))
		)
	);

	const handleChange = (panel: string) => (
		_: React.ChangeEvent<{}>,
		newExpanded: boolean
	) => {
		setExpanded({ ...expanded, [panel]: newExpanded });
	};

	return (
		<Root>
			{items.map((item) => (
				<Accordion
					square
					expanded={expanded[item.id]}
					onChange={handleChange(item.id)}
					key={item.id}
					className={accordionClasses.accordionRoot}
				>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls={`${item.id}-content`}
						id={`${item.id}-header`}
					>
						<Typography
							className={accordionClasses.heading}
							component={"div"}
						>
							{item.title}
						</Typography>
					</AccordionSummary>
					<AccordionDetails>{item.content}</AccordionDetails>
				</Accordion>
			))}
		</Root>
	);
};

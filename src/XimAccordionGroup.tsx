import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	createStyles,
	makeStyles,
	Theme,
	Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import React from "react";
import { useState } from "react";

const useAccordionStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			width: "100%",
		},
		accordionRoot: {
			backgroundColor: "#474747",
		},
		accordionDetails: {
			flexDirection: "column",
		},
		heading: {
			fontSize: theme.typography.pxToRem(15),
			fontWeight: theme.typography.fontWeightRegular,
			color: theme.palette.primary.main,
		},
	})
);
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
	const accordionClasses = useAccordionStyles();
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
		<>
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
		</>
	);
};

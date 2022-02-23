import { Button, ButtonGroup, TextField } from "@mui/material";
import React from "react";
import NumberFormat from "react-number-format";
import { formatCurrency } from "./helpers/Formating";
export type MoneyDto = {
	amount: number;
	amountFormatted: string;
	currencyCode: string;
};

function realParseFloat(s: string) {
	s = s.replace(/[^\d,.-]/g, ""); // strip everything except numbers, dots, commas and negative sign
	if (
		navigator.language.substring(0, 2) !== "de" &&
		/^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test(s)
	) {
		// if not in German locale and matches #,###.######
		s = s.replace(/,/g, ""); // strip out commas
		return parseFloat(s); // convert to number
	} else if (/^-?(?:\d+|\d{1,3}(?:\.\d{3})+)(?:,\d+)?$/.test(s)) {
		// either in German locale or not match #,###.###### and now matches #.###,########
		s = s.replace(/\./g, ""); // strip out dots
		s = s.replace(/,/g, "."); // replace comma with dot
		return parseFloat(s);
	} // try #,###.###### anyway
	else {
		s = s.replace(/,/g, ""); // strip out commas
		return parseFloat(s); // convert to number
	}
}

interface NumberFormatCustomProps {
	ref: (instance: NumberFormat<number> | null) => void;
	onChange: (event: {
		target: { name: string; value: string; formattedValue: string };
	}) => void;
	name: string;
	currency: string;
	min: number;
}
const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(
	props: NumberFormatCustomProps
) {
	const { ref, onChange, ...other } = props;
	return (
		<NumberFormat
			{...other}
			style={{ paddingTop: "15px", textAlign: "right" }}
			getInputRef={ref}
			onValueChange={(values: any) => {
				onChange({
					target: {
						name: props.name,
						value: values.floatValue?.toString() ?? "",
						formattedValue: values.formattedValue?.toString() ?? "",
					},
				});
			}}
			thousandSeparator={other.currency == "EUR" ? "." : ","}
			decimalSeparator={other.currency == "EUR" ? "," : "."}
			decimalScale={2}
			fixedDecimalScale={true}
			allowNegative={false}
			isNumericString
			prefix={other.currency == "EUR" ? "" : "$ "}
			suffix={other.currency == "EUR" ? " €" : ""}
		/>
	);
});

export type CurrencyInputProps = {
	value: MoneyDto;
	defaultValue: MoneyDto;
	onValueChanged: (newValue?: MoneyDto) => void;
	error: string;
	label: string;
	max: MoneyDto;
	hideControls?: boolean;
};

export const CurrencyInput = (props: CurrencyInputProps) => {
	const {
		value,
		onValueChanged,
		error,
		label,
		max,
		defaultValue,
		hideControls,
	} = props;

	return (
		<>
			<TextField
				variant="filled"
				label={label}
				style={{ maxWidth: "200px" }}
				error={!!error}
				onBlur={(e) => {
					let newValue = realParseFloat(e.target.value);
					onValueChanged({
						amount: newValue,
						amountFormatted: e.target.value,
						currencyCode: value.currencyCode,
					});
				}}
				helperText={error}
				value={value.amount}
				InputProps={{
					inputComponent: NumberFormatCustom as any,
					inputProps: {
						currency: value.currencyCode,
						min: 0,
					},
				}}
			/>
			{!hideControls && (
				<ButtonGroup
					size="small"
					style={{ marginLeft: "1em" }}
					aria-label="small outlined button group"
				>
					<Button
						onClick={() => {
							onValueChanged(max);
						}}
						color={
							value.amount == max.amount ? "primary" : "secondary"
						}
					>
						Full
					</Button>
					<Button
						onClick={() => {
							onValueChanged(defaultValue);
						}}
						color={
							value.amount == defaultValue.amount
								? "primary"
								: "secondary"
						}
					>
						Partial
					</Button>
					<Button
						onClick={() =>
							onValueChanged({
								amount: 0,
								currencyCode: value.currencyCode,
								amountFormatted: formatCurrency(
									value.currencyCode,
									0
								),
							})
						}
						color={value.amount == 0 ? "primary" : "secondary"}
					>
						None
					</Button>
				</ButtonGroup>
			)}
		</>
	);
};

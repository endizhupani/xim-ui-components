/**
 * Formats the date in yyyy-MM-dd format
 * @param date Date to be formatted
 * @returns the Date string
 */
export function formatDate(date: Date) {
	if (date == null) return "";
	return `${date.getFullYear()}-${date.getMonth().toString().padStart(2, "0")}-${date
		.getDate()
		.toString()
		.padStart(2, "0")}`;
}

export function formatErrorMessage(error: any): string {
	if ("errorMessage" in error) {
		const errorObject = JSON.parse(error.errorMessage);
		return errorObject.error.message;
	}

	if (error instanceof Error) {
		return error.message;
	}

	return error.toString();
}

export function formatCurrency(currencyCode: string, value: number): string {
	const formatter = new Intl.NumberFormat(currencyCode == "EUR" ? "de-DE" : "en-US", {
		style: "currency",
		currency: currencyCode,
		minimumFractionDigits: 2,
	});
	return formatter.format(value);
}

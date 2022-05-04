import { ComponentMeta } from "@storybook/react";
import { XimTable } from "../src";

export default {
	title: "Table",
	component: XimTable,
} as ComponentMeta<typeof XimTable>;

type Person = {
	id: number;
	name: string;
	email: string;
};
export const DefaultTable = () => {
	const x: keyof Person = "name";
	const y = x;
	const data = [
		{
			id: 1,
			name: "John Doe",
			email: "john.doe@gmail.com",
		},
		{
			id: 2,
			name: "Jane Doe",
			email: "jane.doe@gmail.com",
		},
	];
	return (
		<XimTable<Person>
			columns={[
				{
					data: (r) => r.id.toString(),
					name: "ID",
					id: "id",
				},
				{
					data: "name",
					name: "Name",
					id: "name",
				},
				{
					data: "email",
					name: "Email",
					id: "email",
				},
			]}
			rows={data}
			keySelector={(r) => r.id.toString()}
			id="default-table"
		/>
	);
};

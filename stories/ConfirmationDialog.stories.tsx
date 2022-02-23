import React from "react";
import { ComponentMeta } from "@storybook/react";
import { useConfirm, ConfirmProvider, UserChoice } from "../src";
import { Button, Typography } from "@mui/material";
import { useState } from "@storybook/addons";

export default {
	title: "Confirmation Dialog",
	component: ConfirmProvider,
} as ComponentMeta<typeof ConfirmProvider>;

const ConfirmButton = (props: { setResult: (choice: UserChoice) => void }) => {
	const confirm = useConfirm();

	return (
		<>
			<Button
				onClick={async () => {
					const choice = await confirm({
						title: "Are you sure?",
						description:
							"This is a very very very very very long question",
						showRejection: true,
						confirmationText: "Yes, go ahead",
					});
					props.setResult(choice);
				}}
			>
				Click me!
			</Button>
		</>
	);
};

export const OpenWithButton = () => {
	const [result, setResult] = useState<UserChoice | undefined>(undefined);
	return (
		<ConfirmProvider>
			<ConfirmButton setResult={setResult} />
			<Typography color={"textPrimary"}>
				Choice: {result ?? "No choice"}
			</Typography>
		</ConfirmProvider>
	);
};

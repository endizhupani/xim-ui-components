import React from "react";
import { Meta, Story } from "@storybook/react";
import { XimTableLoading, TableLoadingProps } from "../src";

const meta: Meta = {
	title: "Loading",
	component: XimTableLoading,
};

export default meta;

const Template: Story<TableLoadingProps> = (args) => (
	<XimTableLoading {...args} />
);

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const TableLoading = Template.bind({ height: "100px" });

TableLoading.args = { height: "100px" };

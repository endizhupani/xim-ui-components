import React from "react";
import * as ReactDOM from "react-dom";
import { TableLoading } from "../stories/XimTableLoading.stories";

describe("Thing", () => {
	it("renders without crashing", () => {
		const div = document.createElement("div");
		ReactDOM.render(<TableLoading height="200px" />, div);
		ReactDOM.unmountComponentAtNode(div);
	});
});

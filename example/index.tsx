import "react-app-polyfill/ie11";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { XimTableLoading } from "../.";

const App = () => {
	return (
		<div>
			<XimTableLoading height={"200px"} />
		</div>
	);
};

ReactDOM.render(<App />, document.getElementById("root"));

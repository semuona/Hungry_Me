import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import HungryMeContextProvider from "./Context";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
	<BrowserRouter>
		<HungryMeContextProvider>
			<App />
		</HungryMeContextProvider>
	</BrowserRouter>,
	document.getElementById("root")
);

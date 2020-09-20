import React from "react";
import ReactDOM from "react-dom";
import { Provider, connect } from "react-redux";
import "./index.css";
import App from "./App";
import store from "./Redux/Store";

const component = () => <App />;
const Container = connect()(component);
ReactDOM.render(
	<Provider store={store}>
		<Container />
	</Provider>,
	document.getElementById("root")
);

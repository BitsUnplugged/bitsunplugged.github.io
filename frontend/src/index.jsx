import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import GlobalContextProvider from "./store/GlobalContextProvider";

export const COOKIE_AGE = 31536000;

let API_BASE_URL = "https://bitsunplugged.onrender.com/api";

if (import.meta?.env?.VITE_APP_API_BASE_URL ?? false) {
	// Development environment using Vite
	API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;
} else if (process.env.REACT_APP_API_BASE_URL) {
	// Production environment using React
	API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
}

// debugger;
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<GlobalContextProvider>
			<App />
		</GlobalContextProvider>
	</React.StrictMode>
);
export { API_BASE_URL };

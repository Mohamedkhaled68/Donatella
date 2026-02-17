import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router } from "react-router-dom";
import { I18nWrapper } from "./components/I18nWrapper.tsx";
import "./i18n/config.js"; // Initialize i18n before rendering

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<Router>
			<QueryClientProvider client={queryClient}>
				<I18nWrapper>
					<App />
				</I18nWrapper>
			</QueryClientProvider>
		</Router>
	</StrictMode>,
);

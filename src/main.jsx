import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import ThemeContextProvider from "./context/ThemeContext.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <Router>
            <QueryClientProvider client={queryClient}>
                <ThemeContextProvider>
                    <App />
                </ThemeContextProvider>
            </QueryClientProvider>
        </Router>
    </StrictMode>
);

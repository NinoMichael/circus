import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../src/lib/helpers/theme.ts";
import "./index.css";
import { StyledEngineProvider } from "@mui/material/styles";
import GlobalStyles from "@mui/material/GlobalStyles";
import CssBaseline from "@mui/material/CssBaseline";
import App from "./App.tsx";
import { LanguageProvider } from "./context/LanguageContext.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<StyledEngineProvider enableCssLayer>
			<GlobalStyles styles="@layer theme, base, mui, components, utilities;" />
			<ThemeProvider theme={theme}>
				<LanguageProvider>
					<BrowserRouter>
						<CssBaseline />
						<App />
					</BrowserRouter>
				</LanguageProvider>
			</ThemeProvider>
		</StyledEngineProvider>
	</StrictMode>
);

import { AnimatePresence } from "framer-motion";
import { Routes, Route } from "react-router-dom";

import DefaultLayout from "./layouts/Default";
import DriverLayout from "./layouts/Driver";

import Home from "./pages/Home";
import Contact from "./pages/Contact";

import OverviewDriver from "./pages/driver/Overview";

import { PrimeReactProvider } from 'primereact/api';

import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primereact/resources/primereact.min.css";

function App() {
	return (
		<PrimeReactProvider>
			<AnimatePresence mode="wait">
				<div>
					<Routes>
						<Route path="/" element={<DefaultLayout />}>
							<Route index element={<Home />} />
							<Route path="contact" element={<Contact />} />
						</Route>

						<Route path="/driver" element={<DriverLayout />}>
							<Route path="overview" element={<OverviewDriver />} />
						</Route>
					</Routes>
				</div>
			</AnimatePresence>
		</PrimeReactProvider>
	);
}

export default App;

import { AnimatePresence } from "framer-motion";
import { Routes, Route } from "react-router-dom";

import DefaultLayout from "./layouts/Default";
import DriverLayout from "./layouts/Driver";

import Home from "./pages/Home";

import OverviewDriver from "./pages/driver/Overview";

function App() {
	return (
		<AnimatePresence mode="wait">
			<div>
				<Routes>
					<Route path="/" element={<DefaultLayout />}>
						<Route index element={<Home />} />
					</Route>

					<Route path="/driver" element={<DriverLayout />}>
						<Route path="overview" element={<OverviewDriver />} />
					</Route>
				</Routes>
			</div>
		</AnimatePresence>
	);
}

export default App;

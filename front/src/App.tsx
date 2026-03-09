import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import DefaultLayout from "./layouts/Default";
import DriverLayout from "./layouts/Driver";

import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Login from "./pages/auth/Login";

import OverviewDriver from "./pages/driver/Overview";

function App() {
	const location = useLocation();

	return (
		<AnimatePresence mode="wait">
			<div>
				<Routes location={location} key={location.pathname}>
					<Route path="/" element={<DefaultLayout />}>
						<Route index element={<Home />} />
						<Route path="contact" element={<Contact />} />
						<Route path="login" element={<Login />} />
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

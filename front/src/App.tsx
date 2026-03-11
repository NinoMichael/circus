import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ProtectedRoute } from "./middleware/Protected";
import { GuestOrPassengerRoute } from "./middleware/GuestOrPassenger";

import DefaultLayout from "./layouts/Default";
import DriverLayout from "./layouts/Driver";

import Home from "./pages/Home";
import Contact from "./pages/Contact";

import Login from "./pages/auth/Login";

import OverviewDriver from "./pages/driver/Overview";

import DashboardAdmin from "./pages/admin/Dashboard";

import OverviewCooperative from "./pages/cooperative/Overview";

function App() {
	const location = useLocation();

	return (
		<AnimatePresence mode="wait">
			<div>
				<Routes location={location} key={location.pathname}>
					<Route path="/" element={<DefaultLayout />}>
						<Route
							element={
								<GuestOrPassengerRoute>
									<Home />
								</GuestOrPassengerRoute>
							}
							index
						/>
						<Route path="contact" element={<Contact />} />
						<Route path="login" element={<Login />} />
					</Route>

					<Route path="/driver" element={<DriverLayout />}>
						<Route
							path="overview"
							element={
								<ProtectedRoute roles={["driver"]}>
									<OverviewDriver />
								</ProtectedRoute>
							}
						/>
					</Route>

					<Route path="/admin" element={<DriverLayout />}>
						<Route
							path="dashboard"
							element={
								<ProtectedRoute roles={["admin"]}>
									<DashboardAdmin />
								</ProtectedRoute>
							}
						/>
					</Route>

					<Route path="/cooperative" element={<DriverLayout />}>
						<Route
							path="overview"
							element={
								<ProtectedRoute roles={["cooperative"]}>
									<OverviewCooperative />
								</ProtectedRoute>
							}
						/>
					</Route>
				</Routes>
			</div>
		</AnimatePresence>
	);
}

export default App;

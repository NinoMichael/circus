import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ProtectedRoute } from "./middleware/Protected";
import { GuestOrPassengerRoute } from "./middleware/GuestOrPassenger";

import DefaultLayout from "./layouts/Default";
import DriverLayout from "./layouts/Driver";

import About from "./pages/About";
import Home from "./pages/Home";
import Contact from "./pages/Contact";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import RegisterInfo from "./pages/auth/RegisterInfo";

import OverviewDriver from "./pages/driver/Overview";
import DetailBusDriver from "./pages/driver/bus/Detail";
import ProfileDriver from "./pages/driver/Profile";

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
						<Route
							element={
								<GuestOrPassengerRoute>
									<About />
								</GuestOrPassengerRoute>
							}
							path="about"
						/>
						<Route
							element={
								<GuestOrPassengerRoute>
									<Contact />
								</GuestOrPassengerRoute>
							}
							path="contact"
						/>

						<Route path="login" element={<Login />} />
						<Route path="register" element={<Register />} />
						<Route path="register/info" element={<RegisterInfo />} />
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
						<Route
							path="profile"
							element={
								<ProtectedRoute roles={["driver"]}>
									<ProfileDriver />
								</ProtectedRoute>
							}
						/>
						<Route
							path="bus"
							element={
								<ProtectedRoute roles={["driver"]}>
									<DetailBusDriver />
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

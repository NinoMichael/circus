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
import ProfileDriver from "./pages/driver/profile/Detail";
import EditBusDriver from "./pages/driver/bus/Edit";
import PlanningListDriver from "./pages/driver/planning/List";
import DetailPlanningDriver from "./pages/driver/planning/Detail";
import OpenBoardingDriver from "./pages/driver/planning/OpenBoarding";
import AnalyticsDriver from "./pages/driver/Analytics";
import EditProfileDriver from "./pages/driver/profile/Edit";

import DashboardAdmin from "./pages/admin/Dashboard";

import OverviewCooperative from "./pages/cooperative/Overview";
import SettingDriver from "./pages/driver/Setting";

import Join from "./pages/auth/cooperative/Join";
import JoinInfo from "./pages/auth/cooperative/JoinInfo";

import NotFound from "./pages/error/NotFound";

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
						<Route path="register-cooperative" element={<Join />} />
						<Route path="register-cooperative/info" element={<JoinInfo />} />
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
							path="profile/edit"
							element={
								<ProtectedRoute roles={["driver"]}>
									<EditProfileDriver />
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
						<Route
							path="bus/edit"
							element={
								<ProtectedRoute roles={["driver"]}>
									<EditBusDriver />
								</ProtectedRoute>
							}
						/>
						<Route
							path="planning"
							element={
								<ProtectedRoute roles={["driver"]}>
									<PlanningListDriver />
								</ProtectedRoute>
							}
						/>
						<Route
							path="planning/:id"
							element={
								<ProtectedRoute roles={["driver"]}>
									<DetailPlanningDriver />
								</ProtectedRoute>
							}
						/>
						<Route
							path="planning/:id/open-boarding"
							element={
								<ProtectedRoute roles={["driver"]}>
									<OpenBoardingDriver />
								</ProtectedRoute>
							}
						/>
						<Route
							path="performance"
							element={
								<ProtectedRoute roles={["driver"]}>
									<AnalyticsDriver />
								</ProtectedRoute>
							}
						/>
						<Route
							path="settings"
							element={
								<ProtectedRoute roles={["driver"]}>
									<SettingDriver />
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

					<Route path="*" element={<NotFound />} />
				</Routes>
			</div>
		</AnimatePresence>
	);
}

export default App;

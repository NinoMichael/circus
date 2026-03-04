import { Outlet } from "react-router-dom";

import SidebarDriver from "../components/driver/Sidebar";
import TopbarDriver from "../components/driver/Topbar";
import Footer from "../components/inc/Footer";

const DriverLayout = () => {
	return (
		<div className="relative flex min-h-screen w-full flex-col">
			<TopbarDriver />

			<div className="lg:flex flex-1">
				<SidebarDriver />

				<main className="flex-1 p-8">
					<Outlet />
				</main>
			</div>

			<Footer />
		</div>
	);
};

export default DriverLayout;

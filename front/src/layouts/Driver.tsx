import { Outlet } from "react-router-dom";

import SidebarDriver from "../components/driver/Sidebar";
import TopbarDriver from "../components/driver/Topbar";

const DriverLayout = () => {
	return (
		<div className="flex flex-col h-screen overflow-hidden">
			<TopbarDriver />

			<div className="flex flex-1 overflow-hidden">
				<SidebarDriver />

				<main className="flex-1 overflow-y-auto p-8">
					<Outlet />
				</main>
			</div>
		</div>
	);
};

export default DriverLayout;

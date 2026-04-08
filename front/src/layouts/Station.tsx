import { Outlet } from "react-router-dom";

import TopbarStation from "../components/station/Topbar";
import SidebarStation from "../components/station/Sidebar";

const StationLayout = () => {
	return (
		<div className="flex h-screen overflow-hidden">
			<SidebarStation />

			<main className="flex-1 overflow-y-auto">
				<TopbarStation />

				<div className="p-8">
					<Outlet />
				</div>
			</main>
		</div>
	);
};

export default StationLayout;

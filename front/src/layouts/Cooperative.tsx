import { Outlet } from "react-router-dom";

import SidebarCooperative from "../components/cooperative/Sidebar";
import TopbarCooperative from "../components/cooperative/Topbar";

const CooperativeLayout = () => {
    return (
        <div className="flex h-screen overflow-hidden">
            <SidebarCooperative />

            <main className="flex-1 overflow-y-auto">
                <TopbarCooperative />

                <div className="p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default CooperativeLayout;

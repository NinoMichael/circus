import { Outlet } from "react-router-dom"
import Header from "../components/inc/Header"

const DefaultLayout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-grow p-4">
                <Outlet />
            </main>
        </div>
    )
}

export default DefaultLayout
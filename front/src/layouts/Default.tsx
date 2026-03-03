import { Outlet } from "react-router-dom"
import Header from "../components/inc/Header"
import Footer from "../components/inc/Footer"

const DefaultLayout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-grow p-4">
                <Outlet />
            </main>

            <Footer />
        </div>
    )
}

export default DefaultLayout
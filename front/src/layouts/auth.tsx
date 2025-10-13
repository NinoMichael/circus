import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
    return (
        <div>
            <main className="flex-grow p-4">
                <Outlet />
            </main>
        </div>
    )
}

export default AuthLayout
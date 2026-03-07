import { useState } from "react"
import { LuLock, LuEye, LuEyeOff, LuLogIn } from "react-icons/lu"
import { CiAt } from "react-icons/ci"
import { Link } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"

const Login = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { loading, error } = useAuth()
    // const navigate = useNavigate()

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        // const user = await login({ email, password })
        // if (user) {
        //     navigate("/")
        // }
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="rounded-lg shadow-lg bg-white overflow-hidden">
                    <div className="bg-gradient-to-b from-[#FFD633]/50 to-[#FFD633]/20 px-8 py-8 text-center">
                        <h1 className="text-xl font-bold text-gray-800">Heureux de vous revoir !</h1>
                    </div>

                    <div className="px-8 py-8">
                        <h2 className="text-lg font-bold mb-1 text-gray-800">Se connecter</h2>
                        <p className="text-sm mb-6 text-gray-500 font-semibold">Veuillez entrer vos identifiants</p>

                        <form className="space-y-5" onSubmit={handleSubmit}>
                            <div>
                                <label className="block text-sm font-medium mb-1.5">
                                    E-mail ou Téléphone
                                </label>
                                <div className="relative">
                                    <CiAt className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" />
                                    <input
                                        type="text"
                                        placeholder="votre@email.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full rounded-sm border border-gray-400 bg-white pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#FFD633] focus:border-none duration-200 transition-all"
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between mb-1.5">
                                    <label className="text-sm font-medium">Mot de passe</label>
                                    <Link to="#" className="text-sm font-semibold text-[#FFD633] hover:underline">
                                        Oublié ?
                                    </Link>
                                </div>
                                <div className="relative">
                                    <LuLock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full rounded-md border border-gray-400 bg-white pl-10 pr-10 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#FFD633] focus:border-none duration-200 transition-all"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2"
                                    >
                                        {showPassword ? <LuEyeOff className="w-4 h-4" /> : <LuEye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            {error && (
                                <ul className="text-sm text-red-500 space-y-1">
                                    {error.map((e, i) => <li key={i}>{e}</li>)}
                                </ul>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-[#FFD633] font-semibold py-3 rounded-md hover:opacity-90 text-sm flex items-center justify-center gap-2 hover:scale-105 transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
                            >
                                {loading ? "Connexion..." : (<>Se connecter <LuLogIn className="w-4 h-4" /></>)}
                            </button>
                        </form>

                        <p className="text-center text-sm mt-6">
                            Pas encore de compte ?{" "}
                            <Link to="#" className="font-medium text-[#FFD633] hover:underline">
                                Créer un compte
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
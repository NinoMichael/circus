import type { JSX } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function GuestOrPassengerRoute({ children }: { children: JSX.Element }) {
	const { user, isLoggedIn, checking } = useAuth();

	if (checking) return null;

	if (!isLoggedIn) {
		return children;
	}

	if (user?.role === "passenger") {
		return children;
	}

	switch (user?.role) {
		case "driver":
			return <Navigate to="/driver/overview" replace />;
		case "cooperative":
			return <Navigate to="/cooperative/overview" replace />;
		case "admin":
			return <Navigate to="/admin/dashboard" replace />;
		default:
			return <Navigate to="/" replace />;
	}
}

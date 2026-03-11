import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { getCookie } from "../lib/helpers";
import type { ProtectedProps } from "../lib/types/common";

export const ProtectedRoute: React.FC<ProtectedProps> = ({
	roles,
	children,
}) => {
	const { user, isLoggedIn, checking } = useAuth();

	const token = getCookie("token");

	if (checking) return null;

	/* Verify auth status & role user for route access */
	if (!isLoggedIn) {
		return <Navigate to={`/login`} replace />;
	}

	if (!isLoggedIn && !token) {
		return <Navigate to={`/login`} replace />;
	}

	if (roles && !roles.includes(user!.role)) {
		return <Navigate to="/forbidden" replace />;
	}

	return <>{children}</>;
};

import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const AutoRedirect = () => {
	const { user, isLoggedIn, checking } = useAuth();

	if (checking) return null;

	if (isLoggedIn) {
		switch (user?.role) {
			case "passenger":
				<Navigate to={`/`} replace />;
				break;
			case "driver":
				<Navigate to={`/driver/overview`} replace />;
				break;
			case "cooperative":
				<Navigate to={`/`} replace />;
				break;
			case "manager":
				<Navigate to={`/`} replace />;
				break;
			case "admin":
				<Navigate to={`/admin/dashboard`} replace />;
				break;
			default:
				<Navigate to={`/`} replace />;
				break;
		}
	}

	return <Navigate to={`/login`} replace />;
};

export default AutoRedirect;

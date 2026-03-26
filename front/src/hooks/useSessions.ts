import { useState, useCallback } from "react";
import { SessionService } from "../services/SessionService";
import type { SessionsResponse, SessionDestroyResponse } from "../lib/types/session";

export function useSessions() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const { getAll, destroy, destroyAll } = SessionService;

	const fetchSessions = useCallback(
		async (): Promise<SessionsResponse | undefined> => {
			setLoading(true);
			setError(null);

			try {
				const data = await getAll();
				return data;
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
			} catch (err: any) {
				setError(err.response?.data?.message);
			} finally {
				setLoading(false);
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	);

	const removeSession = useCallback(
		async (sessionId: string): Promise<SessionDestroyResponse | undefined> => {
			setLoading(true);
			setError(null);

			try {
				const data = await destroy(sessionId);
				return data;
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
			} catch (err: any) {
				setError(err.response?.data?.message);
			} finally {
				setLoading(false);
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	);

	const removeAllSessions = useCallback(
		async (): Promise<SessionDestroyResponse | undefined> => {
			setLoading(true);
			setError(null);

			try {
				const data = await destroyAll();
				return data;
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
			} catch (err: any) {
				setError(err.response?.data?.message);
			} finally {
				setLoading(false);
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	);

	return {
		loading,
		error,
		fetchSessions,
		removeSession,
		removeAllSessions,
	};
}

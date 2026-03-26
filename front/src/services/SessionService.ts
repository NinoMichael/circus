import { api } from "./api";
import type { SessionsResponse, SessionDestroyResponse } from "../lib/types/session";

export const SessionService = {
	async getAll(): Promise<SessionsResponse> {
		const response = await api.get<SessionsResponse>("/sessions");
		return response.data;
	},

	async destroy(sessionId: string): Promise<SessionDestroyResponse> {
		const response = await api.delete<SessionDestroyResponse>(`/sessions/${sessionId}`);
		return response.data;
	},

	async destroyAll(): Promise<SessionDestroyResponse> {
		const response = await api.delete<SessionDestroyResponse>("/sessions");
		return response.data;
	},
};

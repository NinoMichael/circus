import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { pageTransition } from "../../lib/utils/animation";
import type { DriverSettings } from "../../lib/types/settings";
import type { SessionData } from "../../lib/types/session";

import { useSettings } from "../../hooks/useSettings";
import { useAuth } from "../../hooks/useAuth";
import { useSessions } from "../../hooks/useSessions";

import Switch from "@mui/material/Switch";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";

import NotificationsIcon from "@mui/icons-material/Notifications";
import HistoryIcon from "@mui/icons-material/History";
import PersonIcon from "@mui/icons-material/Person";
import SecurityIcon from "@mui/icons-material/Security";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import TabletMacIcon from "@mui/icons-material/TabletMac";
import DeviceUnknownIcon from "@mui/icons-material/DeviceUnknown";

interface ToggleSwitchProps {
	checked: boolean;
	onChange: (checked: boolean) => void;
	label: string;
	description: string;
}

const ToggleSwitch = ({
	checked,
	onChange,
	label,
	description,
}: ToggleSwitchProps) => (
	<div className="flex justify-between items-center py-4 border-b border-gray-100 w-full">
		<div className="flex-1 pr-4">
			<p className="text-base font-semibold text-gray-800">{label}</p>
			<p className="text-sm text-gray-500 mt-1">{description}</p>
		</div>
		<Switch
			checked={checked}
			onChange={(e) => onChange(e.target.checked)}
			sx={{
				"& .MuiSwitch-switchBase.Mui-checked": {
					color: "#FFCC00",
				},
				"& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
					backgroundColor: "#FFCC00",
				},
			}}
		/>
	</div>
);

const SettingDriver = () => {
	const { user } = useAuth();
	const { loading, error, fetchAll, update } = useSettings();
	const { loading: sessionsLoading, fetchSessions } = useSessions();
	const [settings, setSettings] = useState<DriverSettings | null>(null);
	const [sessions, setSessions] = useState<SessionData[]>([]);
	const [successMessage, setSuccessMessage] = useState<string | null>(null);
	const [, setSaving] = useState(false);

	useEffect(() => {
		const loadSettings = async () => {
			const response = await fetchAll();
			if (response?.data) {
				setSettings(response.data as DriverSettings);
			}
		};

		loadSettings();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		const loadSessions = async () => {
			const response = await fetchSessions();
			if (response?.data) {
				setSessions(response.data);
			}
		};

		loadSessions();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleNotificationChange = async (
		key: "sms_alerts" | "email_reports" | "security_alerts",
		value: boolean
	) => {
		if (!settings) return;

		setSaving(true);
		setSuccessMessage(null);

		const updatedSettings = {
			...settings.notifications,
			[key]: value,
		};

		try {
			await update("notifications", updatedSettings);
			setSettings((prev) =>
				prev ? { ...prev, notifications: updatedSettings } : null
			);
			setSuccessMessage("Paramètres enregistrés avec succès");
			setTimeout(() => setSuccessMessage(null), 3000);
		} catch {
			setSaving(false);
		}
	};

	if (loading && !settings) {
		return (
			<div className="flex justify-center items-center h-64">
				<CircularProgress sx={{ color: "#FFCC00" }} />
			</div>
		);
	}

	if (error) {
		return (
			<Alert severity="error" className="m-2">
				{error}
			</Alert>
		);
	}

	const notifications = settings?.notifications || {
		sms_alerts: true,
		email_reports: true,
		security_alerts: true,
	};

	return (
		<motion.div
			className="flex flex-col items-start gap-8 mb-16"
			initial="initial"
			animate="animate"
			exit="exit"
			variants={pageTransition}
			transition={{ duration: 0.35 }}
		>
			<div className="flex flex-col items-start gap-2 w-full max-w-4xl">
				<h1 className="text-3xl font-extrabold text-gray-700">
					Paramètres de profil
				</h1>
				<p className="text-base text-gray-500">
					Personnalisez votre expérience et gérez votre visibilité sur la
					plateforme.
				</p>
			</div>

			{successMessage && (
				<Alert severity="success" className="w-full max-w-4xl mb-2">
					{successMessage}
				</Alert>
			)}

			<div className="grid md:grid-cols-3 gap-8 items-start">
				<div className="md:col-span-2 flex flex-col items-start gap-6">
					<div className="flex p-6 flex-col items-start gap-6 rounded-2xl border border-gray-100 bg-white shadow-sm w-full">
						<div className="flex items-center gap-3">
							<div className="flex p-2 items-start rounded-lg bg-primary/10 w-fit">
								<NotificationsIcon className="text-primary" />
							</div>
							<p className="text-xl font-bold text-gray-900">
								Préférences de notification
							</p>
						</div>

						<div className="flex flex-col w-full">
							<ToggleSwitch
								checked={notifications.sms_alerts}
								onChange={(checked) =>
									handleNotificationChange("sms_alerts", checked)
								}
								label="Alertes SMS"
								description="Recevez des mises à jour critiques de planning directement sur votre mobile."
							/>
							<ToggleSwitch
								checked={notifications.email_reports}
								onChange={(checked) =>
									handleNotificationChange("email_reports", checked)
								}
								label="Rapports par Email"
								description="Récapitulatif hebdomadaire de vos missions et documents de facturation."
							/>
							<ToggleSwitch
								checked={notifications.security_alerts}
								onChange={(checked) =>
									handleNotificationChange("security_alerts", checked)
								}
								label="Alertes de Sécurité"
								description="Notifications immédiates pour tout changement d'itinéraire ou incident de sécurité."
							/>
						</div>
					</div>

					<div className="flex p-6 flex-col items-start gap-6 rounded-2xl border border-gray-100 bg-white shadow-sm w-full">
						<div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center w-full">
							<div className="flex items-center gap-2">
								<div className="flex p-2 sm:items-start rounded-lg bg-primary/10 w-fit">
									<HistoryIcon className="text-primary" />
								</div>
								<p className="text-xl font-bold text-gray-900">
									Historique de connexion
								</p>
							</div>
						</div>

						{sessionsLoading ? (
							<div className="flex justify-center py-8 w-full">
								<CircularProgress sx={{ color: "#FFCC00" }} />
							</div>
						) : sessions.length === 0 ? (
							<p className="text-sm text-center text-gray-500 py-4 flex justify-center items-center mx-auto">
								Aucune session trouvée
							</p>
						) : (
							<div className="flex flex-col gap-4 w-full">
								{sessions.slice(0, 5).map((session) => (
									<div
										key={session.id}
										className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 rounded-xl border border-gray-100 gap-3"
									>
										<div className="flex items-center gap-3">
											<div className="flex justify-center items-center rounded-full bg-gray-100 w-10 h-10 shrink-0">
												{session.device_type === "Mobile" ? (
													<SmartphoneIcon className="text-gray-600" />
												) : session.device_type === "Tablet" ? (
													<TabletMacIcon className="text-gray-600" />
												) : session.device_type === "Desktop" ? (
													<LaptopMacIcon className="text-gray-600" />
												) : (
													<DeviceUnknownIcon className="text-gray-600" />
												)}
											</div>
											<div className="flex flex-col">
												<p className="text-sm font-semibold text-gray-800">
													{session.device_type} - {session.browser}
												</p>
												<p className="text-xs text-gray-500">
													{session.os}{" "}
													{session.ip_address && `• ${session.ip_address}`}
												</p>
											</div>
										</div>
										<div className="flex items-center gap-3 ml-13 sm:ml-0">
											<div className="flex flex-col items-start sm:items-end">
												<p className="text-xs font-medium text-gray-800">
													{session.last_activity}
												</p>
												<span
													className={`text-xs px-2 py-0.5 rounded-full ${
														session.is_current
															? "bg-green-100 text-green-700"
															: "bg-gray-100 text-gray-500"
													}`}
												>
													{session.is_current ? "Actif" : "Terminé"}
												</span>
											</div>
										</div>
									</div>
								))}
							</div>
						)}
					</div>
				</div>

				<div className="md:col-span-1 flex flex-col items-start">
					<div className="flex p-6 flex-col items-start gap-6 rounded-2xl border border-gray-100 bg-white shadow-sm w-full">
						<div className="flex items-center gap-3">
							<div className="flex p-2 items-start rounded-lg bg-primary/10 w-fit">
								<PersonIcon className="text-primary" />
							</div>
							<p className="text-xl font-bold text-gray-900">
								Statut d'Activité
							</p>
						</div>

						<div className="flex flex-col gap-3 w-full">
							{user?.driver?.status === "active" ? (
								<div className="flex items-center gap-3 p-4 rounded-xl border-2 border-green-500 bg-green-50">
									<div className="flex justify-center items-center rounded-full bg-green-100 w-10 h-10">
										<CheckCircleIcon className="text-green-500" />
									</div>
									<div>
										<p className="text-base font-semibold text-gray-800">
											En service
										</p>
										<p className="text-xs text-gray-500">
											Disponible pour mission
										</p>
									</div>
								</div>
							) : (
								<div className="flex items-center gap-3 p-4 rounded-xl border-2 border-red-500 bg-red-50">
									<div className="flex justify-center items-center rounded-full bg-red-100 w-10 h-10">
										<CancelIcon className="text-red-500" />
									</div>
									<div>
										<p className="text-base font-semibold text-gray-800">
											Suspendu
										</p>
										<p className="text-xs text-gray-500">
											Vous ne pouvez pas recevoir de missions
										</p>
									</div>
								</div>
							)}
						</div>

						<div className="flex flex-col gap-4 p-4 rounded-xl bg-gray-50 w-full">
							<div className="flex items-center gap-2">
								<SecurityIcon className="text-xs text-gray-500" />
								<p className="text-xs text-gray-500">
									Votre statut est géré par l'administrateur. Veuillez le
									contacter pour toute modification.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</motion.div>
	);
};

export default SettingDriver;

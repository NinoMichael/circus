import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

declare global {
	interface Window {
		gtag: (...args: unknown[]) => void;
		dataLayer: unknown[];
	}
}

// eslint-disable-next-line react-refresh/only-export-components
export const usePageTracking = () => {
	const location = useLocation();

	useEffect(() => {
		if (typeof window !== "undefined" && window.gtag) {
			window.gtag("config", GA_MEASUREMENT_ID, {
				page_path: location.pathname + location.search,
			});
		}
	}, [location]);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [location]);
};

export const Analytics = () => {
	const location = useLocation();

	useEffect(() => {
		if (typeof window !== "undefined" && window.gtag) {
			window.gtag("config", GA_MEASUREMENT_ID, {
				page_path: location.pathname + location.search,
				page_title: document.title,
			});
		}
	}, [location]);

	return null;
};

// eslint-disable-next-line react-refresh/only-export-components
export const trackEvent = (
	eventName: string,
	eventParams?: Record<string, unknown>
) => {
	if (typeof window !== "undefined" && window.gtag) {
		window.gtag("event", eventName, eventParams);
	}
};

// eslint-disable-next-line react-refresh/only-export-components
export const trackSearch = (searchTerm: string, resultsCount: number) => {
	trackEvent("search", {
		search_term: searchTerm,
		number_of_results: resultsCount,
	});
};

// eslint-disable-next-line react-refresh/only-export-components
export const trackBooking = (
	tripId: string,
	departure: string,
	arrival: string,
	price: number
) => {
	trackEvent("purchase", {
		currency: "MGA",
		value: price,
		items: [
			{
				item_id: tripId,
				item_name: `${departure} → ${arrival}`,
				item_category: "transport",
				quantity: 1,
				price: price,
			},
		],
	});
};

// eslint-disable-next-line react-refresh/only-export-components
export const trackPageView = (pagePath: string, pageTitle: string) => {
	trackEvent("page_view", {
		page_path: pagePath,
		page_title: pageTitle,
	});
};

const GoogleAnalytics = () => {
	return (
		<Helmet>
			<script
				async
				src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
			/>
			<script type="text/javascript">
				{`
					window.dataLayer = window.dataLayer || [];
					function gtag(){dataLayer.push(arguments);}
					gtag('js', new Date());
					gtag('config', '${GA_MEASUREMENT_ID}', {
						cookie_flags: 'SameSite=Lax;Secure',
						allow_google_signals: true,
						allow_ad_personalization_signals: false
					});
				`}
			</script>
		</Helmet>
	);
};

export default GoogleAnalytics;

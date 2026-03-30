import { Helmet } from "react-helmet-async";
import type { SEOProps } from "../../lib/types/common";

const BASE_URL = import.meta.env.VITE_PROD_URL || "http://127.O.0.1:5173";
const SITE_NAME = "Circus";
const DEFAULT_DESCRIPTION =
	"Réservez vos voyages régionaux en taxi-brousse à Madagascar facilement et rapidement avec Circus.";

const SEO = ({
	title,
	description,
	keywords = "taxi-brousse, madagascar, réservation voyage, transport régional, bus, minibus",
	url = "",
	type = "website",
	author = "Circus",
	publishedTime,
	modifiedTime,
}: SEOProps) => {
	const fullTitle = title
		? `${title} | ${SITE_NAME}`
		: `${SITE_NAME} - Taxi-brousse Madagascar`;
	const fullUrl = url ? `${BASE_URL}${url}` : BASE_URL;

	return (
		<Helmet>
			<title>{fullTitle}</title>
			<meta name="title" content={fullTitle} />
			<meta name="description" content={description || DEFAULT_DESCRIPTION} />
			{keywords && <meta name="keywords" content={keywords} />}
			<meta name="author" content={author} />

			<link rel="canonical" href={fullUrl} />

			<meta property="og:type" content={type} />
			<meta property="og:url" content={fullUrl} />
			<meta property="og:title" content={fullTitle} />
			<meta
				property="og:description"
				content={description || DEFAULT_DESCRIPTION}
			/>
			<meta property="og:locale" content="fr_MG" />
			<meta property="og:site_name" content={SITE_NAME} />

			<meta property="twitter:card" content="summary" />
			<meta property="twitter:url" content={fullUrl} />
			<meta property="twitter:title" content={fullTitle} />
			<meta
				property="twitter:description"
				content={description || DEFAULT_DESCRIPTION}
			/>

			{type === "article" && (
				<>
					{publishedTime && (
						<meta property="article:published_time" content={publishedTime} />
					)}
					{modifiedTime && (
						<meta property="article:modified_time" content={modifiedTime} />
					)}
					<meta property="article:author" content={author} />
				</>
			)}

			<script type="application/ld+json">
				{JSON.stringify({
					"@context": "https://schema.org",
					"@type": type === "article" ? "Article" : "WebPage",
					name: fullTitle,
					description: description || DEFAULT_DESCRIPTION,
					url: fullUrl,
					publisher: {
						"@type": "Organization",
						name: SITE_NAME,
						url: BASE_URL,
					},
					...(type === "article" && {
						datePublished: publishedTime,
						dateModified: modifiedTime || publishedTime,
						author: {
							"@type": "Person",
							name: author,
						},
					}),
				})}
			</script>
		</Helmet>
	);
};

export default SEO;

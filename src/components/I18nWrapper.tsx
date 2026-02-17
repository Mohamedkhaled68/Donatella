import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

const SUPPORTED_LANGUAGES = ["en", "ar"];
const RTL_LANGUAGES = ["ar"];

export function I18nWrapper({ children }) {
	const { i18n } = useTranslation();
	const location = useLocation();
	const navigate = useNavigate();
	const lastLangRef = useRef<string | null>(null);

	useEffect(() => {
		// Extract language from URL path (e.g., /en/landing or /ar/profile)
		const pathSegments = location.pathname.split("/").filter(Boolean);
		const langFromUrl = pathSegments[0]?.toLowerCase();

		// Check if the first segment is a valid language
		const isValidLang = SUPPORTED_LANGUAGES.includes(langFromUrl);

		if (isValidLang) {
			// Only change language if it's different from both current i18n language AND last processed language
			if (i18n.language !== langFromUrl && lastLangRef.current !== langFromUrl) {
				console.log(`I18nWrapper: Changing language from ${i18n.language} to ${langFromUrl}`);
				lastLangRef.current = langFromUrl;

				i18n.changeLanguage(langFromUrl).catch((error) => {
					console.error(`I18nWrapper: Failed to change language to ${langFromUrl}:`, error);
				});
			}
		} else {
			// No valid language in URL, redirect to /en/[current-path]
			const newPath = `/en${location.pathname}${location.search}${location.hash}`;
			console.log(`I18nWrapper: No valid lang in URL, redirecting to ${newPath}`);
			navigate(newPath, { replace: true });
		}
	}, [location.pathname, i18n, navigate, location.hash, location.search]);

	// Set RTL/LTR direction based on current language
	useEffect(() => {
		const isRtl = RTL_LANGUAGES.includes(i18n.language);
		document.documentElement.dir = isRtl ? "rtl" : "ltr";
		document.documentElement.lang = i18n.language;
	}, [i18n.language]);

	return children;
}

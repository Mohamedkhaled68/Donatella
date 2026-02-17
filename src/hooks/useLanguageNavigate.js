import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SUPPORTED_LANGUAGES = ["en", "ar"];

/**
 * Hook that provides language-aware navigation
 * Automatically prefixes paths with the current language
 */
export const useLanguageNavigate = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const getCurrentLanguage = useCallback(() => {
		const pathSegments = location.pathname.split("/").filter(Boolean);
		return SUPPORTED_LANGUAGES.includes(pathSegments[0]) ? pathSegments[0] : "en";
	}, [location.pathname]);

	const languageNavigate = useCallback(
		(path, options = {}) => {
			const currentLang = getCurrentLanguage();

			// If path already starts with a language code, use it as is
			const pathSegments = path.split("/").filter(Boolean);
			if (SUPPORTED_LANGUAGES.includes(pathSegments[0])) {
				navigate(path, options);
				return;
			}

			// Otherwise, prefix with current language
			const langPath = path.startsWith("/") ? `/${currentLang}${path}` : `/${currentLang}/${path}`;
			navigate(langPath, options);
		},
		[navigate, getCurrentLanguage],
	);

	return { navigate: languageNavigate, currentLanguage: getCurrentLanguage() };
};

/**
 * Helper function to get language-aware path
 * @param {string} path - The path to prefix with language
 * @param {string} lang - The language code (defaults to current from URL)
 * @returns {string} - The language-prefixed path
 */
export const getLanguagePath = (path, lang = null) => {
	// Handle null, undefined, or empty path
	if (!path) {
		return "";
	}

	if (!lang) {
		const pathSegments = window?.location?.pathname?.split("/")?.filter(Boolean);
		lang = SUPPORTED_LANGUAGES.includes(pathSegments[0]) ? pathSegments[0] : "en";
	}

	// If path already starts with a language code, return as is
	const pathSegments = path.split("/").filter(Boolean);
	if (pathSegments.length > 0 && SUPPORTED_LANGUAGES.includes(pathSegments[0])) {
		return path;
	}

	// Otherwise, prefix with language
	return path.startsWith("/") ? `/${lang}${path}` : `/${lang}/${path}`;
};

import { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

export const LANGUAGES = ["ar", "en"];

const convertLanguageCode = (code) => {
	return code.toLowerCase();
};

export const useI18n = ({ defaultLanguage } = {}) => {
	const { t, i18n, ready } = useTranslation("translation", {
		useSuspense: false,
	});
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		// Only set language if defaultLanguage is explicitly provided (not undefined)
		if (defaultLanguage !== undefined) {
			const langCode = convertLanguageCode(defaultLanguage);
			if (i18n.language !== langCode) {
				// Await the language change to ensure it completes before cookie is set
				i18n.changeLanguage(langCode).catch((error) => {
					console.error(`Failed to change language to ${langCode}:`, error);
				});
			}
		}
	}, [defaultLanguage, i18n]);

	// Check if translations are actually loaded AND if we're on the correct language
	const targetLanguage = defaultLanguage !== undefined ? convertLanguageCode(defaultLanguage) : i18n.language;
	const isCorrectLanguage = i18n.language === targetLanguage;
	// Use ready flag from useTranslation which properly handles async loading
	const isReady = ready && isCorrectLanguage;

	const changeLanguage = useCallback(
		(newLanguage) => {
			// Update URL using React Router navigate (this triggers I18nWrapper to sync i18n with URL)
			const pathSegments = location.pathname.split("/").filter((segment) => segment !== "");

			// Remove the current language if it exists as the first segment
			if (pathSegments.length > 0 && LANGUAGES.includes(pathSegments[0])) {
				pathSegments.shift(); // Remove the first segment (current language)
			}

			// Construct new path with the new language
			const newPath = `/${newLanguage}/${pathSegments.join("/")}`;
			const fullPath = `${newPath}${location.search}${location.hash}`;
			navigate(fullPath, { replace: false });
		},
		[navigate, location],
	);

	return {
		t,
		i18n,
		currentLanguage: i18n.language,
		changeLanguage,
		isTranslating: !isReady,
		isRtl: i18n.language === "ar",
	};
};

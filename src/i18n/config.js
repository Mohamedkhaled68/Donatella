import i18n from "i18next";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

i18n
	.use(Backend) // Load translations from files
	.use(initReactI18next) // passes i18n down to react-i18next
	.init({
		lng: "en", // Set default language
		fallbackLng: "en",
		backend: {
			loadPath: "/locales/{{lng}}/{{ns}}.json",
		},

		interpolation: {
			escapeValue: false, // React already escapes
		},

		// Namespace configuration
		defaultNS: "translation",
		ns: ["translation"],

		// React options
		react: {
			useSuspense: false, // Keep this as false for SSR compatibility
		},

		// Ensure resources are loaded
		load: "languageOnly",

		// Preload all supported languages for better UX
		preload: ["en", "ar"],

		// Debug mode to see what's happening
		debug: false,
	});

export default i18n;

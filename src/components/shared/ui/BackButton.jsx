import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useI18n } from "../../../hooks/useI18n";
import { getLanguagePath } from "../../../hooks/useLanguageNavigate";

const BackButton = ({ size = 25, className, path }) => {
	const navigate = useNavigate();
	const { isRtl } = useI18n();

	const handleGoBack = () => {
		// If path is provided, navigate to that path with language prefix
		if (path) {
			const languagePath = getLanguagePath(path);
			navigate(languagePath);
		} else {
			// If no path provided, go back in browser history
			navigate(-1);
		}
	};

	const ArrowIcon = isRtl ? FaArrowRight : FaArrowLeft;

	return (
		<ArrowIcon
			className={`text-blue-primary cursor-pointer ${className}`}
			onClick={handleGoBack}
			size={size}
		/>
	);
};

export default BackButton;

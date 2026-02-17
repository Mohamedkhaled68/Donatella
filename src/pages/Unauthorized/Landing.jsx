import { useEffect } from "react";
import { Footer, Hero, Instructions, Models } from "../../components";
import { useI18n } from "../../hooks/useI18n";

const Landing = () => {
	const { isRtl } = useI18n();

	useEffect(() => {
		document.documentElement.dir = isRtl ? "rtl" : "ltr";
	}, [isRtl]);

	return (
		<>
			<Hero />
			<Models />
			<Instructions />
			<Footer />
		</>
	);
};

export default Landing;

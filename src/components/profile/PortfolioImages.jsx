import { useUserStore } from "../../store/userStore";
import EditorSpecialtyInfo from "./EditorSpecialtyInfo";
import ModelSpecialtyInfo from "./ModelSpecialtyInfo";
import PhotographerSpecialtyInfo from "./PhotographerSpecialtyInfo";
import PortfolioGrid from "./PortfolioGrid";
import VideographerSpecialtyInfo from "./VideographerSpecialtyInfo";

const PortfolioImages = () => {
	const userStatus = useUserStore((state) => state.userStatus);

	return (
		<>
			{userStatus.individual.role === "MODEL" ? (
				<>
					<PortfolioGrid userStatus={userStatus} />
					<ModelSpecialtyInfo userStatus={userStatus} />
				</>
			) : (
				<>
					<PortfolioGrid userStatus={userStatus} />
					{userStatus.individual.role === "EDITOR" && (
						<EditorSpecialtyInfo info={userStatus.individual.specialtyInfo} />
					)}
					{userStatus.individual.role === "VIDEOGRAPHER" && (
						<VideographerSpecialtyInfo info={userStatus.individual.specialtyInfo} />
					)}
					{userStatus.individual.role === "PHOTOGRAPHER" && (
						<PhotographerSpecialtyInfo info={userStatus.individual.specialtyInfo} />
					)}
				</>
			)}
		</>
	);
};

export default PortfolioImages;

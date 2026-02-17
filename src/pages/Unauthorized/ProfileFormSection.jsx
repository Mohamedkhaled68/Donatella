import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
	ArtistProfileForm,
	AthleteProfileForm,
	BackButton,
	BeautyProfileForm,
	EditorProfileForm,
	FashionProfileForm,
	Loading,
	LogoHeader,
	ModelProfileForm,
	MusicianProfileForm,
	PhotographerProfileForm,
	TourismProfileForm,
	VideographerProfileForm,
} from "../../components";
import LoadImage from "../../components/onBoarding/LoadImage";
import { useI18n } from "../../hooks/useI18n";
import {
	initialArtistImagesValues,
	initialAthleteImagesValues,
	initialBeatyImagesValues,
	initialFashionImagesValues,
	initialModelImagesValues,
	initialMusicianImagesValues,
	initialRestImagesValues,
	initialTourismImagesValues,
} from "../../utils/constants";

const modelImagesInputs = [
	{ id: "profile", label: "Profile Picture" },
	{ id: "portfolio", label: "Portfolio Picture" },
	{ id: "headshot", label: "Headshot" },
	{ id: "fullBody", label: "Full Body" },
];

const restImagesInputs = [
	{ id: "portfolio1", label: "Portfolio - 1" },
	{ id: "portfolio2", label: "Portfolio - 2" },
	{ id: "profile", label: "Profile Picture" },
	{ id: "reel", label: "Tik Tok / IG Reel" },
];

const musicianImagesInputs = [{ id: "profile", label: "Profile Picture" }];
const fashionImagesInputs = [
	{ id: "previousWork1", label: "Previous Work - 1" },
	{ id: "previousWork2", label: "Previous Work - 2" },
	{ id: "certificateProof", label: "Certificate proof" },
	{ id: "profile", label: "Profile Picture" },
];
const artistImagesInputs = [
	{ id: "previousWork1", label: "Previous Work - 1" },
	{ id: "previousWork2", label: "Previous Work - 2" },
	{ id: "profile", label: "Profile Picture" },
];
const athleteImagesInputs = [
	{ id: "fullbody", label: "Full Body Picture" },
	{ id: "trophies", label: "Trophies or Medals" },
	{ id: "profile", label: "Profile Picture" },
];
const beautyImagesInputs = [
	{ id: "previousWork1", label: "Previous Work - 1" },
	{ id: "previousWork2", label: "Previous Work - 2" },
	{ id: "certificateProof", label: "Certificate proof" },
	{ id: "profile", label: "Profile Picture" },
];
const tourismImagesInputs = [
	{ id: "certificateProof", label: "Certificate proof" },
	{ id: "profile", label: "Profile Picture" },
];

// Mapping from category enum names to display titles (based on API response)
const categoryMapping = {
	MODEL: "Modeling",
	VIDEOGRAPHER: "Videographing",
	PHOTOGRAPHER: "Photographing",
	EDITOR: "Photo & Video Editing",
	TOURISM: "Tourism & Historical Advising",
	BEAUTY: "Beauty & Cosmetics",
	ATHLETE: "Athleteic & Fitness Coaching",
	ARTIST: "Visual Arting & Design",
	FASHION: "Fashion Design",
	MUSIC_AND_SOUND_ENGINEER: "Music & Sound Engineering",
};

const ProfileFormSection = () => {
	const [role, setRole] = useState("");
	const [imageUrls, setImageUrls] = useState(null);
	const [loading, setLoading] = useState(false);

	const handleImageChange = (inputId, imageUrl) => {
		setImageUrls((prev) => ({
			...prev,
			[inputId]: imageUrl,
		}));
	};

	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const { currentLanguage } = useI18n();

	useEffect(() => {
		// Get category from search params
		const category = searchParams.get("category");
		console.log("category", category);

		if (!category) {
			navigate(`/${currentLanguage}/experience-form`, { replace: true });
		} else {
			console.log("category", category);
			// Map enum value to display name
			const displayName = categoryMapping[category] || category;
			setRole(displayName);
		}

		if (category === "MODEL") {
			console.log("MODEL");
			setImageUrls(initialModelImagesValues);
		} else if (category === "VIDEOGRAPHER" || category === "PHOTOGRAPHER" || category === "EDITOR") {
			console.log("VIDEOGRAPHER, PHOTOGRAPHER, EDITOR");
			setImageUrls(initialRestImagesValues);
		} else if (category === "MUSIC_AND_SOUND_ENGINEER") {
			console.log("MUSIC_AND_SOUND_ENGINEER");
			setImageUrls(initialMusicianImagesValues);
		} else if (category === "FASHION") {
			console.log("FASHION");
			setImageUrls(initialFashionImagesValues);
		} else if (category === "ARTIST") {
			console.log("ARTIST");
			setImageUrls(initialArtistImagesValues);
		} else if (category === "ATHLETE") {
			console.log("ATHLETE");
			setImageUrls(initialAthleteImagesValues);
		} else if (category === "BEAUTY") {
			console.log("BEAUTY");
			setImageUrls(initialBeatyImagesValues);
		} else if (category === "TOURISM") {
			console.log("TOURISM");
			setImageUrls(initialTourismImagesValues);
		}
	}, [searchParams, navigate, currentLanguage]);

	return (
		<section className="min-h-screen h-[100%] w-full text-white pb-10">
			{loading && (
				<div className="absolute w-full h-full flex justify-center items-center z-[10000] bg-black/50">
					<Loading />
				</div>
			)}
			<LogoHeader />
			<div className="flex gap-[50px]">
				<BackButton
					path={`/experience-form`}
					className={"mt-10 ml-4"}
				/>
				<div className="container mx-auto grid grid-cols-2 gap-6 mt-10">
					{role === "Modeling" && (
						<ModelProfileForm
							imageUrls={imageUrls}
							loading={loading}
							setLoading={setLoading}
							role={role}
						/>
					)}
					{role === "Videographing" && (
						<VideographerProfileForm
							imageUrls={imageUrls}
							loading={loading}
							setLoading={setLoading}
							role={role}
						/>
					)}
					{role === "Photographing" && (
						<PhotographerProfileForm
							imageUrls={imageUrls}
							loading={loading}
							setLoading={setLoading}
							role={role}
						/>
					)}
					{role === "Photo & Video Editing" && (
						<EditorProfileForm
							imageUrls={imageUrls}
							loading={loading}
							setLoading={setLoading}
							role={role}
						/>
					)}
					{role === "Music & Sound Engineering" && (
						<MusicianProfileForm
							imageUrls={imageUrls}
							loading={loading}
							setLoading={setLoading}
							role={role}
						/>
					)}
					{role === "Fashion Design" && (
						<FashionProfileForm
							imageUrls={imageUrls}
							loading={loading}
							setLoading={setLoading}
							role={role}
						/>
					)}
					{role === "Visual Arting & Design" && (
						<ArtistProfileForm
							imageUrls={imageUrls}
							loading={loading}
							setLoading={setLoading}
							role={role}
						/>
					)}
					{role === "Athleteic & Fitness Coaching" && (
						<AthleteProfileForm
							imageUrls={imageUrls}
							loading={loading}
							setLoading={setLoading}
							role={role}
						/>
					)}
					{role === "Beauty & Cosmetics" && (
						<BeautyProfileForm
							imageUrls={imageUrls}
							loading={loading}
							setLoading={setLoading}
							role={role}
						/>
					)}
					{role === "Tourism & Historical Advising" && (
						<TourismProfileForm
							imageUrls={imageUrls}
							loading={loading}
							setLoading={setLoading}
							role={role}
						/>
					)}
					{role && (
						<>
							{role === "Modeling" && (
								<div className="grid grid-cols-2 gap-6 justify-items-center self-start h-full px-4">
									{modelImagesInputs.map((input) => (
										<LoadImage
											onImageChange={handleImageChange}
											key={input.id}
											label={input.label}
											inputId={`${input.id}`}
										/>
									))}
								</div>
							)}

							{role === "Videographing" && (
								<div className="grid grid-cols-2 gap-6 justify-items-center self-start">
									{restImagesInputs.map((input) => (
										<LoadImage
											onImageChange={handleImageChange}
											key={input.id}
											label={input.label}
											inputId={`${input.id}`}
											className={
												input.id.startsWith("portfolio") ? "col-span-2 h-[150px]" : "col-span-1 max-w-[250px] h-[320px]"
											}
										/>
									))}
								</div>
							)}
							{role === "Photographing" && (
								<div className="grid grid-cols-2 gap-6 justify-items-center self-start">
									{restImagesInputs.map((input) => (
										<LoadImage
											onImageChange={handleImageChange}
											key={input.id}
											label={input.label}
											inputId={`${input.id}`}
											className={
												input.id.startsWith("portfolio") ? "col-span-2 h-[150px]" : "col-span-1 max-w-[250px] h-[320px]"
											}
										/>
									))}
								</div>
							)}
							{role === "Photo & Video Editing" && (
								<div className="grid grid-cols-2 gap-6 justify-items-center self-start">
									{restImagesInputs.map((input) => (
										<LoadImage
											onImageChange={handleImageChange}
											key={input.id}
											label={input.label}
											inputId={`${input.id}`}
											className={
												input.id.startsWith("portfolio") ? "col-span-2 h-[150px]" : "col-span-1 max-w-[250px] h-[320px]"
											}
										/>
									))}
								</div>
							)}

							{role === "Music & Sound Engineering" && (
								<div className="w-[50%] mx-auto">
									{musicianImagesInputs.map((input) => (
										<LoadImage
											key={input.id}
											label={input.label}
											inputId={`${input.id}`}
											onImageChange={handleImageChange}
											className={"h-[50%] mx-auto"}
										/>
									))}
								</div>
							)}

							{role === "Fashion Design" && (
								<div className="grid grid-cols-2 gap-6 justify-items-center self-start px-4">
									{fashionImagesInputs.map((input) => (
										<LoadImage
											key={input.id}
											label={input.label}
											inputId={`${input.id}`}
											onImageChange={handleImageChange}
											className={"h-[320px]"}
										/>
									))}
								</div>
							)}

							{role === "Visual Arting & Design" && (
								<div className="grid grid-cols-2 gap-6 justify-items-center self-start px-4">
									{artistImagesInputs.map((input) => (
										<LoadImage
											key={input.id}
											label={input.label}
											inputId={`${input.id}`}
											onImageChange={handleImageChange}
											className={"h-[320px]"}
										/>
									))}
								</div>
							)}
							{role === "Athleteic & Fitness Coaching" && (
								<div className="grid grid-cols-2 gap-6 justify-items-center self-start px-4">
									{athleteImagesInputs.map((input) => (
										<LoadImage
											key={input.id}
											label={input.label}
											inputId={`${input.id}`}
											onImageChange={handleImageChange}
											className={"h-[320px]"}
										/>
									))}
								</div>
							)}
							{role === "Beauty & Cosmetics" && (
								<div className="grid grid-cols-2 gap-6 justify-items-center self-start px-4">
									{beautyImagesInputs.map((input) => (
										<LoadImage
											key={input.id}
											label={input.label}
											inputId={`${input.id}`}
											onImageChange={handleImageChange}
											className={"h-[320px]"}
										/>
									))}
								</div>
							)}
							{role === "Tourism & Historical Advising" && (
								<div className="grid grid-cols-2 gap-6 justify-items-center self-start px-4">
									{tourismImagesInputs.map((input) => (
										<LoadImage
											key={input.id}
											label={input.label}
											inputId={`${input.id}`}
											onImageChange={handleImageChange}
											className={"h-[320px]"}
										/>
									))}
								</div>
							)}
						</>
					)}
				</div>
			</div>
		</section>
	);
};

export default ProfileFormSection;

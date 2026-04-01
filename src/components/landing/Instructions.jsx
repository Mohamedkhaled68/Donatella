import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { instructionImg1, instructionImg2, instructionImg3 } from "../../assets";
import { useI18n } from "../../hooks/useI18n";
import useAuthStore from "../../store/userTokenStore";
import Button from "../shared/ui/Button";

const Instructions = () => {
	const token = useAuthStore((state) => state.authToken);
	const navigate = useNavigate();
	const { t } = useI18n();

	const InstructionsData = [
		{
			btn: t("instructions.steps.0.button"),
			image: instructionImg1,
			title: t("instructions.steps.0.title"),
			description: t("instructions.steps.0.description"),
		},
		{
			btn: t("instructions.steps.1.button"),
			image: instructionImg2,
			title: t("instructions.steps.1.title"),
			description: t("instructions.steps.1.description"),
		},
		{
			btn: t("instructions.steps.2.button"),
			image: instructionImg3,
			title: t("instructions.steps.2.title"),
			description: t("instructions.steps.2.description"),
		},
	];

	const handleBtn = () => {
		if (token) {
			toast.error(t("instructions.alreadyLoggedIn"));
		} else {
			navigate("/signup");
		}
	};
	return (
		<section className="py-12 container mx-auto mb-10">
			<h1 className="text-center text-5xl lg:text-6xl font-display font-normal text-white-base mb-12">
				{t("instructions.title")}
			</h1>
			<div className="flex flex-col gap-12 w-[85%] mx-auto ">
				{InstructionsData.map(({ title, description, btn, image }, index) => (
					<div
						key={index}
						className="w-full bg-[#1F2224] border-[3px] border-[#f1f1f133] p-[30px] lg:p-[75px] rounded-br-3 text-white-base font-body flex flex-col lg:flex-row lg:[&:nth-child(2)]:flex-row-reverse items-center justify-center gap-[20px] lg:gap-[88px]"
					>
						<div
							className={`w-full lg:w-[80%] ${
								index === 1 && "flex justify-end"
							} h-full overflow-hidden rounded-br-3 border-[3px] border-[#fcfcfc]/20`}
						>
							<img
								className="filter grayscale w-full object-cover h-full"
								src={image}
								alt={title}
								loading="lazy"
							/>
						</div>
						<div className="flex flex-col">
							<span className="text-[42px] font-body font-black">#{index + 1}</span>
							<h1 className="text-xl lg:text-3xl font-body font-bold mb-3">{title}</h1>
							<p className="text-sm font-body text-white-base/60 font-normal">{description}</p>
							<div
								onClick={handleBtn}
								className="flex items-center gap-5 mt-8"
							>
								<Button className={"bg-white-base text-[#1F2224] font-light"}>{btn}</Button>
							</div>
						</div>
					</div>
				))}
			</div>
		</section>
	);
};

export default Instructions;

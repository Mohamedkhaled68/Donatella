import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";
import useAddTag from "../../hooks/explore/useAddTag";
import { useI18n } from "../../hooks/useI18n";

const TagInput = ({
	// tags,
	isInputVisible,
	setIsInputVisible,
	selectedTags,
	setSelectedTags,
}) => {
	const { t } = useI18n();
	const [tagInput, setTagInput] = useState("");
	const [tags, setTags] = useState([]);

	const { mutateAsync: addTag } = useAddTag();

	const handleTagInputChange = (e) => {
		setTagInput(e.target.value);
	};

	// const handleAddTag = async (e) => {
	//     if (e.key === "Enter" && tagInput.trim() !== "") {
	//         try {
	//             const newTag = { title: tagInput.trim() };
	//             await addTag(newTag);

	//             setTagInput("");
	//             setIsInputVisible(false);
	//         } catch (err) {
	//             toast.error(err?.response?.data?.message[0]);
	//         }
	//     }
	// };

	const handleAddTag = async (e) => {
		if (tagInput.trim() === "") return;

		if (e.key === "Enter" && tagInput.trim() !== "") {
			if (tagInput.trim()) {
				if (/^\d+$/.test(tagInput)) {
					toast.error(t("explore.tags.tagMustIncludeCharacters"));
					return;
				}
				try {
					const newTag = { title: tagInput.trim() };
					const tag = await addTag(newTag);

					if (selectedTags.some((selectedTag) => selectedTag === tag.id)) {
						setSelectedTags(selectedTags.filter((t) => t !== tag.id));
						setTags(tags.filter((t) => t.title !== tag.title));
					} else {
						setSelectedTags([...selectedTags, tag.id]);
						setTags([...tags, tag]);
					}
					setTagInput("");
					setIsInputVisible(false);
				} catch (err) {
					toast.error(err?.response?.data?.message[0]);
				}
			}
		}
	};

	// const handleTagClick = (tag) => {
	//     if (selectedTags.some((selectedTag) => selectedTag === tag.id)) {
	//         setSelectedTags(selectedTags.filter((t) => t !== tag.id));
	//     } else {
	//         setSelectedTags([...selectedTags, tag.id]);
	//     }
	// };

	const toggleInput = () => {
		setIsInputVisible(!isInputVisible);
		if (isInputVisible) {
			setTagInput("");
		}
	};

	return (
		<div className="tag-section mt-5">
			<label
				htmlFor="tags"
				className="text-lg text-white-base font-semibold"
			>
				{t("explore.tags.tags")}
			</label>
			<div className="flex flex-col gap-5 mt-3">
				<AnimatePresence>
					{isInputVisible && (
						<motion.div
							initial={{ opacity: 0, height: 0 }}
							animate={{ opacity: 1, height: "auto" }}
							exit={{ opacity: 0, height: 0 }}
							transition={{ duration: 0.2 }}
							className="mt-2"
						>
							<input
								type="text"
								id="tags"
								value={tagInput}
								onChange={handleTagInputChange}
								onKeyDown={handleAddTag}
								className="tag-input rounded-lg bg-transparent border border-[#94A3B8] text-[#94A3B8] px-4 py-2 w-full focus:outline-none focus:border-[#0C71D7]"
								placeholder={t("explore.tags.typeAndPressEnter")}
								maxLength={15}
								minLength={2}
							/>
						</motion.div>
					)}
				</AnimatePresence>

				<div className="flex flex-wrap gap-8 items-center">
					<div className="flex flex-wrap gap-3 items-center">
						{tags.map((tag) => (
							<motion.div
								key={tag?.id}
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								// onClick={() => handleTagClick(tag)}
								className={`tag-item cursor-pointer flex items-center gap-2 
                                ${
																	selectedTags.some((id) => id === tag?.id)
																		? "bg-[#0C71D7] text-white-base"
																		: "bg-white-base text-black"
																} 
                                rounded-sm py-2 px-4 text-sm font-normal transition-colors duration-200 flex justify-between items-center`}
							>
								<span className="capitalize">{tag.title}</span>
								<div
									onClick={() => {
										setSelectedTags(selectedTags.filter((id) => id !== tag?.id));
										setTags(tags.filter((t) => t.title !== tag.title));
									}}
									className="flex justify-center items-center w-[20px] h-[20px] rounded-full bg-transparent hover:bg-red-500 hover:text-white duration-300 cursor-pointer "
								>
									<IoClose size={15} />
								</div>
							</motion.div>
						))}
					</div>

					<motion.div
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						onClick={toggleInput}
						className={`cursor-pointer tag-item flex justify-center items-center  text-white-base bg-[#0C71D7] rounded-sm py-2 px-4 text-sm font-normal`}
					>
						<span className="capitalize">{isInputVisible ? t("explore.tags.cancel") : t("explore.tags.addTag")}</span>
					</motion.div>
				</div>
			</div>
		</div>
	);
};

export default TagInput;

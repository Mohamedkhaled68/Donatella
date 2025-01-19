import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useAddTag from "../../hooks/explore/useAddTag";

const TagInput = ({
    tags,
    setTags,
    isInputVisible,
    setIsInputVisible,
    selectedTags,
    setSelectedTags,
}) => {
    const [tagInput, setTagInput] = useState("");

    const { mutateAsync: addTag } = useAddTag();

    const handleTagInputChange = (e) => {
        setTagInput(e.target.value);
    };

    const handleAddTag = async (e) => {
        if (e.key === "Enter" && tagInput.trim() !== "") {
            try {
                const newTag = { title: tagInput.trim() };
                await addTag({ title: tagInput.trim() });
                setTags((prevTags) => [...prevTags, newTag.id]);

                setTagInput("");
                setIsInputVisible(false);
            } catch (err) {
                console.log(err);
            }
        }
    };

    const handleTagClick = (tag) => {
        const tagId = tag.id;
        if (selectedTags.some((selectedTag) => selectedTag.id === tagId)) {
            setSelectedTags(selectedTags.filter((t) => t.id !== tagId));
        } else {
            console.log(tagId);
            setSelectedTags([...selectedTags, tagId]);
        }
    };

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
                Tags
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
                                placeholder="Type and press Enter"
                                autoFocus
                            />
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="flex flex-wrap gap-8 items-center">
                    <div className="flex flex-wrap gap-3 items-center">
                        {tags.map((tag, index) => (
                            <motion.div
                                key={tag?.id || `tag-${index}`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleTagClick(tag)}
                                className={`tag-item cursor-pointer flex items-center gap-2 
                                ${
                                    selectedTags.some((id) => id === tag.id)
                                        ? "bg-[#0C71D7] text-white-base"
                                        : "bg-white-base text-black"
                                } 
                                rounded-sm py-2 px-4 text-sm font-normal transition-colors duration-200`}
                            >
                                <span className="capitalize">{tag.title}</span>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={toggleInput}
                        className="cursor-pointer tag-item flex justify-center items-center gap-2 text-white-base bg-[#0C71D7] rounded-sm py-2 px-4 text-sm font-normal"
                    >
                        <span className="capitalize">
                            {isInputVisible ? "Cancel" : "Add Tag +"}
                        </span>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default TagInput;

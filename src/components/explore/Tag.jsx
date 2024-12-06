import React, { useState } from "react";

const TagInput = ({ tags, setTags }) => {
    const [tagInput, setTagInput] = useState("");

    // Handle the input change
    const handleTagInputChange = (e) => {
        setTagInput(e.target.value);
    };

    // Add tag to the list
    const handleAddTag = (e) => {
        if (e.key === "Enter" && tagInput.trim() !== "") {
            setTags((prevTags) => [...prevTags, tagInput.trim()]);
            setTagInput(""); // Clear the input after adding
        }
    };

    // Remove a tag
    const handleRemoveTag = (tagToRemove) => {
        setTags((prevTags) => prevTags.filter((tag) => tag !== tagToRemove));
    };

    return (
        <div className="tag-section mt-5">
            <label
                htmlFor="tags"
                className="text-lg text-white-base font-semibold"
            >
                Tags
            </label>
            <div className="tag-input-container flex items-center gap-2 mt-2">
                <input
                    type="text"
                    id="tags"
                    value={tagInput}
                    onChange={handleTagInputChange}
                    onKeyDown={handleAddTag}
                    className="tag-input rounded-[28px] bg-transparent border-extra-thin border-[#94A3B8] text-[#94A3B8] text-medium font-body px-[18px] py-[14px] w-full"
                    placeholder="Add tags and press Enter"
                />
            </div>

            <div className="tags-display mt-4 flex flex-wrap gap-3">
                {tags.map((tag, index) => (
                    <div
                        key={index}
                        className="tag-item flex items-center gap-2 bg-white-base text-black rounded-sm py-1 px-4 text-sm font-normal"
                    >
                        <span className="capitalize">{tag}</span>
                        <button
                            type="button"
                            onClick={() => handleRemoveTag(tag)}
                            className="text-lg text-gray-500"
                        >
                            &times;
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TagInput;

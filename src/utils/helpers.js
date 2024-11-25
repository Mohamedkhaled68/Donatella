export const splitText = (text, wordsPerParagraph) => {
    if (text.includes(".")) {
        // Split based on dots and remove empty entries caused by consecutive dots or trailing dots
        return text
            .split(".")
            .filter((sentence) => sentence.trim() !== "")
            .map((sentence) => sentence.trim() + ".");
    } else {
        // Fallback to splitting by word count
        const words = text.split(/\s+/);
        const paragraphs = [];
        for (let i = 0; i < words.length; i += wordsPerParagraph) {
            const chunk = words.slice(i, i + wordsPerParagraph).join(" ");
            paragraphs.push(chunk);
        }
        return paragraphs;
    }
};

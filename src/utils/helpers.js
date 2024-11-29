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


export function haveCommonLetters(word1, word2) {
    // Convert both words to lowercase for case-insensitive comparison
    const prefix1 = word1.toLowerCase().slice(0, 2);
    const prefix2 = word2.toLowerCase().slice(0, 2);

    // Check if the first three letters are equal
    return prefix1 === prefix2;
}

export const dateFormat = (date) => {
    return new Date(date).getFullYear();
};


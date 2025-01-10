import { CountryEnum } from "./constants";

export const splitText = (text, wordsPerParagraph) => {
    if (text?.includes(".")) {
        // Split based on dots and remove empty entries caused by consecutive dots or trailing dots
        return text
            ?.split(".")
            .filter((sentence) => sentence?.trim() !== "")
            .map((sentence) => sentence?.trim() + ".");
    } else {
        // Fallback to splitting by word count
        const words = text?.split(/\s+/);
        const paragraphs = [];
        for (let i = 0; i < words?.length; i += wordsPerParagraph) {
            const chunk = words?.slice(i, i + wordsPerParagraph).join(" ");
            paragraphs?.push(chunk);
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

export const dateFormat = (dateString) => {
    const date = new Date(dateString);
    const currentDate = new Date();

    // Check if the date is in the current month and year
    if (
        date.getMonth() === currentDate.getMonth() &&
        date.getFullYear() === currentDate.getFullYear()
    ) {
        return "Now";
    }

    // Format the date to "Dec 2024"
    return date.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
    });
};

export const formatChatTimestamp = (timestamp) => {
    const now = new Date();
    const inputDate = new Date(timestamp);

    // Check if the timestamp is from today
    const isToday =
        inputDate.getDate() === now.getDate() &&
        inputDate.getMonth() === now.getMonth() &&
        inputDate.getFullYear() === now.getFullYear();

    // Format time
    const formattedTime = inputDate
        .toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        })
        .replace(" ", "")
        .toUpperCase();

    // Return formatted timestamp
    return isToday ? `today ${formattedTime}` : formattedTime;
};

export const getCountryByCode = (code) => {
    const countryEntries = Object.entries(CountryEnum.enums);
    const country = countryEntries.find(([_, value]) => value === code);
    return country ? country[0] : undefined;
};

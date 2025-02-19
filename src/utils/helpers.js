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
    // if (
    //     date.getMonth() === currentDate.getMonth() &&
    //     date.getFullYear() === currentDate.getFullYear()
    // ) {
    //     return "Now";
    // }

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

export const breakLongWords = (text, maxWordLength = 20) => {
    if (!text) return "";
    return text
        .split(" ")
        .map((word) =>
            word.length > maxWordLength
                ? word.match(new RegExp(`.{1,${maxWordLength}}`, "g")).join(" ")
                : word
        )
        .join(" ");
};

export const formatChatDate = (isoDateString) => {
    const date = new Date(isoDateString);

    const options = {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    };

    return date.toLocaleString(undefined, options);
};

export const formatUrl = (url) => {
    if (!url) return ""; // Handle empty input
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
        return `https://${url}`;
    }
    return url;
};

export const formatReviewDate = (dateString) => {
    const date = new Date(dateString);

    const options = { month: "short", day: "numeric", year: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);

    // Get the day and determine the correct suffix
    const day = date.getDate();
    const suffix =
        day % 10 === 1 && day !== 11
            ? "st"
            : day % 10 === 2 && day !== 12
            ? "nd"
            : day % 10 === 3 && day !== 13
            ? "rd"
            : "th";

    return formattedDate.replace(/\d+/, `${day}${suffix}`);
};

export const isNotEmailOrLink = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const urlRegex =
        /^(https?:\/\/|HTTPS?:\/\/|Http?:\/\/|HTTP?:\/\/)?([\w-]+(\.[\w-]+)+.*)$/;

    return !emailRegex.test(value) && !urlRegex.test(value);
};

export const timeAgo = (postedTime) => {
    const now = new Date();
    const postedDate = new Date(postedTime);
    const diffInSeconds = Math.floor((now - postedDate) / 1000);

    const intervals = {
        year: 31536000, // 60 * 60 * 24 * 365
        month: 2592000, // 60 * 60 * 24 * 30
        week: 604800, // 60 * 60 * 24 * 7
        day: 86400, // 60 * 60 * 24
        hour: 3600, // 60 * 60
        minute: 60,
        second: 1,
    };

    for (const [key, seconds] of Object.entries(intervals)) {
        const interval = Math.floor(diffInSeconds / seconds);
        if (interval >= 1) {
            return `${interval} ${key}${interval > 1 ? "s" : ""} ago`;
        }
    }

    return "just now";
};

export function compareTimeUnits(unit1, unit2, type) {
    const order = ["DAY", "WEEK", "MONTH", "YEAR"];

    const index1 = order.indexOf(unit1);
    const index2 = order.indexOf(unit2);

    if (index1 === -1 || index2 === -1) {
        throw new Error("Invalid time unit");
    }

    if (index1 === index2) return unit1.toLowerCase();
    if (type === "less")
        return index1 < index2 ? unit1.toLowerCase() : unit2.toLowerCase();
    if (type === "greater")
        return index1 > index2 ? unit1.toLowerCase() : unit2.toLowerCase();

    throw new Error("Invalid comparison type");
}

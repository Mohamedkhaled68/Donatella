const TextExpander = ({ text }) => {
    const truncateText = (text) => {
        if (text) {
            const words = text.split(" ");
            return words.length > 6
                ? words.slice(0, 6).join(" ") + "..."
                : text;
        }
    };

    return <>{truncateText(text)}</>;
};

export default TextExpander;

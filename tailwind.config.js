/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                display: "Playfair Display",
                body: "DM Sans",
                poppins: "Poppins",
            },
            colors: {
                "background-dark": "#101010",
                background: "#121417", // background color
                "gray-deep": "#323232", // gray-dark color
                "gray-base": "#3B3B3B", // gray color
                "gray-muted": "#9EABB8", // gray-blue color
                "blue-dark": "#001433", // navy color
                "blue-primary": "#197FE5", // blue color
                "white-base": "#FCFCFC", // white color
            },
            fontSize: {
                small: ["0.875rem", { lineHeight: "1.25rem" }], // 14px
                medium: ["1rem", { lineHeight: "1.5rem" }], // 16px
                large: ["1.25rem", { lineHeight: "1.75rem" }], // 20px
                "extra-large": ["1.5rem", { lineHeight: "2rem" }], // 24px
            },
            borderWidth: {
                "extra-thin": "0.9px",
                thin: "1px",
                medium: "2px",
                thick: "4px",
                "extra-thick": "8px",
            },
            borderRadius: {
                "br-1": "10px",
                "br-2": "20px",
                "br-3": "30px",
                "br-4": "40px",
                "br-5": "50px",
                "br-6": "60px",
                "br-7": "70px",
                "br-8": "80px",
                "br-9": "90px",
                "br-10": "100px",
            },
        },
    },
    plugins: [],
};

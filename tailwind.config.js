/** @type {import('tailwindcss').Config} */
module.exports = {
    // NOTE: Update this to include the paths to all files that contain Nativewind classes.
    content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            colors: {
                primary: "#e6b800", // main gold accent
                primaryDark: "#d4af37",
                primaryLight: "#e6b800", // normal button
                primaryDark: "#d4af37", // hover/pressed
                primaryDeep: "#b38600", // shadows / depth
                bgDark: "#0e0e0e",
                bgDarkLight: "#1a1a1a",
                bgDarkLighter: "#262626",
                cancel: "#8C1007"


            }
        },
    },
    plugins: [],
}

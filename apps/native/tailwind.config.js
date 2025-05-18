/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
    fontFamily: {
      "roboto-400": ["Roboto_400Regular"],
      "roboto-500": ["Roboto_500Medium"],
      "roboto-600": ["Roboto_600SemiBold"],
      "roboto-700": ["Roboto_700Bold"],
    }
  },
  plugins: [],
};

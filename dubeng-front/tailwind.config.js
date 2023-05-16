/** @type {import('tailwindcss').Config} */
const px_to_rem = (x) => {
  return { ...Array.from(Array(x + 1)).map((_, i) => `${i / 16}rem`) };
};

const num = (x) => {
  return { ...Array.from(Array(x + 1)).map((_, i) => `${i}`) };
};

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        dubblue: "#92b4ec",
        dubivory: "#fbfcec",
        dubpink: "#ffafa7",
        dubcoral: "#ff6d60",
        dubblack: "#393939",
        dubgray: "#767676",
        dubgraymedium: "#f1f2f5",
        dubgraylight: "#f8f8fa",
        dubgraydeep: "#dee2e6",
      },
      borderWidth: px_to_rem(100),
      borderRadius: px_to_rem(100),
      fontSize: px_to_rem(100),
      lineHeight: px_to_rem(100),
      width: px_to_rem(1500),
      height: px_to_rem(1500),
      margin: px_to_rem(100),
      padding: px_to_rem(100),
      minWidth: px_to_rem(1500),
      minHeight: px_to_rem(1500),
      spacing: px_to_rem(300),
      zIndex: num(300),
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};

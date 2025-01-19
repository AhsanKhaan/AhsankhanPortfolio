import type { Config } from "tailwindcss";
const svgToDataUri = require("mini-svg-data-uri");
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      backgroundImage: {
        'text-gradient': 'linear-gradient(139deg, var(--white), #fff 11%, #cae7b5 37%, #b0f0d0 56%, #23d67c 73%, #23d67c 87%, #6cce5e 95%, #23d67c)',
      },
      fontSize: {
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }], // Equivalent to text-4xl
        '7xl': ['4.5rem', { lineHeight: '1.2' }],    // Equivalent to md:text-7xl
      },
      fontWeight: {
        bold: '700', // Equivalent to font-bold
      },
    },
  },
  plugins: [
    addVariablesForColors
    // function ({ matchUtilities, theme }: any) {
    //   matchUtilities(
    //     {
    //       "bg-dot-thick": (value: any) => ({
    //         backgroundImage: `url("${svgToDataUri(
    //           `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="2.5"></circle></svg>`
    //         )}")`,
    //       }),
    //     },
    //     { values: flattenColorPalette(theme("backgroundColor")), type: "color" }
    //   );
    // },
  ],
} satisfies Config;




module.exports = {
  content: ["{pages,app}/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Pretendard Std",
          "Pretendard",
          "-apple-system",
          "system-ui",
          "Roboto",
          "Helvetica Neue",
          "Segoe UI",
          "Apple SD Gothic Neo",
          "Noto Sans KR",
          "sans-serif",
        ],
        mono: ["Fira Code", "monospace"],
      },
    },
  },
  corePlugins: {
    container: false,
  },
  plugins: [require("@tailwindcss/typography")],
}

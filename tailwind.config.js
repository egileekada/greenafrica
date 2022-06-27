module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./containers/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    borderWidth: {
      DEFAULT: "1px",
    },
    fontFamily: {
      display: ["Cerebri Sans"],
      displaybold: ["Cerebri Sans Bold"],
      body: ["Nunito Sans"],
    },
    extend: {
      fontSize: {
        base: ["16px", "21px"],
        xxs: ["10px", "12px"],
      },
      padding: {
        "1px": "1px",
        70: "70px",
      },
      margin: {
        70: "70px",
      },
      colors: {
        black: " #000000",
        primary: {
          main: "#FF6600",
          light: "#EF792A",
          fade: "#FF692324",
        },
        grey: {
          fa: "#F5F7FA",
          ed: "#EDEDED",
          fb: "#F3F6FB",
          gc: "#373C41",
          dark: "#1F1F1F",
          seven: "#777777",
        },
      },

      screens: {
        xlg: "1080px",
        tab: "900px",
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar"),
    require("@themesberg/flowbite/plugin"),
  ],
};

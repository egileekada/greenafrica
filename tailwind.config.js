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
      body: ["Cosmica"],
      title: ["Cosmica Semi-bold"],
      header: ["Cosmica Bold"],
      display: ["Cosmica Extra-bold"],
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
        dark: "#0E0E0E",
        green: "#47FF5A",
        primary: {
          main: "#261F5E",
          light: "#EF792A",
          fade: "#FF692324",
        },
        grey: {
          light: "#F8F8F8",
          dark: "#1F1F1F",
          seven: "#7A7794",
        },
      },

      screens: {
        xlg: "1080px",
        tab: "900px",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};

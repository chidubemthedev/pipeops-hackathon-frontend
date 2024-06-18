/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx", "./src/**/*.ts"],
  theme: {
    extend: {
      fontFamily: {
        poppings: ["poppins", "sans-serif"],
        walsheim: ["walsheim"],
        opensans: ["Open Sans", "sans-serif"],
        euclid: ["Euclid Circular B", "sans-serif"],
      },
      colors: {
        primary: "#601A35",
        primaryHover: "#A64A70",
        generalBlack: "#0E0E0E",
        neutral: "#363636",
        neutral300: "#CFCFCF",
      },
      boxShadow: {
        loginHeaderShadow: "0px 12px 22px 0px rgba(0, 0, 0, 0.05)",
        buttonShadow: "0px 4px 10px rgba(48, 10, 27, 0.5)",
        loginShadow: "0px -4px 10.6px 0px rgba(190, 190, 190, 0.25)",
        dropDownShadow: "0px 4px 19px 0px rgba(0, 0, 0, 0.25)",
      },
    },
  },
  plugins: [],
};

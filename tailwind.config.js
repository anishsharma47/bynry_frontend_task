/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xs: "321px",
      xxsm: "350px",
      xsm: "390px",
      sssm: "530px",
      ssm: "568px",
      sm: "640px",
      md: "768px",
      smlg: "992px",
      lg: "1025px",
      smxl: "1130px",
      xl: "1230px",
      xxl: "1440px",
      xxl1: "1600px",
      xxl2: "1800px",
      xxl3: "1940px",
      xxl4: "2044px",
      xxl5: "2190px",
      xxl6: "2300px",
      xxl7: "2500px",
    },
    extend: {
      colors: {
        primary_color: "#FBF6E6",
        orange_color: "#F07F26",
        red_color: "#D70320",
        purple_color: {
          800: "#96517E",
        },
      },
      fontFamily: {
        MontserratBold: ["MontserratBold"],
        MontserratRegular: ["MontserratRegular"],
        MontserratSemiBold: ["MontserratSemiBold"],
        MontserratMedium: ["MontserratMedium"],
        ClashGroteskSemiBold: ["ClashGroteskSemiBold"],
        ClashGroteskRegular: ["ClashGroteskRegular"],
        ClashGroteskBold: ["ClashGroteskBold"],
        ClashGroteskMedium: ["ClashGroteskMedium"],
      },
    },
  },
  plugins: [],
};

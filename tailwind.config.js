const withMT = require("@material-tailwind/react/utils/withMT");
 
module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    fontFamily:{
      Open_Sans:['Open_Sans','sans-sarif']
    }
  },
  plugins: [],
});



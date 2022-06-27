const path = require("path");

module.exports = {
  images: {
    disableStaticImages: true,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        { loader: "@svgr/webpack" },
        // {
        //   icon: true,
        // },
      ],
    });

    return config;
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
};

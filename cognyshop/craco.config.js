const webpack = require("webpack");

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.resolve.fallback = {
        buffer: require.resolve("buffer/"),
        crypto: require.resolve("crypto-browserify"),
        stream: require.resolve("stream-browserify"),
        path: require.resolve("path-browserify"),
        os: require.resolve("os-browserify/browser"),
        process: require.resolve("process/browser"),
        vm: require.resolve("vm-browserify"),
        util: require.resolve("util/"),
      };

      webpackConfig.plugins.push(
        new webpack.ProvidePlugin({
          Buffer: ["buffer", "Buffer"],
          process: "process/browser",
        })
      );

      return webpackConfig;
    },
  },
};

const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
// const CopyWebpackPlugin = require("copy-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const htmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = () => {
  return {
    optimization: {
      moduleIds: "named",
      chunkIds: "named",
    },
    entry: "./src/index.js",
    output: {
      filename: "[bundle].js",
      publicPath: "auto",
      uniqueName: "vue",
      chunkFilename: "[name].js",
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: "vue-loader",
        },
        {
          test: /.js$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "babel-loader",
              options: {
                cacheDirectory: true,
                presets: ["@babel/react", "@babel/env"],
              },
            },
          ],
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
    plugins: [
      new VueLoaderPlugin(),

      new ModuleFederationPlugin({
        // For remotes (please adjust)
        name: "vue",
        library: { type: "var", name: "vue" },
        filename: "remoteEntry.js",
        exposes: {
          "./web-components": "./src/main.js",
        },
        shared: ["vue", "core-js", '@joseavallejo12/state-lib'],
      }),
      new htmlWebpackPlugin({
        template: path.resolve(__dirname, "public", "index.html"),
        favicon: "./public/favicon.ico",
      }),
    ],
    devServer: {
      port: 4205,
    },
  };
};

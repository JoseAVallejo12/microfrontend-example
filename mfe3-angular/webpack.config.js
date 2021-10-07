const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const mf = require("@angular-architects/module-federation/webpack");
const path = require("path");
const share = mf.share;

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(path.join(__dirname, "tsconfig.json"), [
  /* mapped paths to share */
]);

module.exports = {
  output: {
    uniqueName: "mfe2",
    publicPath: "auto",
  },
  optimization: {
    runtimeChunk: false,
  },
  resolve: {
    alias: {
      ...sharedMappings.getAliases(),
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "mfe3_angular",
      filename: "remoteEntry.js",
      exposes: {
          './Module': './src/app/components/mfe-view/mfe-view.module.ts',
          './web-components': './src/bootstrap.ts',
      },
      shared: share({
        "@angular/core": {
          singleton: true,
          strictVersion: false,
          requiredVersion: "~12.1.1",
        },
        "@angular/common": {
          singleton: true,
          strictVersion: false,
          requiredVersion: "auto",
        },
        "@angular/common/http": {
          singleton: true,
          strictVersion: false,
          requiredVersion: "auto",
        },
        "@angular/router": {
          singleton: true,
          strictVersion: false,
          requiredVersion: "auto",
        },
        ...sharedMappings.getDescriptors(),
      }),
    }),
    sharedMappings.getPlugin(),
  ],
};

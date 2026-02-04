const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

const config = getDefaultConfig(__dirname);

// Include root node_modules and packages folder
config.watchFolders = [
  path.resolve(__dirname, "../../node_modules"),
  path.resolve(__dirname, "../../packages"),
];

config.resolver.extraNodeModules = {
  react: path.resolve(__dirname, "../../node_modules/react"),
  "react-native": path.resolve(__dirname, "../../node_modules/react-native"),
};

module.exports = config;

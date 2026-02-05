const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

const config = getDefaultConfig(__dirname);

const workspaceRoot = path.resolve(__dirname, "../../"); // root of monorepo

config.watchFolders = [
  workspaceRoot, // watch the whole repo
];

config.resolver = {
  ...config.resolver,
  extraNodeModules: new Proxy(
    {},
    {
      get: (_, name) => path.join(workspaceRoot, "node_modules", name), // redirect all node_modules to root
    },
  ),
  sourceExts: [...config.resolver.sourceExts, "ts", "tsx"],
};

module.exports = config;

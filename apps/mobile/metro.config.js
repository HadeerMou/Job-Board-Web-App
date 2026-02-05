const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

const config = getDefaultConfig(__dirname);

const workspaceRoot = path.resolve(__dirname, "../../"); // root of monorepo

// Watch the shared packages and root node_modules
config.watchFolders = [
  workspaceRoot,
  path.resolve(workspaceRoot, "packages/utils"),
  path.resolve(workspaceRoot, "packages/ui"),
];

// Redirect all node_modules to root node_modules
config.resolver.extraNodeModules = new Proxy(
  {},
  {
    get: (_, name) => path.join(workspaceRoot, "node_modules", name),
  }
);

// Support .ts and .tsx extensions
config.resolver.sourceExts = [...config.resolver.sourceExts, "ts", "tsx"];

module.exports = config;

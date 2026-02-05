module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            "@shared/utils": "../../packages/utils",
            "@shared/ui": "../../packages/ui",
          },
          extensions: [".ts", ".tsx", ".js", ".jsx"],
        },
      ],
    ],
  };
};

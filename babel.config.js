module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            "@": "./", // Proje kök dizinine işaret eder
          },
        },
      ],
    ],
  };
};

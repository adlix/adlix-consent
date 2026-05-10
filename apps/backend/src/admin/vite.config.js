const { mergeConfig } = require("vite");

module.exports = (config) => {
  return mergeConfig(config, {
    server: {
      allowedHosts: ["consent-adm.adlix-club.de"],
    },
  });
};

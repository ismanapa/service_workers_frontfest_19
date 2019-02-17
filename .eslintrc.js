module.exports = {
  extends: "airbnb-base",
  env: {
      browser: true,
      serviceworker: true,
  },
  rules: {
      "no-plusplus": "off",
      "no-console": "off",
      "no-alert": "off",
      "arrow-body-style": "off",
      "linebreak-style": "off",
      "func-names": "off",
      "no-restricted-globals": "off" // this gets really annoying with "self"
  },
  globals: {
      "getPrimes": true
  }
};
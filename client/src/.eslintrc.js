module.exports = {
    // ...other ESLint config options...
    overrides: [
      {
        files: ["**/*.test.js", "**/*.spec.js"],
        rules: {
          "jest/globals": "off"
        }
      }
    ]
  };
  
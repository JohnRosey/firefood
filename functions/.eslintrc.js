/* eslint-disable linebreak-style */
module.exports = {
  "root": true,
  "env": {
    es6: true,
    node: true,
  },
  "extends": [
    "eslint:recommended",
    "google"],
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaVersion": 9,
    "ecmaFeatures": {
      "jsx": true,
    }},

  "rules": {
    quotes: ["error", "double"],
  },
};

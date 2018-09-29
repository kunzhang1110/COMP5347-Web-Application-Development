module.exports = {
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true,
    "node": true,
    "jquery": true
  },
  "globals": {
    "google": false
  },
  "extends": ["eslint:recommended"],
  "parserOptions": {
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true,
      "jsx": true
    },
    "sourceType": "module"
  },
  "rules": {

    "indent": ["off", 2],
    "linebreak-style": ["warn","unix"],
    "quotes": ["off","single"],
    "semi": ["warn","always"],
    "no-console": ["off", { "allow": ["info", "error"] }]
  }
};

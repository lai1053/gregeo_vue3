module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-rational-order',
    'stylelint-config-prettier',
  ],
  rules: {
    'at-rule-no-unknown': null,
    'indentation': 2,
    'no-empty-source': null,
    'no-descending-specificity': null,
    'no-duplicate-selectors': null,
  },
}

module.exports = {
  arrowParens: 'avoid',
  bracketSameLine: true,
  bracketSpacing: true,
  singleQuote: true,
  trailingComma: 'all',
  tabWidth: 2,
  semi: true,
  printWidth: 100,
  plugins: ['@trivago/prettier-plugin-sort-imports'],
  importOrder: [
    // Group 1: External dependencies (handled by THIRD_PARTY_MODULES)
    '<THIRD_PARTY_MODULES>',
    // Group 2: Cross-module imports (src modules)
    '^\\./src/(.*)$',
    '^(\\.\\./)+(?:global|chat|settings|navigation|store|mocks)/(.*)$',
    // Group 3: Internal module imports (relative within same module)
    '^\\.\\./',
    '^\\.\/',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};

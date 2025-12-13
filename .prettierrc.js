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
    // Group 1: Third-party packages (npm dependencies)
    '<THIRD_PARTY_MODULES>',
    // Group 2: External module imports (2+ levels up = different src/ folder)
    // e.g., from chat/components/ → ../../global/ is external
    '^\\.\\./(\\.\\.)+',
    // Group 3: Internal module imports (1 level up or same = within same src/ folder)
    // e.g., from chat/components/ → ../queries/ is internal
    '^\\.\\./',
    '^\\.\/',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};

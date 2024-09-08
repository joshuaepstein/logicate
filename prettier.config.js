/** @type {import("prettier").Config} */
module.exports = {
  semi: true,
  tabWidth: 2,
  trailingComma: 'es5',
  singleQuote: true,
  endOfLine: 'lf',
  arrowParens: 'always',
  printWidth: 140,
  filepath: './*.{js,jsx,ts,tsx,json,md,html,css,scss,less,graphql,yml,yaml,svg,mdx}',

  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
  organizeImportsSkipDestructiveCodeActions: false,
  tailwindFunctions: ['cn', 'clsx', 'tw'],
  tailwindPreserveWhitespace: false,
  tailwindPreserveDuplicates: false,
  plugins: [
    '@ianvs/prettier-plugin-sort-imports',
    'prettier-plugin-packagejson',
    'prettier-plugin-organize-imports',
    'prettier-plugin-prisma',
    'prettier-plugin-tailwindcss',
    'prettier-plugin-sort-json',
  ],
};

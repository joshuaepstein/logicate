/** @return {import("eslint").Linter.Config} */
module.exports = function (workspaceDirPath) {
  return {
    root: true,
    extends: ['next', 'turbo'],
    plugins: ['simple-import-sort', '@typescript-eslint'],
    extends: ['plugin:@typescript-eslint/eslint-recommended', 'plugin:@typescript-eslint/recommended'],
    ignorePatterns: ['dist/', 'playwright-report/'],
    globals: {
      React: true,
      JSX: true,
    },
    parserOptions: {
      tsconfigRootDir: workspaceDirPath,
      project: `${workspaceDirPath}/tsconfig.json`,
    },
    overrides: [
      {
        files: ['**/*.ts', '**/*.tsx'],
        parser: '@typescript-eslint/parser',
        plugins: ['@typescript-eslint'],
        extends: ['plugin:@typescript-eslint/recommended'],
        rules: {
          '@typescript-eslint/no-unused-vars': 'off',
        },
      },
    ],
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
    },
  };
};

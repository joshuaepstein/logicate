/** @type {import("eslint").Linter.Config} */
module.exports = {
    extends: ["next", "turbo"],
    plugins: ["simple-import-sort", "@typescript-eslint"],
    extends: [
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended"
    ],

    globals: {
        React: true,
        JSX: true,
    },
    extends: [
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended"
    ],

    rules: {
        "@typescript-eslint/no-unused-vars": "off",
        "@typescript-eslint/no-unused-imports": "off"
    }
}
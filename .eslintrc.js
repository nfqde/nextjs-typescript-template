const featureFlags = require('@nfq/feature-flags/eslint/import')(['@app/features', '@nfq/feature-flags/jsx']);

const {withAliasesEslint} = require('./withAliases');

module.exports = {
    extends: [
        '@nfq'
    ],
    root: true,
    rules: {
        ...featureFlags.rules,
        '@typescript-eslint/strict-boolean-expressions': 'off'
    },
    settings: {'import/resolver': withAliasesEslint()}
};
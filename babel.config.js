const {withFeatureFlags} = require('@nfq/feature-flags/babel');

module.exports = withFeatureFlags({
    env: {
        test: {
            plugins: [
                ['@babel/plugin-proposal-decorators', {legacy: true}],
                ['@babel/plugin-proposal-class-properties', {loose: false}],
                ['@babel/plugin-transform-typescript'],
                ['styled-components', {
                    fileName: true,
                    preprocess: false,
                    pure: true,
                    ssr: true
                }],
                'istanbul'
            ],
            presets: [
                ['next/babel'],
                ['@babel/preset-typescript']
            ]
        }
    },
    plugins: [
        ['@babel/plugin-proposal-decorators', {legacy: true}],
        ['@babel/plugin-proposal-class-properties', {loose: false}],
        ['@babel/plugin-transform-typescript'],
        ['styled-components', {
            fileName: true,
            preprocess: false,
            pure: true,
            ssr: true
        }]
    ],
    presets: [
        [
            'next/babel',
            {'transform-react-remove-prop-types': {}}
        ],
        ['@babel/preset-typescript']
    ]
}, {
    deprecationEnv: 'live',
    featureFlagImport: '@app/features',
    jsxImport: '@nfq/feature-flags/jsx',
    jsxWithFeature: 'WithFeature',
    jsxWithoutFeature: 'WithoutFeature'
});
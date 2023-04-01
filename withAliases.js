/* eslint-disable no-param-reassign */
const path = require('path');

const aliases = [
    {
        alias: 'Classes',
        path: './src/classes/'
    },
    {
        alias: 'Components',
        path: './src/components/'
    },
    {
        alias: 'Configs',
        path: './src/configs/'
    },
    {
        alias: 'Fonts',
        path: './src/assets/fonts/'
    },
    {
        alias: 'Images',
        path: './src/assets/images/'
    },
    {
        alias: 'Modules',
        path: './src/modules/'
    },
    {
        alias: 'Server',
        path: './src/server/'
    },
    {
        alias: 'Stores',
        path: './src/stores/'
    },
    {
        alias: 'Utils',
        path: './src/utils/'
    }
];

const extensions = [
    '.js',
    '.ts',
    '.cjs',
    '.mjs',
    '.cts',
    '.mts',
    '.jsx',
    '.tsx',
    '.json',
    '.css',
    '.png',
    '.jpeg',
    '.jpg',
    '.svg',
    '.webp'
];

/**
 * Plugin for cors.
 *
 * @param {import('next').NextConfig} nextConfig The next config.
 *
 * @returns {import('next').NextConfig} The next config.
 */
const withAliases = nextConfig => ({
    ...nextConfig,
    /**
     * The webpack config.
     *
     * @param {any} config  The config to use.
     * @param {any} options The options.
     * @returns {any} The nextjs webpack config changed.
     */
    webpack(config, options) {
        aliases.forEach(alias => {
            config.resolve.alias[alias.alias] = path.resolve(__dirname, alias.path);
        });

        config.resolve.extensions = extensions;

        if (typeof nextConfig.webpack === 'function') {
            return nextConfig.webpack(config, options);
        }

        return config;
    }
});

/**
 * Generates aliases for eslint.
 *
 * @returns {any} Alias object.
 */
const withAliasesEslint = () => ({
    alias: {
        extensions,
        map: aliases.map(alias => ([alias.alias, alias.path]))
    }
});

module.exports = {
    aliases,
    extensions,
    withAliases,
    withAliasesEslint
};
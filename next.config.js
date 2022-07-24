/* eslint-disable no-param-reassign */
const withBundleAnalyzer = require('@next/bundle-analyzer')({enabled: process.env.ANALYZE === 'true'});
const {withFeatureFlags} = require('@nfq/feature-flags/next');
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');
const withPlugins = require('next-compose-plugins');

const {permissions} = require('./headers');
const {withAliases} = require('./withAliases');
const withCors = require('./withCors');

/** @type {import('next').NextConfig} */
const nextConfig = withPlugins(
    [withBundleAnalyzer, withFeatureFlags, withAliases, withCors],
    {
        eslint: {ignoreDuringBuilds: true},
        inlineImageLimit: false,
        productionBrowserSourceMaps: true,
        reactStrictMode: true,
        /**
         * The headers to send.
         *
         * @returns {Promise<Array<{headers: Array<{key: string, value: string}>, source: string}>>} The headers to send.
         */
        async headers() {
            return [{
                headers: [
                    {
                        key: 'X-DNS-Prefetch-Control',
                        value: 'on'
                    },
                    {
                        key: 'Strict-Transport-Security',
                        value: 'max-age=63072000; includeSubDomains; preload'
                    },
                    {
                        key: 'X-XSS-Protection',
                        value: '1; mode=block'
                    },
                    {
                        key: 'X-Frame-Options',
                        value: 'SAMEORIGIN'
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'same-origin'
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff'
                    },
                    {
                        key: 'Permissions-Policy',
                        value: permissions.join(', ')
                    }
                ],
                source: '/(.*)'
            }];
        },
        /**
         * The webpack config.
         *
         * @param {any} config The config to use.
         * @returns {any} The nextjs webpack config changed.
         */
        webpack(config) {
            config.module.rules.push({
                test: /\.ttf|\.woff2/u,
                type: 'asset/resource'
            });

            config.plugins.push(new DuplicatePackageCheckerPlugin());

            // config.resolve.alias.Classes = path.resolve(__dirname, 'src/classes/');
            // config.resolve.alias.Components = path.resolve(__dirname, 'src/components/');
            // config.resolve.alias.Configs = path.resolve(__dirname, 'src/configs/');
            // config.resolve.alias.Fonts = path.resolve(__dirname, 'src/assets/fonts/');
            // config.resolve.alias.Images = path.resolve(__dirname, 'src/assets/images/');
            // config.resolve.alias.Server = path.resolve(__dirname, 'src/server/');
            // config.resolve.alias.Stores = path.resolve(__dirname, 'src/stores/');
            // config.resolve.alias.Utils = path.resolve(__dirname, 'src/utils/');

            // config.resolve.extensions = [
            //     '.js',
            //     '.jsx',
            //     '.ts',
            //     '.tsx',
            //     '.json',
            //     '.css',
            //     '.png',
            //     '.jpeg',
            //     '.jpg',
            //     '.svg',
            //     '.webp'
            // ];

            return config;
        }
    }
);

module.exports = nextConfig;
import type {StorybookConfig} from "@storybook/nextjs";
import path from 'path';
import {aliases, extensions} from '../withAliases';

const config: StorybookConfig = {
    addons: [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@nfq/storybook-github-issues"
    ],
    core: {
        disableTelemetry: true, // 👈 Disables telemetry
    },
    framework: {
        name: "@storybook/nextjs",
        options: {},
    },
    docs: {
        autodocs: "tag",
    },
    staticDirs: ['../public'],
    stories: ["../src/client/ui/**/*.mdx", "../src/client/ui/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
    typescript: {
        reactDocgen: "react-docgen-typescript"
    },
    webpackFinal: async (config) => {
        if (config.resolve && config.resolve.fallback) {
            config.resolve.fallback['fs'] = false;
            config.resolve.fallback['stream'] = false;
            config.resolve.fallback['zlib'] = false;

            config.resolve.extensions = extensions;
        }

        aliases.forEach(alias => {
            if (config.resolve && config.resolve.alias) {
                config.resolve.alias[alias.alias] = path.resolve(__dirname, alias.path);
            }
        });

        return config;
    }
};

export default config;
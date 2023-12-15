import type {StorybookConfig} from "@storybook/nextjs";

const config: StorybookConfig = {
    stories: ["./stories/**/*.mdx", "./stories/**/*.stories.@(js|jsx|ts|tsx)"],
    addons: [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@nfq/storybook-github-issues"
    ],
    staticDirs: ['../public'],
    framework: {
        name: "@storybook/nextjs",
        options: {},
    },
    docs: {
        autodocs: "tag",
    },
    core: {
        disableTelemetry: true, // 👈 Disables telemetry
    },
    webpackFinal: async (config) => {
        if (config.resolve && config.resolve.fallback) {
            config.resolve.fallback['fs'] = false;
            config.resolve.fallback['stream'] = false;
            config.resolve.fallback['zlib'] = false;
        }

        return config;
    }
};

export default config;
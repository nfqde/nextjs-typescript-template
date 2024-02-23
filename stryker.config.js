// @ts-check
/** @type {import('@stryker-mutator/api/core').PartialStrykerOptions} */
module.exports = {
    commandRunner: {command: 'yarn test:cypress:ct'},
    coverageAnalysis: 'off',
    packageManager: 'yarn',
    reporters: ['html', 'clear-text', 'progress'],
    testRunner: 'command'
};
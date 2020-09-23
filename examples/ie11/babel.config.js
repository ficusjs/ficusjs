module.exports = function (api) {
    api.cache(false)
    const presets = [
        ['@babel/preset-typescript'],
        [
            '@babel/preset-env',
            {
                // debug: true,
                corejs: { version: 3 },
                useBuiltIns: 'usage',
                modules: false,
                targets: {
                    ie: '11'
                }
            }
        ]
    ]
    const plugins = [
        ['@babel/plugin-transform-classes'],
        ['@babel/plugin-proposal-class-properties'],
        ['@babel/transform-runtime']
    ]
    return {
        presets,
        plugins
    }
}

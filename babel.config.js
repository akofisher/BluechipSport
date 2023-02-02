module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            navigation: './src/navigation',
            components: './src/components',
            hooks: './src/hooks',
            screens: './src/screens',
            stores: './src/stores',
            styles: './src/styles',
            utils: './src/utils',
            localization: './src/localization',
            services: './src/services',
            assets: './assets',
            env: './env',
          },
        },
      ],
      'react-native-reanimated/plugin',
    ],
    env: {
      production: {
        plugins: ['transform-remove-console'],
      },
    },
  }
}

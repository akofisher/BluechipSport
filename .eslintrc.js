module.exports = {
  root: true,
  extends: ['@react-native-community'],
  parser: '@typescript-eslint/parser',
  env: {
    jest: true,
  },
  plugins: ['@typescript-eslint'],
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.js'],
      rules: {
        '@typescript-eslint/no-shadow': ['off'],
        'no-shadow': 'off',
        'no-undef': 'off',
        semi: 'off',
        'react-hooks/exhaustive-deps': [
          'error',
          {
            additionalHooks: '(useStaticCallback)',
          },
        ],
      },
    },
  ],
}

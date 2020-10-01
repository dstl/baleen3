module.exports = {
  stories: ['../src/**/*.stories.(ts|tsx|mdx)'],
  addons: [
    '@storybook/preset-create-react-app',
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
    '@storybook/addon-knobs',
    'storybook-dark-mode',
  ],
}

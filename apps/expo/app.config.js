const env = require('./env')

module.exports = {
  slug: 'Cookied',
  name: 'Cookied',
  scheme: 'cookied',
  assetBundlePatterns: ['**/*'],
  version: '1.0.0',
  extra: {
    ...env,
    MODE: !!env.MODE ? env.MODE : 'dev',
  },
  web: { bundler: 'metro' },
  platforms: ['ios', 'android'],
  ios: { bundleIdentifier: 'com.cookied' },
  android: { package: 'com.cookied' },
}

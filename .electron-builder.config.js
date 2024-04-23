/**
 * TODO: Rewrite this config to ESM
 * But currently electron-builder doesn't support ESM configs
 * @see https://github.com/develar/read-config-file/issues/10
 */

/**
 * @type {() => import('electron-builder').Configuration}
 * @see https://www.electron.build/configuration/configuration
 */
module.exports = async function () {
  const {getVersion} = await import('./version/getVersion.mjs');
  return {
    productName: 'chrome-fp',
    directories: {
      output: 'dist',
      buildResources: 'buildResources',
    },
    files: ['packages/**/dist/**', 'packages/**/assets/**', 'migrations'],
    extraResources: [
      {
        from: 'packages/main/src/native-addon/build/Release/',
        to: 'app.asar.unpacked/node_modules/window-addon/',
        filter: ['*.node'],
      },
      {
        from: 'Chrome-bin.zip',
        to: 'Chrome-bin.zip',
      },
      {
        from: 'migrations',
        to: 'app/migrations',
      },
      {
        from: 'assets',
        to: 'app/assets',
      },
    ],
    extraMetadata: {
      version: getVersion(),
    },
    asarUnpack: ['**/*.node'],
    nsis: {
      oneClick: false,
      allowElevation: true,
      allowToChangeInstallationDirectory: true,
      createDesktopShortcut: true,
      createStartMenuShortcut: true,
      shortcutName: 'chrome-fp',
    },

    win: {
      requestedExecutionLevel: 'requireAdministrator',
    },
  };
};

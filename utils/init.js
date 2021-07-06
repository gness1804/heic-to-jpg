const unhandled = require('cli-handle-unhandled');
const updateNotifier = require('update-notifier');
const welcome = require('cli-welcome');
const pkg = require('../package.json');

module.exports = () => {
  // check node version; fail if before 14
  const currNodeVersion = process.versions.node;
  if (currNodeVersion.split('.')[0] < 14)
    throw new Error(
      `Problem with Node version: this program requires Node version 14.0.0 or higher. You are running version ${currNodeVersion}.`,
    );

  // handle unhandled errors
  unhandled();
  welcome({
    title: pkg.name,
    tagLine: `by ${pkg.author}`,
    description: pkg.description,
    version: pkg.version,
    bgColor: '#c45f12',
    color: '#000',
    bold: true,
    clear: true,
  });

  updateNotifier({ pkg }).notify();
};

const meow = require('meow');
const meowHelp = require('cli-meow-help');
const pkg = require('../package.json');

const flags = {
  debug: {
    type: 'boolean',
    default: false,
    alias: 'd',
    desc: 'Print debug info.',
  },
  version: {
    type: 'boolean',
    alias: 'v',
    desc: 'Print CLI version.',
  },
};

const commands = {
  help: {
    desc: 'Print out help info.',
  },
};

const helpText = meowHelp({
  name: `npx ${pkg.name}`,
  desc: `
  ${pkg.description}

  Enter in a file name or directory as the first argument and the app will convert it.
  Example: 'heic-to-jpg example.HEIC'
  (creates heic-to-jpg example.jpg)
  `,
  flags,
  commands,
});

const options = {
  inferType: true,
  description: false,
  hardRejection: false,
  flags,
};

module.exports = meow(helpText, options);

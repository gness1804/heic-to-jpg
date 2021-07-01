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
  source: {
    type: 'string',
    alias: 's',
    desc: 'Must be either a *.HEIC file or a folder. If a file, converts that file to *.jpg; if a folder, converts all *.HEIC files in it. Will throw if a file type other than *.HEIC is entered or if something other than a valid file or folder path is entered.',
  },
};

const commands = {
  help: {
    desc: 'Print out help info.',
  },
};

const helpText = meowHelp({
  name: `npx ${pkg.name}`,
  desc: pkg.description,
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

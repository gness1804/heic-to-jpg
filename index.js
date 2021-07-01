#!/usr/bin/env node

/**
 * Converts heic files to jpeg. If argument is directory, converts all heic files in it to jpeg.
 * @see https://apple.stackexchange.com/questions/297134/how-to-convert-a-heif-heic-image-to-jpeg-in-el-capitan
 */

const { promises } = require('fs');
const init = require('./utils/init');
const cli = require('./utils/cli');
const log = require('./utils/log');
const execa = require('execa');
const ora = require('ora');
const alert = require('cli-alerts');
const { yellow, green } = require('chalk');

const { lstat, readdir } = promises;

const { flags, input, showHelp } = cli;
const { source, debug } = flags;

const spinner = ora({ text: '' });

(async () => {
  init();

  if (input.includes('help')) showHelp(0);

  if (!source) {
    throw new Error(
      'Input needed. Please enter a valid file or directory name.',
    );
  }

  try {
    debug && log(flags);
    let stat;

    try {
      stat = await lstat(source);
    } catch (error) {
      throw new Error(`Failed to parse ${source}: ${error}.`);
    }

    if (stat.isFile()) {
      if (source.match(/(.)\.HEIC$/)) {
        const outFile = `${source.split('.')[0]}.jpg`;
        try {
          spinner.start(yellow('Converting your file...'));
          await execa.command(`sips -s format jpeg ${source} --out ${outFile}`);
          spinner.succeed(green(`Successfully created ${outFile}/`));
        } catch (error) {
          throw new Error(`Failed to create ${outFile}: ${error}.`);
        }
      } else {
        throw new Error('File path must be of type .HEIC.');
      }
    } else if (stat.isDirectory()) {
      // remove any trailing slash
      const fixedSource = source.replace(/\/$/, '');

      let files;

      try {
        files = await readdir(fixedSource);
      } catch (error) {
        throw new Error(`Failed to read directory: ${error}.`);
      }

      try {
        spinner.start(yellow('Converting your files...'));
        let heics = 0;
        for (const file of files) {
          if (file.match(/(.)\.HEIC$/)) {
            await execa.command(
              `sips -s format jpeg ${fixedSource}/${file} --out ${fixedSource}/${
                file.split('.')[0]
              }.jpg`,
            );
            heics++;
          }
        }
        if (heics === 0) {
          spinner.stop();
          alert({
            type: 'warning',
            name: 'No HEICS',
            msg: 'Whoops, no HEIC files in this directory. Please try again.',
          });
          process.exit(0);
        }
        spinner.succeed(
          green(`Successfully converted all files in ${fixedSource}.`),
        );
      } catch (error) {
        throw new Error(`Failed to parse files in directory: ${error}.`);
      }
    } else {
      throw new Error('Error: argument needs to be a .HEIC file or directory.');
    }
  } catch (err) {
    /*eslint-disable-next-line no-console */
    console.error(err);
  }
})();

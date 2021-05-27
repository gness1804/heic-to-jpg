#!/usr/bin/env node

import { $ } from 'zx';
import { promises } from 'fs';
import chalk from 'chalk';
import logSymbols from 'log-symbols';

const { lstat, readdir } = promises;
const { bold } = chalk;

const makeError = (str) => `${logSymbols.error} ${chalk.bold.red(str)}`;
const makeSuccess = (str) => `${logSymbols.success} ${chalk.green(str)}`;

/**
 * Converts heic files to jpeg. If argument is directory, converts all heic files in it to jpeg.
 * @see https://apple.stackexchange.com/questions/297134/how-to-convert-a-heif-heic-image-to-jpeg-in-el-capitan
 * @param {string} input - input file or directory.
 */

(async () => {
  /* eslint-disable no-console */
  try {
    if (process.argv.indexOf('--help') !== -1) {
      console.info(`
        Converts HEIC image file(s) into the more usable jp(e)g format.

        Arguments:
          1. ${bold(
            'input',
          )}: either a *.HEIC file or a folder. If a file, converts that file; if a folder, converts all *.HEIC files in it. Will throw if a file type other than *.HEIC is entered or if something other than a valid file or folder path is entered.
      `);
      process.exit(0);
    }
// TODO: add tests
    const [, , input] = process.argv;
    if (!input)
      throw new Error(
        makeError('Input needed. Please enter a valid file or directory name.'),
      );

    let stat;

    try {
      stat = await lstat(input);
    } catch (error) {
      throw new Error(makeError(`Failed to parse ${input}: ${error}.`));
    }

    // TODO: adopt for Windows and Linux if trying to publish
    if (stat.isFile()) {
      if (input.match(/(.)\.HEIC$/)) {
        // TODO: replace fixed outFile with user input; fall back to fixed if no user input
        const outFile = `${input.split('.')[0]}.jpg`;
        try {
          await $`sips -s format jpeg ${input} --out ${outFile}`;
          console.info(makeSuccess(`Successfully created ${outFile}/`));
        } catch (error) {
          throw new Error(makeError(`Failed to create ${outFile}: ${error}.`));
        }
      } else {
        throw new Error(makeError('File path must be of type .HEIC.'));
      }
    } else if (stat.isDirectory()) {
      // remove any trailing slash
      const fixedInput = input.replace(/\/$/, '');

      let files;

      try {
        files = await readdir(fixedInput);
      } catch (error) {
        throw new Error(makeError(`Failed to read directory: ${error}.`));
      }

      try {
        files.forEach(async (file) => {
          if (file.match(/(.)\.HEIC$/)) {
            await $`sips -s format jpeg ${fixedInput}/${file} --out ${fixedInput}/${
              file.split('.')[0]
            }.jpg`;
          }
        });
        console.info(makeSuccess(`Successfully converted all files in ${fixedInput}.`))
      } catch (error) {
        throw new Error(
          makeError(`Failed to parse files in directory: ${error}.`),
        );
      }
    } else {
      throw new Error('Error: argument needs to be a .HEIC file or directory.');
    }
  } catch (err) {
    console.error(err);
  }
})();

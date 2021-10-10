#!/usr/bin/env node

/**
 * Converts heic files to jpeg. If argument is directory, converts all heic files in it to jpeg.
 * @see https://apple.stackexchange.com/questions/297134/how-to-convert-a-heif-heic-image-to-jpeg-in-el-capitan
 */

import { promises } from 'fs';
import handleError from 'cli-handle-error';
import execa = require('execa');
import ora = require('ora');
import alert = require('cli-alerts');
import { yellow, green, red } from 'chalk';
const init = require('./utils/init');
const cli = require('./utils/cli');
const log = require('./utils/log');

const { lstat, readdir } = promises;

const { flags, input, showHelp } = cli;
const { debug } = flags;

const spinner = ora({ text: '' });

(async () => {
  init();

  if (input.includes('help')) showHelp(0);

  debug && log(flags);
  let stat;

  const source = process.argv[2];
  if (!source) {
    handleError(
      'Input needed. Please enter a valid file or directory name.',
      {
        message: 'Input needed. Please enter a valid file or directory name.',
        name: '',
      },
      true,
      true,
    );
  }

  try {
    stat = await lstat(source);
  } catch (error) {
    handleError(`Failed to parse ${source}`, error as Error, true, true);
  }

  if (!stat)
    throw new Error(`Error parsing file: ${source}. Please try again later.`);

  if (stat.isFile()) {
    if (source.match(/(.)\.HEIC$/i)) {
      const outFile = source.replace(/.HEIC$/i, '.jpg');
      try {
        spinner.start(yellow('Converting your file...'));
        await execa.command(`sips -s format jpeg ${source} --out ${outFile}`);
        spinner.succeed(green(`Successfully created ${outFile}/`));
      } catch (error) {
        spinner.fail(red(`File conversion failed.`));
        handleError(`Failed to create ${outFile}.`, error as Error, true, true);
      }
    } else {
      handleError(
        'File path must be of type .HEIC.',
        { message: 'File path must be of type .HEIC.', name: '' },
        true,
        true,
      );
    }
  } else if (stat.isDirectory()) {
    // remove any trailing slash
    const fixedSource = source.replace(/\/$/, '');

    let files: string[] = [];

    try {
      files = await readdir(fixedSource);
    } catch (error) {
      handleError('Failed to read directory.', error as Error, true, true);
    }

    try {
      spinner.start(yellow('Converting your files...'));
      let heics = 0;
      for (const file of files) {
        if (file.match(/(.)\.HEIC$/i)) {
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
      handleError(
        'Failed to parse files in directory.',
        error as Error,
        true,
        true,
      );
    }
  } else {
    handleError(
      'Error: argument needs to be a .HEIC file or directory.',
      {
        message: 'Error: argument needs to be a .HEIC file or directory.',
        name: '',
      },
      true,
      true,
    );
  }
})();

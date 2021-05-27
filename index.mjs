#!/usr/bin/env node

import { $ } from 'zx';
import { promises } from 'fs';

const { lstat, readdir } = promises;

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
          1. input: either a *.HEIC file or a folder. If a file, converts that file; if a folder, converts all *.HEIC files in it. Will throw if a file type other than *.HEIC is entered or if something other than a valid file or folder path is entered.
      `);
      process.exit(0);
    }

    const [, , input] = process.argv;
    if (!input) throw new Error('Error: input needed.');

    const stat = await lstat(input);

    if (stat.isFile()) {
      if (input.match(/(.)\.HEIC$/)) {
        await $`sips -s format jpeg ${input} --out ${input.split('.')[0]}.jpg`;
      } else {
        throw new Error('Error: file path must be of type .HEIC.');
      }
    } else if (stat.isDirectory()) {
      // remove any trailing slash
      const fixedInput = input.replace(/\/$/, '');
      const files = await readdir(fixedInput);
      files.forEach(async file => {
        if (file.match(/(.)\.HEIC$/)) {
          await $`sips -s format jpeg ${fixedInput}/${file} --out ${fixedInput}/${
            file.split('.')[0]
          }.jpg`;
        }
      });
    } else {
      throw new Error('Error: argument needs to be a .HEIC file or directory.');
    }
  } catch (err) {
    console.error(err);
  }
})();

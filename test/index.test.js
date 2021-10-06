/* global describe, beforeEach, it, expect */

const execa = require('execa');
const path = require('path');
const fs = require('fs');
const rimraf = require('rimraf');

describe('HEIC to jpg converter', () => {
  const program = path.join(__dirname, '../index.js');

  beforeEach(() => {
    rimraf(path.join(__dirname, 'fixtures/*.jpg'), () => {
      /*eslint-disable-next-line no-console */
      console.info('Removed jpg files from fixtures.');
    });
  });

  it('fails if no argument is given', async () => {
    const { stdout } = await execa('node', [program]);

    expect(
      stdout.includes(
        'Input needed. Please enter a valid file or directory name.\n',
      ),
    ).toBe(true);
  });

  it('fails if bad argument given (not a file or directory)', async () => {
    const { stdout } = await execa('node', [program, 'foo/bar']);
    expect(stdout.includes('Failed to parse foo/bar')).toBe(true);
  });

  it('converts a valid HEIC to jpg', async () => {
    const source = path.join(__dirname, 'fixtures/ahc_pic_1.HEIC');
    await execa('node', [program, source]);
    const res = path.join(__dirname, 'fixtures/ahc_pic_1.jpg');
    expect(fs.existsSync(res)).toBe(true);
  });

  it('converts a valid HEIC to jpg (heic extension in lower case)', async () => {
    const source = path.join(__dirname, 'fixtures/ahc_pic_2.heic');
    await execa('node', [program, source]);
    const res = path.join(__dirname, 'fixtures/ahc_pic_2.jpg');
    expect(fs.existsSync(res)).toBe(true);
  });

  it('converts a valid HEIC to jpg for an input file with multiple dots', async () => {
    const source = path.join(__dirname, 'fixtures/ahc-pic-bad.new.HEIC');
    await execa('node', [program, source]);
    const res = path.join(__dirname, 'fixtures/ahc-pic-bad.new.jpg');
    expect(fs.existsSync(res)).toBe(true);
  });

  it('fails if non-HEIC file argument given', async () => {
    const source = path.join(__dirname, 'fixtures/nope.md');
    const { stdout } = await execa('node', [program, source]);
    expect(stdout.includes('File path must be of type .HEIC.')).toBe(true);
  });

  it('converts all HEICs in a valid directory', async () => {
    // run the program against the parent directory
    const source = path.join(__dirname, 'fixtures/');
    await execa('node', [program, source]);

    const file1 = path.join(__dirname, 'fixtures/ahc_pic_1.jpg');
    const file2 = path.join(__dirname, 'fixtures/ahc_pic_2.jpg');
    const file3 = path.join(__dirname, 'fixtures/ahc-pic-bad.jpg');
    const file4 = path.join(__dirname, 'fixtures/enchanted-rock.jpg');

    const files = [file1, file2, file3, file4];

    for (const file of files) {
      expect(fs.existsSync(file)).toBe(true);
    }
  });

  it('shows a warning if no HEIC files are in the directory given', async () => {
    const source = path.join(__dirname, 'no-heics/');
    const { stdout } = await execa('node', [program, source]);
    expect(
      stdout.includes(
        'Whoops, no HEIC files in this directory. Please try again.',
      ),
    ).toBe(true);
  });
});

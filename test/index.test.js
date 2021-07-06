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
        'Error: Input needed. Please enter a valid file or directory name.\n',
      ),
    ).toBe(true);
  });

  it('fails if bad argument given (not a file or directory)', async () => {
    const { stderr } = await execa('node', [program, '-s', 'foo/bar']);
    expect(stderr.includes('Failed to parse foo/bar')).toBe(true);
  });

  it('converts a valid HEIC to jpg', async () => {
    const source = path.join(__dirname, 'fixtures/ahc_pic_1.HEIC');
    await execa('node', [program, '-s', source]);
    const res = path.join(__dirname, 'fixtures/ahc_pic_1.jpg');
    expect(fs.existsSync(res)).toBe(true);
  });
});

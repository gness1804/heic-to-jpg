const test = require('ava');
const execa = require('execa');
const path = require('path');
const fs = require('fs');
const rimraf = require('rimraf');

const program = path.join(__dirname, '../index.js');

test.beforeEach(() => {
  rimraf(path.join(__dirname, 'fixtures/*.jpg'), () => {
    console.info('Removed jpg files from fixtures.');
  });
});

test('fails if no argument given', async (t) => {
  const { stderr } = await execa('node', [program]);
  t.true(
    stderr.includes(
      'Error: Input needed. Please enter a valid file or directory name.\n',
    ),
  );
});

test('fails if bad argument given (not a file or directory)', async (t) => {
  const { stderr } = await execa('node', [program, 'foo/bar']);
  t.true(stderr.includes('Failed to parse foo/bar'));
});

test('converts a valid HEIC to jpg', async (t) => {
  const source = path.join(__dirname, 'fixtures/ahc_pic_1.HEIC');
  await execa('node', [program, source]);
  const res = path.join(__dirname, 'fixtures/ahc_pic_1.jpg');
  t.true(fs.existsSync(res));
});

test('fails if non-HEIC file argument given', async (t) => {
  const source = path.join(__dirname, 'fixtures/nope.md');
  const { stderr } = await execa('node', [program, source]);
  t.true(stderr.includes('File path must be of type .HEIC.'));
});

test('converts all HEICs in a valid directory', async (t) => {
  const source = path.join(__dirname, 'fixtures/');
  await execa('node', [program, source]);
  const file1 = path.join(__dirname, 'fixtures/ahc_pic_1.jpg');
  const file2 = path.join(__dirname, 'fixtures/ahc-pic-bad.jpg');
  const file3 = path.join(__dirname, 'fixtures/enchanted-rock.jpg');
  t.true(fs.existsSync(file1));
  t.true(fs.existsSync(file2));
  t.true(fs.existsSync(file3));
});

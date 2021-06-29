const test = require('ava');
const execa = require('execa');
const path = require('path');
const fs = require('fs');
const rimraf = require('rimraf');

const program = path.join(__dirname, '../index.js');

test.beforeEach(async () => {
  await rimraf(path.join(__dirname, 'fixtures/*.jpg'), () => {
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

test('fails if bad argument given', async (t) => {
  const { stderr } = await execa('node', [program, 'foo/bar']);
  t.true(stderr.includes('Failed to parse foo/bar'));
});

test('converts a valid HEIC to jpg', async (t) => {
  const source = path.join(__dirname, 'fixtures/ahc_pic_1.HEIC');
  await execa('node', [program, source]);
  const res = path.join(__dirname, 'fixtures/ahc_pic_1.jpg');
  t.true(fs.existsSync(res));
});

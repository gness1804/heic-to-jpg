const unhandled = require('cli-handle-unhandled');
const { makeError } = require('./messages');

module.exports = () => {
  // check node version; fail if before 14
  const currNodeVersion = process.versions.node;
  if (currNodeVersion.split('.')[0] < 14)
    throw new Error(
      makeError(
        `Problem with Node version: this program requires Node version 14.0.0 or higher. You are running version ${currNodeVersion}.`,
      ),
    );

  // handle unhandled errors
  unhandled();
};

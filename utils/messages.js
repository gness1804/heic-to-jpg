const chalk = require('chalk');
const handleError = require('cli-handle-error');

const makeError = (str) => {
  const error = new Error(str);
  handleError('ERROR', error);
};

const makeSuccess = (str) => ` ${chalk.green(str)}`;

module.exports = {
  makeError,
  makeSuccess,
};

const chalk = require('chalk');

const makeSuccess = (str) => ` ${chalk.green(str)}`;

module.exports = {
  makeSuccess,
};

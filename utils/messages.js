const chalk =  require('chalk');

const makeError = (str) => `${chalk.bold.red(str)}`;
const makeSuccess = (str) => ` ${chalk.green(str)}`;

module.exports = {
  makeError,
  makeSuccess,
}

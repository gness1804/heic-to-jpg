const alert = require('cli-alerts');

const func = (info) => {
  alert({
    type: 'warning',
    name: 'DEBUG LOG',
    msg: '',
  });

  /*eslint-disable-next-line no-console */
  console.info('info:', info);
};

module.exports = func;

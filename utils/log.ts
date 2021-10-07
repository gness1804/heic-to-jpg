import alert from 'cli-alerts';

module.exports = (info: any) => {
  alert({
    type: 'warning',
    name: 'DEBUG LOG',
    msg: '',
  });

  /*eslint-disable-next-line no-console */
  console.info('info:', info);
};

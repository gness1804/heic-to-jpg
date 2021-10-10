"use strict";
exports.__esModule = true;
var alert = require("cli-alerts");
module.exports = function (info) {
    alert({
        type: 'warning',
        name: 'DEBUG LOG',
        msg: ''
    });
    /*eslint-disable-next-line no-console */
    console.info('info:', info);
};

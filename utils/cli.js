"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var meow = require('meow');
var meowHelp = require('cli-meow-help');
var package_json_1 = __importDefault(require("../package.json"));
var flags = {
    debug: {
        type: 'boolean',
        "default": false,
        alias: 'd',
        desc: 'Print debug info.'
    },
    version: {
        type: 'boolean',
        alias: 'v',
        desc: 'Print CLI version.'
    }
};
var commands = {
    help: {
        desc: 'Print out help info.'
    }
};
var helpText = meowHelp({
    name: "npx " + package_json_1["default"].name,
    desc: "\n  " + package_json_1["default"].description + "\n\n  Enter in a file name or directory as the first argument and the app will convert it.\n  heic-to-jpg example.HEIC -> example.jpg\n  ",
    flags: flags,
    commands: commands
});
var options = {
    inferType: true,
    description: false,
    hardRejection: false,
    flags: flags
};
module.exports = meow(helpText, options);

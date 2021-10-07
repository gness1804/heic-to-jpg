"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const meow = require('meow');
const meowHelp = require('cli-meow-help');
const package_json_1 = __importDefault(require("../package.json"));
const flags = {
    debug: {
        type: 'boolean',
        default: false,
        alias: 'd',
        desc: 'Print debug info.',
    },
    version: {
        type: 'boolean',
        alias: 'v',
        desc: 'Print CLI version.',
    },
};
const commands = {
    help: {
        desc: 'Print out help info.',
    },
};
const helpText = meowHelp({
    name: `npx ${package_json_1.default.name}`,
    desc: `
  ${package_json_1.default.description}

  Enter in a file name or directory as the first argument and the app will convert it.
  heic-to-jpg example.HEIC -> example.jpg
  `,
    flags,
    commands,
});
const options = {
    inferType: true,
    description: false,
    hardRejection: false,
    flags,
};
module.exports = meow(helpText, options);

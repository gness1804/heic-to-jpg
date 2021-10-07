"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const unhandled = require('cli-handle-unhandled');
const updateNotifier = require('update-notifier');
const welcome = require('cli-welcome');
const package_json_1 = __importDefault(require("../package.json"));
module.exports = () => {
    // check node version; fail if before 14
    const currNodeVersion = process.versions.node;
    if (parseInt(currNodeVersion.split('.')[0], 10) < 14)
        throw new Error(`Problem with Node version: this program requires Node version 14.0.0 or higher. You are running version ${currNodeVersion}.`);
    // handle unhandled errors
    unhandled();
    welcome({
        title: package_json_1.default.name,
        tagLine: `by ${package_json_1.default.author}`,
        description: package_json_1.default.description,
        version: package_json_1.default.version,
        bgColor: '#c45f12',
        color: '#000',
        bold: true,
        clear: true,
    });
    updateNotifier({ pkg: package_json_1.default }).notify();
};

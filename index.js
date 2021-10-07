#!/usr/bin/env node
"use strict";
/**
 * Converts heic files to jpeg. If argument is directory, converts all heic files in it to jpeg.
 * @see https://apple.stackexchange.com/questions/297134/how-to-convert-a-heif-heic-image-to-jpeg-in-el-capitan
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const cli_handle_error_1 = __importDefault(require("cli-handle-error"));
const execa_1 = __importDefault(require("execa"));
const ora_1 = __importDefault(require("ora"));
const cli_alerts_1 = __importDefault(require("cli-alerts"));
const chalk_1 = require("chalk");
const init = require('./utils/init');
const cli = require('./utils/cli');
const log = require('./utils/log');
const { lstat, readdir } = fs_1.promises;
const { flags, input, showHelp } = cli;
const { debug } = flags;
const spinner = (0, ora_1.default)({ text: '' });
(async () => {
    init();
    if (input.includes('help'))
        showHelp(0);
    debug && log(flags);
    let stat;
    const source = process.argv[2];
    if (!source) {
        (0, cli_handle_error_1.default)('Input needed. Please enter a valid file or directory name.', {
            message: 'Input needed. Please enter a valid file or directory name.',
            name: '',
        }, true, true);
    }
    try {
        stat = await lstat(source);
    }
    catch (error) {
        (0, cli_handle_error_1.default)(`Failed to parse ${source}`, error, true, true);
    }
    if (!stat)
        throw new Error(`Error parsing file: ${source}. Please try again later.`);
    if (stat.isFile()) {
        if (source.match(/(.)\.HEIC$/i)) {
            const outFile = source.replace(/.HEIC$/i, '.jpg');
            try {
                spinner.start((0, chalk_1.yellow)('Converting your file...'));
                await execa_1.default.command(`sips -s format jpeg ${source} --out ${outFile}`);
                spinner.succeed((0, chalk_1.green)(`Successfully created ${outFile}/`));
            }
            catch (error) {
                spinner.fail((0, chalk_1.red)(`File conversion failed.`));
                (0, cli_handle_error_1.default)(`Failed to create ${outFile}.`, error, true, true);
            }
        }
        else {
            (0, cli_handle_error_1.default)('File path must be of type .HEIC.', { message: 'File path must be of type .HEIC.', name: '' }, true, true);
        }
    }
    else if (stat.isDirectory()) {
        // remove any trailing slash
        const fixedSource = source.replace(/\/$/, '');
        let files = [];
        try {
            files = await readdir(fixedSource);
        }
        catch (error) {
            (0, cli_handle_error_1.default)('Failed to read directory.', error, true, true);
        }
        try {
            spinner.start((0, chalk_1.yellow)('Converting your files...'));
            let heics = 0;
            for (const file of files) {
                if (file.match(/(.)\.HEIC$/i)) {
                    await execa_1.default.command(`sips -s format jpeg ${fixedSource}/${file} --out ${fixedSource}/${file.split('.')[0]}.jpg`);
                    heics++;
                }
            }
            if (heics === 0) {
                spinner.stop();
                (0, cli_alerts_1.default)({
                    type: 'warning',
                    name: 'No HEICS',
                    msg: 'Whoops, no HEIC files in this directory. Please try again.',
                });
                process.exit(0);
            }
            spinner.succeed((0, chalk_1.green)(`Successfully converted all files in ${fixedSource}.`));
        }
        catch (error) {
            (0, cli_handle_error_1.default)('Failed to parse files in directory.', error, true, true);
        }
    }
    else {
        (0, cli_handle_error_1.default)('Error: argument needs to be a .HEIC file or directory.', {
            message: 'Error: argument needs to be a .HEIC file or directory.',
            name: '',
        }, true, true);
    }
})();

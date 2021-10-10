#!/usr/bin/env node
"use strict";
/**
 * Converts heic files to jpeg. If argument is directory, converts all heic files in it to jpeg.
 * @see https://apple.stackexchange.com/questions/297134/how-to-convert-a-heif-heic-image-to-jpeg-in-el-capitan
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var fs_1 = require("fs");
var cli_handle_error_1 = __importDefault(require("cli-handle-error"));
var execa = require("execa");
var ora = require("ora");
var alert = require("cli-alerts");
var chalk_1 = require("chalk");
var init = require('./utils/init');
var cli = require('./utils/cli');
var log = require('./utils/log');
var lstat = fs_1.promises.lstat, readdir = fs_1.promises.readdir;
var flags = cli.flags, input = cli.input, showHelp = cli.showHelp;
var debug = flags.debug;
var spinner = ora({ text: '' });
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var stat, source, error_1, outFile, error_2, fixedSource, files, error_3, heics, _i, files_1, file, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                init();
                if (input.includes('help'))
                    showHelp(0);
                debug && log(flags);
                source = process.argv[2];
                if (!source) {
                    (0, cli_handle_error_1["default"])('Input needed. Please enter a valid file or directory name.', {
                        message: 'Input needed. Please enter a valid file or directory name.',
                        name: ''
                    }, true, true);
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, lstat(source)];
            case 2:
                stat = _a.sent();
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                (0, cli_handle_error_1["default"])("Failed to parse " + source, error_1, true, true);
                return [3 /*break*/, 4];
            case 4:
                if (!stat)
                    throw new Error("Error parsing file: " + source + ". Please try again later.");
                if (!stat.isFile()) return [3 /*break*/, 11];
                if (!source.match(/(.)\.HEIC$/i)) return [3 /*break*/, 9];
                outFile = source.replace(/.HEIC$/i, '.jpg');
                _a.label = 5;
            case 5:
                _a.trys.push([5, 7, , 8]);
                spinner.start((0, chalk_1.yellow)('Converting your file...'));
                return [4 /*yield*/, execa.command("sips -s format jpeg " + source + " --out " + outFile)];
            case 6:
                _a.sent();
                spinner.succeed((0, chalk_1.green)("Successfully created " + outFile + "/"));
                return [3 /*break*/, 8];
            case 7:
                error_2 = _a.sent();
                spinner.fail((0, chalk_1.red)("File conversion failed."));
                (0, cli_handle_error_1["default"])("Failed to create " + outFile + ".", error_2, true, true);
                return [3 /*break*/, 8];
            case 8: return [3 /*break*/, 10];
            case 9:
                (0, cli_handle_error_1["default"])('File path must be of type .HEIC.', { message: 'File path must be of type .HEIC.', name: '' }, true, true);
                _a.label = 10;
            case 10: return [3 /*break*/, 23];
            case 11:
                if (!stat.isDirectory()) return [3 /*break*/, 22];
                fixedSource = source.replace(/\/$/, '');
                files = [];
                _a.label = 12;
            case 12:
                _a.trys.push([12, 14, , 15]);
                return [4 /*yield*/, readdir(fixedSource)];
            case 13:
                files = _a.sent();
                return [3 /*break*/, 15];
            case 14:
                error_3 = _a.sent();
                (0, cli_handle_error_1["default"])('Failed to read directory.', error_3, true, true);
                return [3 /*break*/, 15];
            case 15:
                _a.trys.push([15, 20, , 21]);
                spinner.start((0, chalk_1.yellow)('Converting your files...'));
                heics = 0;
                _i = 0, files_1 = files;
                _a.label = 16;
            case 16:
                if (!(_i < files_1.length)) return [3 /*break*/, 19];
                file = files_1[_i];
                if (!file.match(/(.)\.HEIC$/i)) return [3 /*break*/, 18];
                return [4 /*yield*/, execa.command("sips -s format jpeg " + fixedSource + "/" + file + " --out " + fixedSource + "/" + file.split('.')[0] + ".jpg")];
            case 17:
                _a.sent();
                heics++;
                _a.label = 18;
            case 18:
                _i++;
                return [3 /*break*/, 16];
            case 19:
                if (heics === 0) {
                    spinner.stop();
                    alert({
                        type: 'warning',
                        name: 'No HEICS',
                        msg: 'Whoops, no HEIC files in this directory. Please try again.'
                    });
                    process.exit(0);
                }
                spinner.succeed((0, chalk_1.green)("Successfully converted all files in " + fixedSource + "."));
                return [3 /*break*/, 21];
            case 20:
                error_4 = _a.sent();
                (0, cli_handle_error_1["default"])('Failed to parse files in directory.', error_4, true, true);
                return [3 /*break*/, 21];
            case 21: return [3 /*break*/, 23];
            case 22:
                (0, cli_handle_error_1["default"])('Error: argument needs to be a .HEIC file or directory.', {
                    message: 'Error: argument needs to be a .HEIC file or directory.',
                    name: ''
                }, true, true);
                _a.label = 23;
            case 23: return [2 /*return*/];
        }
    });
}); })();

#!/usr/bin/env node
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
var _this = this;
var promises = require('fs').promises;
var handleError = require('cli-handle-error');
var init = require('./utils/init');
var cli = require('./utils/cli');
var log = require('./utils/log');
var execa = require('execa');
var ora = require('ora');
var _alert = require('cli-alerts');
var _a = require('chalk'), yellow = _a.yellow, green = _a.green, red = _a.red;
var lstat = promises.lstat, readdir = promises.readdir;
var flags = cli.flags, input = cli.input, showHelp = cli.showHelp;
var debug = flags.debug;
var spinner = ora({ text: '' });
(function () { return __awaiter(_this, void 0, void 0, function () {
    var stat, source, error_1, outFile, error_2, fixedSource, files, error_3, heics, _i, files_1, file, error_4, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                init();
                if (input.includes('help'))
                    showHelp(0);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 25, , 26]);
                debug && log(flags);
                stat = void 0;
                source = process.argv[2];
                if (!source) {
                    handleError('Input needed. Please enter a valid file or directory name.', {
                        message: 'Input needed. Please enter a valid file or directory name.'
                    }, true, true);
                }
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, lstat(source)];
            case 3:
                stat = _a.sent();
                return [3 /*break*/, 5];
            case 4:
                error_1 = _a.sent();
                handleError("Failed to parse " + source, error_1, true, true);
                return [3 /*break*/, 5];
            case 5:
                if (!stat.isFile()) return [3 /*break*/, 12];
                if (!source.match(/(.)\.HEIC$/i)) return [3 /*break*/, 10];
                outFile = source.replace(/.HEIC$/i, '.jpg');
                _a.label = 6;
            case 6:
                _a.trys.push([6, 8, , 9]);
                spinner.start(yellow('Converting your file...'));
                return [4 /*yield*/, execa.command("sips -s format jpeg " + source + " --out " + outFile)];
            case 7:
                _a.sent();
                spinner.succeed(green("Successfully created " + outFile + "/"));
                return [3 /*break*/, 9];
            case 8:
                error_2 = _a.sent();
                spinner.fail(red("File conversion failed."));
                handleError("Failed to create " + outFile + ".", error_2, true, true);
                return [3 /*break*/, 9];
            case 9: return [3 /*break*/, 11];
            case 10:
                handleError('File path must be of type .HEIC.', { message: 'File path must be of type .HEIC.' }, true, true);
                _a.label = 11;
            case 11: return [3 /*break*/, 24];
            case 12:
                if (!stat.isDirectory()) return [3 /*break*/, 23];
                fixedSource = source.replace(/\/$/, '');
                files = void 0;
                _a.label = 13;
            case 13:
                _a.trys.push([13, 15, , 16]);
                return [4 /*yield*/, readdir(fixedSource)];
            case 14:
                files = _a.sent();
                return [3 /*break*/, 16];
            case 15:
                error_3 = _a.sent();
                handleError('Failed to read directory.', error_3, true, true);
                return [3 /*break*/, 16];
            case 16:
                _a.trys.push([16, 21, , 22]);
                spinner.start(yellow('Converting your files...'));
                heics = 0;
                _i = 0, files_1 = files;
                _a.label = 17;
            case 17:
                if (!(_i < files_1.length)) return [3 /*break*/, 20];
                file = files_1[_i];
                if (!file.match(/(.)\.HEIC$/i)) return [3 /*break*/, 19];
                return [4 /*yield*/, execa.command("sips -s format jpeg " + fixedSource + "/" + file + " --out " + fixedSource + "/" + file.split('.')[0] + ".jpg")];
            case 18:
                _a.sent();
                heics++;
                _a.label = 19;
            case 19:
                _i++;
                return [3 /*break*/, 17];
            case 20:
                if (heics === 0) {
                    spinner.stop();
                    alert({
                        type: 'warning',
                        name: 'No HEICS',
                        msg: 'Whoops, no HEIC files in this directory. Please try again.'
                    });
                    process.exit(0);
                }
                spinner.succeed(green("Successfully converted all files in " + fixedSource + "."));
                return [3 /*break*/, 22];
            case 21:
                error_4 = _a.sent();
                handleError('Failed to parse files in directory.', error_4, true, true);
                return [3 /*break*/, 22];
            case 22: return [3 /*break*/, 24];
            case 23:
                handleError('Error: argument needs to be a .HEIC file or directory.', { message: 'Error: argument needs to be a .HEIC file or directory.' }, true, true);
                _a.label = 24;
            case 24: return [3 /*break*/, 26];
            case 25:
                error_5 = _a.sent();
                handleError('General error:', error_5, true, true);
                return [3 /*break*/, 26];
            case 26: return [2 /*return*/];
        }
    });
}); })();

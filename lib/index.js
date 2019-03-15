"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
let defaultConfig = {
    path: './ts/test/handler/approved/',
};
function checkHTMLApproval(text) {
    const filePath = `${defaultConfig.path + this.currentTestName.replace(/\W+/g, '_')}`;
    try {
        const approvedFile = fs.readFileSync(`${filePath}.approved.html`);
        const approvedFileToString = approvedFile.toString();
        if (approvedFileToString !== text) {
            fs.writeFileSync(`${filePath}.actual.html`, text);
            const approvedFileLines = approvedFileToString.split(/\n/g);
            const actualFileLines = text.split(/\n/g);
            const absolutePath = path.resolve(filePath);
            for (let i = 0; i < approvedFileLines.length; i++) {
                if (approvedFileLines[i] !== actualFileLines[i]) {
                    return {
                        message: () => `.approved file differs from .actual

line ${i} "${absolutePath}.approved"
    ${approvedFileLines[i].trim()}
line ${i} "${absolutePath}.actual"
    ${actualFileLines[i].trim()}

mv '${absolutePath}.actual.html' '${absolutePath}.approved.html'
`,
                        pass: false,
                    };
                }
            }
            return {
                message: () => `.approved file differs from the .actual - "${filePath}"`,
                pass: false,
            };
        }
        return {
            message: () => `.approved file matches the .actual`,
            pass: true,
        };
    }
    catch (e) {
        if (e.code && e.code === 'ENOENT') {
            fs.writeFileSync(`${filePath}.actual.html`, text);
            const absolutePath = path.resolve(filePath);
            return {
                message: () => `.approved file does not exist

mv '${absolutePath}.actual.html' '${absolutePath}.approved.html'
`,
                pass: false,
            };
        }
        return {
            message: () => `Unknown error comparing .approved to .actual - "${filePath}"`,
            pass: false,
        };
    }
}
function init(config = defaultConfig) {
    defaultConfig = config;
    expect.extend({
        checkHTMLApproval,
    });
}
exports.init = init;

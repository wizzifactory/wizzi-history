/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\kernel\wizzi-scripts\src\ittf\lib\utils\console.js.ittf
*/
'use strict';
var path = require('path');
var cp = require('child_process');
var NOTEPAD_EXE = "C:\\Program Files\\Notepad++\\notepad++.exe";
var VSCODE_EXE = "C:\\Program Files\\Microsoft VS Code\\Code.exe";
var md = module.exports = {};
md.openWindowConsole = function(options) {
    cp.execSync('START "" /D ' + options.cwd + ' cmd.exe ', [], options);
};
md.openWindowPowershell = function(options) {
    console.log('wizzi-script.console.openWindowPowershell.options', options);
    cp.execSync('START "" /D ' + options.cwd + ' PowerShell_ISE.exe ' + options.document, [], options);
};
md.openWindowPowershell_prev2 = function(options) {
    console.log('wizzi-script.console.openWindowPowershell.options', options);
    cp.execSync('START', [
        '"my title"', 
        '/D ' + options.cwd, 
        '/K', 
        'PowerShell_ISE.exe'
    ], options);
};
md.openWindowPowershell_prev = function(options) {
    console.log('wizzi-script.console.openWindowPowershell.options', options);
    cp.execSync('PowerShell_ISE.exe', [
        '-WD ' + options.cwd
    ], options);
};
md.openNodeInWindowConsole = function(options) {
    cp.execSync("start cmd.exe /K node my-new-script.js parm1 parm2");
};
md.openDocument = function(documentFullPath, options) {
    console.log('wizzi-scripts.console.openDocument', documentFullPath);
    cp.execSync(path.basename(documentFullPath), {
        cwd: path.dirname(documentFullPath)
    });
    process.exit(0);
};
md.openNotePad = function(documentFullPath, options) {
    var cwd = path.dirname(documentFullPath);
    var prm1 = path.basename(documentFullPath);
    cp.execSync('START "" /D ' + cwd + ' "' + NOTEPAD_EXE + '"  ' + prm1, [], options);
    process.exit(0);
};
md.openVsCode = function(documentFullPath, options) {
    var cwd = path.dirname(documentFullPath);
    var prm1 = path.basename(documentFullPath);
    cp.execSync('START "" /D ' + cwd + ' "' + VSCODE_EXE + '"  ' + prm1, [], options);
    process.exit(0);
};

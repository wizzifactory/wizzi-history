/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\kernel\wizzi-scripts\src\ittf\examples\npm\index.js.ittf
*/
'use strict';
var path = require('path');
var util = require('util');
var packageIndex = require('../../index');
var manager = new packageIndex.Manager();
// _ node
npm_ps();
function npm_ps() {
    var psOptions1 = {
        scriptPath: path.join(__dirname, 'packages', 'sample1', 'sample1.ps1')
    };
    manager.powershellExec(psOptions1, function(err, notUsed) {
        if (err) {
            console.log('err', err);
            throw new Error(err.message);
        }
    });
}
function npm() {
    var npmOptions1 = {
        command: 'npm', 
        args: [
            'install'
        ], 
        cwd: path.join(__dirname, 'packages', 'sample1')
    };
    manager.spawnExec(npmOptions1, function(err, notUsed) {
        if (err) {
            console.log('err', err);
            throw new Error(err.message);
        }
    });
}
function node() {
    var nodeOptions1 = {
        command: 'node', 
        args: [
            'sample1.js', 
            'Stefi'
        ], 
        cwd: path.join(__dirname, 'packages', 'nodesample1')
    };
    manager.spawnExec(nodeOptions1, function(err, notUsed) {
        if (err) {
            console.log('err', err);
            throw new Error(err.message);
        }
    });
}

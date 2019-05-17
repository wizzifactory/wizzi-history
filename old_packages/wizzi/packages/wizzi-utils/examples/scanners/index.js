/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\kernel\wizzi-utils\src\ittf\examples\scanners\index.js.ittf
*/
'use strict';

var util = require('util');
var path = require('path');
var stringify = require('json-stringify-safe');
var file = require('../../lib/fs/file');
var vfile = require('../../lib/fs/vfile');
var fsGit = require('../../lib/fs/fsGit');
var verify = require('../../lib/verify');
var lorem = require('../../lib/lorem');
var encdec = require('../../lib/crypto/encdec');


var vfile = require('../../lib/fs/vfile');
var IttfMTreeEx = require('../../lib/ittfTree/ittfMTreeEx');
var IttfFsNode = require('../../lib/scanners/ittfFsNode');
var folderBrowse = require('../../lib/scanners/folderBrowse');
var folderScanner = require('../../lib/scanners/folderScanner');
var ittfDocumentScanner = require('../../lib/scanners/ittfDocumentScanner');
var textDocumentScanner = require('../../lib/scanners/textDocumentScanner');
// _ step_1
// _ ittfFsNode_step_1
// _ folderBrowse_step_1
ittfDocumentScanner_step_1();
function step_1() {
    folderScanner.scan(path.join(__dirname, 'ittf', 'first'), {
        name: 'first', 
        gitPath: 'c:/blabla'
    }, function(err, ittfMTreeEx) {
        if (err) {
            console.log('err', err);
            throw new Error(err.message);
        }
        ittfMTreeEx.writeFile(path.join(__dirname, 'outputs', 'first.wfpackage.ittf'), function(err, result) {
            if (err) {
                console.log('err', err);
                throw new Error(err.message);
            }
            console.log('err, result', err, result);
            step_2();
        });
    });
}
function step_2() {
    var ittfMTreeEx;
    folderScanner.scan(path.join(__dirname, 'ittf', 'first', 'deep'), {
        name: 'second', 
        gitPath: 'c:/blabla'
    }, function(err, ittfMTreeEx) {
        if (err) {
            console.log('err', err);
            throw new Error(err.message);
        }
        ittfMTreeEx.writeFile(path.join(__dirname, 'outputs', 'second.wfpackage.ittf'), function(err, result) {
            if (err) {
                console.log('err', err);
                throw new Error(err.message);
            }
            console.log('err, result', err, result);
            step_4();
        });
    });
}
function step_4() {
    ittfDocumentScanner.scan(path.join("C:/My/wizzi/v5/apps/wizzi-studio/dist/server/ittf/demo/ttech/css/layouts/step_1", 'index.html.ittf'), {
        rootFolder: 'C:/My/wizzi/v5/apps/wizzi-studio/dist/server'
    }, function(err, result) {
        if (err) {
            console.log('err', err);
            throw new Error(err.message);
        }
        console.log('step_4 err', err);
        var msg = stringify(result, null, 2);
        // log 'step_4 result', msg
        file.write(path.join(__dirname, 'outputs', 'ittfDocumentScanner.json'), msg);
        step_5();
    });
}
function step_5() {
    textDocumentScanner.scan(path.join("C:/My/wizzi/v5/apps/wizzi-studio/dist/server/ittf/labs/netlify", 'config.yml'), {
        baseFolder: 'C:/My/wizzi/v5/apps/wizzi-studio/dist/server'
    }, function(err, result) {
        if (err) {
            console.log('err', err);
            throw new Error(err.message);
        }
        console.log('step_4 err', err);
        var msg = stringify(result, null, 2);
        console.log('step_5 result', msg);
    });
}
function ittfFsNode_step_1() {
    console.log('wizzi-utils.examples.ittfFsNode_step_1 START');
    var folderPath = path.join(__dirname, 'ittf', 'first');
    var options = {
        name: 'first', 
        gitPath: 'c:/blabla'
    };
    var removeRoot = path.dirname(folderPath);
    console.log('folderPath, removeRoot', folderPath, removeRoot);
    var baseFolder = path.basename(folderPath);
    vfile(function(err, file) {
        if (err) {
            console.log('err', err);
            throw new Error(err.message);
        }
        file.getGlobbedFilesEx(path.join(folderPath, '**/*.ittf'), {
            removeRoot: removeRoot, 
            dot: true, 
            ignore: path.join(folderPath, '**/node_modules/**/*.*')
        }, function(err, ittfs) {
            if (err) {
                console.log('err', err);
                throw new Error(err.message);
            }
            console.log('ittfs\n', JSON.stringify(ittfs, null, 2));
            var ittfMTreeEx = new IttfMTreeEx('wzpackage', options.name);
            var root = new IttfFsNode(baseFolder, null, {
                isDirectory: true, 
                file: file
            });
            root.setSourcePaths({
                ittfBasePath: removeRoot, 
                jsCodeBasePath: options.gitPath
            });
            // create the IttfFsNode tree structure of the scanned folder
            var i, i_items=ittfs, i_len=ittfs.length, ittf;
            for (i=0; i<i_len; i++) {
                ittf = ittfs[i];
                root.addDocument(( ittf[0] === '/' ? ittf.substr(1) : ittf ), {
                    basePath: removeRoot, 
                    gitPath: options.gitPath
                });
            }
            // analize all IttfFsNode(s) starting from root
            // this also searches mixed or included ittf fragments that are
            // outside (up) of folderPath
            root.analize2(function(err, notUsed) {
                if (err) {
                    console.log('err', err);
                    throw new Error(err.message);
                }
                // export folder infos to an mTree conformant to the
                // 'wzpackage' schema.
                root.toIttf2(ittfMTreeEx);
                console.log('IttfFsNode.ittfMTreeEx\n', ittfMTreeEx.toString());
            });
        });
    });
}
function folderBrowse_step_1() {
    console.log('wizzi-utils.examples.folderBrowse_step_1 START');
    folderBrowse.scan(path.join(__dirname, 'ittf', 'first'), {
        rootFolder: path.join(__dirname, 'ittf')
    }, function(err, result) {
        if (err) {
            console.log('err', err);
            throw new Error(err.message);
        }
        console.log('result\n', JSON.stringify(result, null, 2));
    });
}
function ittfDocumentScanner_step_1() {
    console.log('wizzi-utils.examples.ittfDocumentScanner_step_1 START');
    ittfDocumentScanner.scan(path.join("C:/My/wizzi/v5/apps/wizzi-studio/dist/server/ittf/demo/ttech/css/layouts/step_1", 'index.html.ittf'), {
        rootFolder: 'C:/My/wizzi/v5/apps/wizzi-studio/dist/server'
    }, function(err, result) {
        if (err) {
            console.log('err', err);
            throw new Error(err.message);
        }
        console.log('ittfDocumentScanner_step_1 err', err);
        var msg = stringify(result, null, 2);
        // log 'step_4 result', msg
        file.write(path.join(__dirname, 'outputs', 'ittfDocumentScanner.json'), msg);
    });
}

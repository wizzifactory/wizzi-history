/*
    artifact generator: C:\My\wizzi\v6\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v6\plugins\wizzi-js\src\ittf\examples\codegen\_old_index.js.ittf
*/
'use strict';
var path = require('path');
var fs = require('fs');
var basicLoader = require('../../tests/mocks').basicLoader;
var jsNode = require('../../tests/mocks').jsNode;
var genContext = require('../../tests/mocks').genContext;
var file = require('../../tests/mocks').file;
var verify = require('../../tests/mocks').verify;
var index = require('../../index');
var js_ittf_files = getFiles(path.join(__dirname, 'ittf'));
var item;
var len_1 = js_ittf_files.length;
function repeater_1(index_1) {
    if (index_1 === len_1) {
        return next_1();
    }
    var item_1 = js_ittf_files[index_1];
    item = item_1.substring(0, item_1.length - '.js.ittf'.length);
    console.log('wizzi-codegen.examples.item', item);
    execute(item, function(err, notUsed) {
        if (err) {
            return callback(err);
        }
        process.nextTick(function() {
            repeater_1(index_1 + 1);
        });
    });
}
repeater_1(0);
function next_1() {
}
function execute(name, callback) {
    var ittfSource = path.join(__dirname, 'ittf', name + '.js.ittf');
    console.log('wizzi-codegen.examples.ittfSource', ittfSource);
    var jsOutput = path.join(__dirname, 'ittf', name + '.g.js');
    basicLoader.loadMTree(ittfSource, {}, function(err, mTree) {
        if (err) {
            console.log('err', err);
            throw new Error(err.message);
        }
        // log 'mTree', mTree
        var js = new jsNode(mTree.n, mTree.v);
        js.loadFromMTree(mTree);
        // log 'jsNode', js
        var ctx = new genContext({
            options: {
                CRLF: '\n', 
                indentSpaces: 4
            }
        });
        index.js_Statement.gen(js, ctx, function(err, notUsed) {
            if (err) {
                return callback(err);
            }
            console.log(name, 'ctx\n' + ctx.getContent());
            file.write(jsOutput, ctx.getContent());
            return callback(null, null);
        });
    });
}
function getFiles(srcpath) {
    return fs.readdirSync(srcpath).filter((file) => {
            return fs.lstatSync(path.join(srcpath, file)).isFile() && verify.endsWith(file, '.js.ittf');
        })
    ;
}

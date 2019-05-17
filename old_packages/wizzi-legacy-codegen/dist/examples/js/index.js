/*
    artifact generator: C:\My\wizzi\v4\node_modules\v4-wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v4\legacy\wizzi-legacy-codegen\src\ittf\examples\js\index.js.ittf
    utc time: Tue, 14 Nov 2017 16:35:13 GMT
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
var ittfPath = path.join(__dirname, 'ittf')
;
var i, i_len=getFiles(ittfPath).length, item;
for (i=0; i<i_len; i++) {
    item = getFiles(ittfPath)[i];
    item = item.substring(0, item.length - '.js.ittf'.length);
    console.log('item', item);
    execute(item);
}
function execute(name) {
    var ittfSource = path.join(__dirname, 'ittf', name + '.js.ittf')
    ;
    var jsOutput = path.join(__dirname, 'ittf', name + '.g.js')
    ;
    basicLoader.loadMTree(ittfSource, {}, function(err, mTree) {
        if (err) {
            return callback(err)
            ;
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
        index.jsStatement.gen(js, ctx);
        console.log(name, 'ctx', ctx.getContent());
        file.write(jsOutput, ctx.getContent());
    });
}
function getFiles(srcpath) {
    return fs.readdirSync(srcpath).filter((file) => {
            return fs.lstatSync(path.join(srcpath, file)).isFile() && verify.endsWith(file, '.js.ittf');
        })
        
    ;
}

/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\kernel\wizzi\src\ittf\examples\html\index.js.ittf
*/
'use strict';
var path = require('path');
var fs = require('fs');
var index = require('../../index');
var verify = require('wizzi-utils').verify;
var file = require('wizzi-utils').file;
var suffix_in = '.html.ittf';
var suffix_out = '.g.html';
index.createFactory('stefi', 'admin', {
    repo: {
        storeKind: 'filesystem'
    }, 
    plugins: {
        items: [
            'wizzi-html'
        ]
    }
}, function(err, wf) {
    if (err) {
        console.log('err', err);
        throw new Error(err.message);
    }
    var ittfPath = path.join(__dirname, 'ittf');
    var i, i_items=getFiles(ittfPath), i_len=getFiles(ittfPath).length, item;
    for (i=0; i<i_len; i++) {
        item = getFiles(ittfPath)[i];
        item = item.substring(0, item.length - suffix_in.length);
        console.log('item', item);
        execute(item, wf);
    }
});

// _ execute('function')

function execute(name, wf) {
    var ittfSource = path.join(__dirname, 'ittf', name + suffix_in);
    var artifactOutput = path.join(__dirname, 'ittf', name + suffix_out);
    wf.loadModelAndGenerateArtifact(ittfSource, {}, 'html/document', function(err, artifactText) {
        if (err) {
            console.log('err', err);
            throw new Error(err.message);
        }
        file.write(artifactOutput, artifactText);
    });
}
function getFiles(srcpath) {
    return fs.readdirSync(srcpath).filter((file) => {
            return fs.lstatSync(path.join(srcpath, file)).isFile() && verify.endsWith(file, suffix_in);
        })
    ;
}

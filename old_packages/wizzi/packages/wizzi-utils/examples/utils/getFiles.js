/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\kernel\wizzi-utils\src\ittf\examples\utils\getfiles.js.ittf
*/
'use strict';

var util = require('util');
var path = require('path');
var stringify = require('json-stringify-safe');
var file = require('../../lib/fs/file');
var vfile = require('../../lib/fs/vfile');
var verify = require('../../lib/verify');
var lorem = require('../../lib/lorem');
var encdec = require('../../lib/crypto/encdec');
var file = vfile();


file.getFiles(path.join(__dirname, 'ittf', 'samples'), {
    deep: false, 
    extension: null, 
    documentContent: false
}, function(err, files) {
    if (err) {
        console.log('err', err);
        throw new Error(err.message);
    }
    console.log('utils.getFiles.files', files);
    file.getFiles(path.join(__dirname, 'ittf', 'samples'), {
        deep: false, 
        extension: null, 
        documentContent: true
    }, function(err, files) {
        if (err) {
            console.log('err', err);
            throw new Error(err.message);
        }
        console.log('utils.getFilesWithContent.files', files);
        file.getFiles(path.join(__dirname, 'ittf', 'samples'), {
            deep: true, 
            extension: null, 
            documentContent: true
        }, function(err, files) {
            if (err) {
                console.log('err', err);
                throw new Error(err.message);
            }
            console.log('utils.getFilesWithContentDeep.files', files);
        });
    });
});

/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\kernel\wizzi-utils\src\ittf\examples\utils\getfolders.js.ittf
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


file.getFolders(path.join(__dirname, 'ittf', 'samples'), {
    deep: false, 
    tFoldersOnly: false, 
    documentNames: false
}, function(err, folders) {
    if (err) {
        console.log('err', err);
        throw new Error(err.message);
    }
    console.log('utils.getFolders.folders', folders);
    file.getFolders(path.join(__dirname, 'ittf', 'samples'), {
        deep: false, 
        tFoldersOnly: false, 
        documentNames: false
    }, function(err, folders) {
        if (err) {
            console.log('err', err);
            throw new Error(err.message);
        }
        console.log('utils.getFoldersWithContent.folders', folders);
        file.getFolders(path.join(__dirname, 'ittf', 'samples'), {
            deep: true, 
            tFoldersOnly: false, 
            documentNames: true
        }, function(err, folders) {
            if (err) {
                console.log('err', err);
                throw new Error(err.message);
            }
            console.log('utils.getFoldersWithDocumentNames.folders', folders);
        });
    });
});

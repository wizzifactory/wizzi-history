/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\kernel\wizzi-utils\src\ittf\root\index.js.ittf
*/
'use strict';
var ittfMTreeEx = require('./lib/ittfTree/ittfMTreeEx');
var asIsLoader = require('./lib/ittfTree/asIsLoader');
var ittfWriter = require('./lib/ittfTree/ittfWriter');
var folderScanner = require('./lib/scanners/folderScanner');
var folderBrowse = require('./lib/scanners/folderBrowse');
var ittfDocumentScanner = require('./lib/scanners/ittfDocumentScanner');
var textDocumentScanner = require('./lib/scanners/textDocumentScanner');
var ittfHtmlPrettifier = require('./lib/prettifiers/ittfHtmlPrettifier');
var md = module.exports = {};
md.fail = require('./lib/fail');
md.option = require('./lib/option');
md.config = require('./lib/config');
md.verify = require('./lib/verify');
md.node = require('./lib/node');
md.nodeErrors = require('./lib/errors');
md.exampleErrors = require('./lib/exampleErrors');
md.lineparser = require('./lib/lineparser');
md.mocks = require('./lib/mocks');
md.requireFromString = require('./lib/requireFromString');
md.Coder = require('./lib/coder');
md.lorem = require('./lib/lorem');
md.encdec = require('./lib/crypto/encdec');
md.errors = require('./lib/errors');
// fs
md.file = require('./lib/fs/file');
md.vfile = require('./lib/fs/vfile');
md.uriParser = require('./lib/fs/uriParser');
// class IttfMTreeEx
md.IttfMTreeEx = ittfMTreeEx;
md.ittfWriter = ittfWriter;
// function
// string ittfDocumentUri
// { options
// { file?
// api-ref wizzi.utils.file
// callback?
md.asIsLoader = asIsLoader;
// { folderScanner
// m scan
// string folderPath
// { options
// string name
// string gitPath
// callback
md.folderScanner = folderScanner;
// { folderBrowse
// m scan
// string folderPath
// { options
// string baseFolder
// callback
md.folderBrowse = folderBrowse;
// { ittfDocumentScanner
// m scan
// string documentPath
// { options
// string rootFolder
// callback
md.ittfDocumentScanner = ittfDocumentScanner;
// { textDocumentScanner
// m scan
// string documentPath
// { options
// string baseFolder
// callback
md.textDocumentScanner = textDocumentScanner;
// function
// { rootNode
// api-ref wizzi-utils.IttfMTreeEx
// { options
// callback
md.ittfHtmlPrettifier = ittfHtmlPrettifier;
//
md.prettifyFromString = function(ittfContent, callback) {
    ittfMTreeEx.createFrom(ittfContent, {
        fromString: true
    }, function(err, mTree) {
        if (err) {
            return callback(err);
        }
        ittfHtmlPrettifier(mTree, {}, function(err, pretty) {
            if (err) {
                return callback(err);
            }
            return callback(null, pretty.prettyLines.join('\n'));
        });
    });
};

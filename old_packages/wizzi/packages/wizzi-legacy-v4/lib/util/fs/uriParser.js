/*
    artifact generator: C:\My\wizzi\v4\node_modules\v4-wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v4\kernel\wizzi-utils\src\ittf\lib\fs\uriparser.js.ittf
    utc time: Tue, 10 Oct 2017 15:30:05 GMT
*/
'use strict';
var path = require('path');
var url = require('url');
var verify = require('../verify');
/**
     params
     string uri
     returns
     {
     string originalUri
     string protocol
     one-of 'db', 'ls', drive letter
     string storeKind
     one-of 'mongodb', 'localstorage', 'filesystem'
     string userId
     # if storeKind === 'mongodb'
     string projectId
     # if storeKind === 'mongodb'
     string path
     boolean isIttfDocument
     string basename
     string schema
     # if isIttfDocument === true
     string extension
     # if isIttfDocument === false
    
*/
module.exports = function parse(uri) {
    uri = uri.toLowerCase();
    var ret = {
        originalUri: uri
    };
    var parsedUri = url.parse(uri);
    if (typeof(parsedUri.protocol) !== 'string') {
        return error('InvalidArgument', 'parse', 'Uri must have a protocol (must be an absolute url). Received: ' + uri)
        ;
    }
    var protocol = parsedUri.protocol.substr(-1, 1) === ':' ? parsedUri.protocol.substr(0, (parsedUri.protocol.length - 1)) : parsedUri.protocol;
    ;
    ret.protocol = protocol;
    ret.storeKind = 'filesystem';
    if (protocol === 'db') {
        ret.storeKind = 'mongodb';
    }
    else if (protocol === 'ls') {
        ret.storeKind = 'localstorage';
    }
    // log 'parseuri.parsedUri', parsedUri
    var name,
        parts = parsedUri.pathname ? parsedUri.pathname.split('/') : [];
    if (parsedUri.pathname && parsedUri.pathname.length > 0 && parsedUri.pathname[0] == '/') {
        parts.shift();
    }
    name = parts[parts.length-1];
    ret.basename = name;
    var nameparts = name.split('.');
    if (nameparts.length > 2 && nameparts[nameparts.length -1] === 'ittf') {
        ret.isIttfDocument = true;
        ret.schema = nameparts[nameparts.length -2];
    }
    else {
        ret.isIttfDocument = false;
        ret.extension = nameparts[nameparts.length -1];
    }
    if (parts.length < 2) {
    }
    // log 'wizzi-utils.fs.uriParser.parsedUri.parts', parts
    // log 'wizzi-utils.fs.uriParser.parsedUri', parsedUri
    ret.userId = parsedUri.host;
    if (parts.length > 0) {
        ret.projectId = parts[0];
        parts.shift();
    }
    ret.path = parts.join('/');
    // log 'parseuri.ret', ret
    return ret;
};

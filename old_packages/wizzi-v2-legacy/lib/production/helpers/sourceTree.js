/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: C:\My\wizzi\v2\sources\wizzi-2-boot\ittf\lib\production\helpers\sourceTree.js.ittf
    utc time: Tue, 11 Jul 2017 18:50:00 GMT
*/
'use strict';
var util = require('util');
var path = require('path');
var verify = require('../../util/verify');
module.exports = function(wzmodel,filepath,wzrepoRootPath) {
    var filepath_norm = verify.isString(filepath) ? verify.replaceAll(path.dirname(filepath), '\\', '/')
     : null;
    var wzrepoRootPath_norm = verify.isString(wzrepoRootPath) ? verify.replaceAll(wzrepoRootPath, '\\', '/') : null;
    var source,
        fullpath,
        relpath,
        wzpath,
        ret = {
            kind: '$sourcetree', 
            filepath: filepath, 
            sources: []
        };
    var sources = wzmodel.loadContext.sources;
    for (var k in sources) {
        fullpath = sources[k].filepath;
        if (filepath_norm) {
            fullpath_norm = verify.replaceAll(fullpath, '\\', '/');
            relpath = fullpath_norm.substr(filepath_norm.length + 1);
            wzpath = fullpath_norm.substr(wzrepoRootPath_norm.length + 1);
        }
        source = {
            kind: '$source', 
            key: k, 
            filepath: fullpath, 
            relpath: relpath, 
            wzpath: wzpath
        };
        ret.sources.push(source);
    }
    return ret;
};

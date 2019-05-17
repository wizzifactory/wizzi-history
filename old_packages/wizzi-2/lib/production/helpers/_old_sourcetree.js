var util = require('util');
var path = require('path');
var verify = require('../../util/verify');
module.exports = function (wmtmodel, filepath, wzrepoRootPath) {
    var filepath_norm = verify.isString(filepath) ? verify.replaceAll(path.dirname(filepath), '\\', '/') : null;
    var wzrepoRootPath_norm = verify.isString(wzrepoRootPath) ? verify.replaceAll(wzrepoRootPath, '\\', '/') : null;
    var source, fullpath, relpath, wzpath, ret = {
        kind: '$sourcetree',
        filepath: filepath,
        sources: []
    };
    var sources = wmtmodel.loadContext.sources;
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
}

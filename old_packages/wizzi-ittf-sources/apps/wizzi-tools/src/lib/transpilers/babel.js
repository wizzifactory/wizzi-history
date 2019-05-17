var path = require("path");
var util = require("util");
var glob = require('glob');
var babel = require("babel-core");
var verify = require('wizzi').verify;
var file = require("wizzi").file;

function options(request) {
    var ret = {
        presets: ['es2015', 'react'],
        plugins: []
    };
    if (request.js6) {
        // ret.plugins.push('');
    } else {
        // ret.plugins.push('jsx');
    }
    return ret;
}

module.exports = function (request, callback) {
    var srcFolder = verify.replaceAll(request.srcFolder, '\\', '/');
    var ext = '*.jsx';
    if (request.js6) {
        ext = '*.js6';
    }
    glob(srcFolder + '/**/' + ext, {}, function (er, files) {
        files.forEach(function (filePath) {
            babel.transformFile(filePath, options(request), function (err, result) {
                if (err) {
                    return console.log(util.inspect(err, { depth: null }));
                }
                filePath = verify.replaceAll(filePath, '\\', '/');
                filePath = filePath.substr(srcFolder.length)
                var codeFileDest = path.join(request.destFolder, filePath);
                console.log(filePath, codeFileDest);
                console.log(result, result);
                file.write(codeFileDest, result.code);
            });
        });
    });
}



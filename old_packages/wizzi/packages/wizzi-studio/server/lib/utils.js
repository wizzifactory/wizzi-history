/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-studio\wizzi\ittf\server\lib\utils.js.ittf
    utc time: Thu, 06 Dec 2018 17:50:06 GMT
*/
'use strict';
var fs = require('fs');
var glob = require('glob');
function escapeRegExp(s) {
    return s.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}
function _walkDirectory(path, obj) {
    var dir = fs.readdirSync(path);
    var i, i_items=dir, i_len=dir.length, name;
    for (i=0; i<i_len; i++) {
        name = dir[i];
        var target = path + '/' + name;
        var stats = fs.statSync(target);
        if (stats.isFile()) {
            obj[name] = {
                kind: 0, 
                path: target
            };
        }
        else if (stats.isDirectory()) {
            obj[name] = {
                kind: 1, 
                path: target, 
                children: {}
            };
            _walkDirectory(target, obj[name].children);
        }
    }
}
module.exports = {
    replaceAll: function(s, find, replace) {
        if (typeof s === 'undefined' || s == null) {
            return s;
        }
        return s.replace(new RegExp(escapeRegExp(find), 'g'), replace);
    }, 
    getGlobbedFiles: function(globPatterns, options) {
        options = options || {};
        var exclude = options.exclude;
        // For context switching
        var _this = this;
        // URL paths regex
        var urlRegex = new RegExp('^(?:[a-z]+:)?\/\/', 'i');
        // The output array
        var output = [];
        // If glob pattern is array so we use each pattern in a recursive way, otherwise we use glob
        if (_.isArray(globPatterns)) {
            globPatterns.forEach(function(globPattern) {
                output = _.union(output, _this.getGlobbedFiles(globPattern, exclude));
            });
        }
        else if (_.isString(globPatterns)) {
            if (urlRegex.test(globPatterns)) {
                output.push(globPatterns);
            }
            else {
                var files = glob.sync(globPatterns);
                if (exclude) {
                    files = files.map(function(file) {
                        if (_.isArray(exclude)) {
                            var i, i_items=exclude, i_len=exclude.length, exclude;
                            for (i=0; i<i_len; i++) {
                                exclude = exclude[i];
                                file = file.replace(exclude, '');
                            }
                        }
                        else {
                            file = file.replace(exclude, '');
                        }
                        return file;
                    });
                }
                output = _.union(output, files);
                output = _.filter(output, function (item) { return item.indexOf('/_debug') < 0; });
            }
        }
        return output;
    }, 
    walkDirectory: function(path) {
        var filetree = {};
        _walkDirectory(path, filetree);
        return filetree;
    }, 
    htmlEncode: function(string) {
        var ret = this.replaceAll(string, '<', '&lt;');
        ret = this.replaceAll(ret, '>', '&gt;');
        return this.replaceAll(ret, '&', '&amp;');
    }, 
    now_GMYHMS: function() {
        var date = new Date();
        return date.getDate() + '/' +(date.getMonth() + 1) + '/' +date.getFullYear() + ':' +date.getHours() + ':' +date.getMinutes() + ':' +date.getSeconds();}
};

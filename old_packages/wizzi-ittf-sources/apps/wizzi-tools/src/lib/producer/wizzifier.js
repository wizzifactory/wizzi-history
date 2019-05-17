var util = require('util');
var path = require('path');
var glob = require('glob');
var wizzi = require('wizzi')
var file = wizzi.file;
var verify = wizzi.verify;
var index = require('../../index');

var md = module.exports = {};

var WizzifierProducer = function (options) {
    this.options = options || {};
    this.srcFolder = options.srcFolder;
    this.destFolder = options.destFolder;
    this.excludes = options.excludes || [];
    if (file.isDirectory(this.srcFolder) === false) throw new Error('GlobFolderProducer. srcFolder does not exists or is not a directory. ' + this.srcFolder);
    if (verify.isString(this.destFolder) === false) throw new Error('GlobFolderProducer. destFolder is required.');
}

WizzifierProducer.prototype.setDestFolder = function (destFolder) {
    this.destFolder = destFolder;
}

WizzifierProducer.prototype.isOk = function (itemPath) {
    if (itemPath.indexOf('/_debug/') >= 0) return false;
    var ok = true;
    this.excludes.forEach(function (excl) {
        if (itemPath.indexOf(excl) >= 0) ok = false;
    });
    return ok;
}

WizzifierProducer.prototype.executeJs = function () {
    var self = this;
    glob(this.srcFolder + '/**/*.js', {}, function (er, files) {
        files.forEach(function (item) {
            if (self.isOk(item) === false) return;
            var fileName = item.substr((self.srcFolder + '/').length);
            var fileBaseName = fileName.substr(0, fileName.length - 3);
            var fileTo = path.join(self.destFolder, fileBaseName + '.js.ittf');
            index.jsWizzify(item, {}, function(err, result) {
                file.write(fileTo, err || result);
            });
        });
    });
}

WizzifierProducer.prototype.executeHtml = function () {
    var self = this;
    glob(this.srcFolder + '/**/*.html', {}, function (er, files) {
        files.forEach(function (item) {
            if (self.isOk(item) === false) return;
            var fileName = item.substr((self.srcFolder + '/').length);
            var fileBaseName = fileName.substr(0, fileName.length - 5);
            var fileTo = path.join(self.destFolder, fileBaseName + '.html.ittf');
            index.htmlWizzify(item, {}, function (err, result) {
                file.write(fileTo, err || result);
            });
        });
    });
}

WizzifierProducer.prototype.executeCss = function () {
    var self = this;
    glob(this.srcFolder + '/**/*.css', {}, function (er, files) {
        files.forEach(function (item) {
            if (self.isOk(item) === false) return;
            var fileName = item.substr((self.srcFolder + '/').length);
            var fileBaseName = fileName.substr(0, fileName.length - 4);
            var fileTo = path.join(self.destFolder, fileBaseName + '.css.ittf');
            index.cssWizzify(item, {}, function (err, result) {
                file.write(fileTo, err || result);
            });
        });
    });
}

WizzifierProducer.prototype.executeAll = function () {
    this.executeCss();
    this.executeHtml();
    this.executeJs();
}

md.WizzifierProducer = WizzifierProducer;
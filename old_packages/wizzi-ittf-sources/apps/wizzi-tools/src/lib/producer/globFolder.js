var util = require('util');
var path = require('path');
var glob = require('glob');
var del = require('del');
var wizzi = require('wizzi')
var file = wizzi.file;
var verify = wizzi.verify;
var ProductionManager = wizzi.ProductionManager;
var options = wizzi.options;
var site = require('wizzi-lab-site')

var md = module.exports = {};

var GlobFolderProducer = function (options) {
    console.log('ctor', this.srcFolder);
    this.options = options || {};
    this.srcFolder = options.srcFolder;
    this.destFolder = options.destFolder;
    if (file.isDirectory(this.srcFolder) === false) throw new Error('GlobFolderProducer. srcFolder does not exists. ' + this.srcFolder);
    if (verify.isString(this.destFolder) === false) throw new Error('GlobFolderProducer. destFolder is required.');
    this.options.skipTfolders = typeof options.skipTfolders === 'undefined' ? true : options.skipTfolders;
    this.options.context = typeof options.context === 'undefined' ? {} : options.context;
}
GlobFolderProducer.prototype.setDestFolder = function (destFolder) {
    this.destFolder = destFolder;
}
GlobFolderProducer.prototype.execute = function (done) {
    console.log('execute', this.srcFolder);
    var self = this;
    glob(this.srcFolder + '/**/.*', {}, function (er, files) {
        files.forEach(function (item) {
            if (file.isFile(item) == false) return;
            if (self.options.skipTfolders && item.indexOf('/t/') >= 0) {
                if (item.indexOf('/views/') < 0 && item.indexOf('/__copy/') < 0) return;
            }
            if (item.indexOf('/_debug/') >= 0) return;
            var fileName = item.substr((self.srcFolder + '/').length);
            console.log('file ' + fileName);
            if (fileName.indexOf('/__copy/') >= 0) {
                fileName = verify.replaceAll(fileName, '/__copy/', '/');
            } else if (fileName.indexOf('__copy') >= 0) {
                fileName = verify.replaceAll(fileName, '__copy', '');
            }
            var fileTo = self.destFolder + '/' + fileName;
            console.log('copy to ' + fileTo);
            file.copy(item, fileTo);
        });
        glob(self.srcFolder + '/**/*.*', {}, function (er, files) {
            files.forEach(function (item) {
                if (file.isFile(item) == false) return;
                if (item.indexOf('/_debug/') >= 0) return;
                if (item.indexOf('/__copy/') >= 0) {
                    var fileName = item.substr((self.srcFolder + '/').length);
                    fileName = verify.replaceAll(fileName, '/__copy/', '/');
                    var fileTo = self.destFolder + '/' + fileName;
                    console.log('copy to ' + fileTo);
                    file.copy(item, fileTo);
                    return;
                } else {
                    if (self.options.skipTfolders && item.indexOf('/t/') >= 0) return;
                    var fileName = item.substr((self.srcFolder + '/').length);
                    console.log('file ' + fileName);
                    if (fileName.indexOf('__copy') >= 0) {
                        fileName = verify.replaceAll(fileName, '__copy', '');
                        var fileTo = self.destFolder + '/' + fileName;
                        console.log('copy to ' + fileTo);
                        file.copy(item, fileTo);
                    } else if (verify.endsWith(item, '.js.ittf')) {
                        var fileTo = self.destFolder + '/' + fileName.substr(0, fileName.length - 5);
                        console.log('generate js/module to ' + fileTo);
                        wizzi.jsModule(item, self.options.context, function (err, result) {
                            if (err) throw new Error(err);
                            file.write(fileTo, result);
                        });
                    } else if (verify.endsWith(item, '.json.ittf')) {
                        var fileTo = self.destFolder + '/' + fileName.substr(0, fileName.length - 5);
                        console.log('generate json/document to ' + fileTo);
                        wizzi.jsonDocument(item, self.options.context, function (err, result) {
                            if (err) throw new Error(err);
                            file.write(fileTo, result);
                        });
                    } else {
                        var fileTo = self.destFolder + '/' + fileName;
                        console.log('copy to ' + fileTo);
                        file.copy(item, fileTo);
                    }
                }
            });
            console.log('done');
            done();
        });
    });
}

var GlobFolderCopy = function (options) {
    this.options = options || {};
    this.srcFolder = options.srcFolder;
    this.destFolder = options.destFolder;
    this.deleteDest = options.deleteDest;
    if (file.isDirectory(this.srcFolder) === false) throw new Error('GlobFolderCopy. srcFolder does not exists. ' + this.srcFolder);
    if (verify.isString(this.destFolder) === false) throw new Error('GlobFolderCopy. destFolder is required.');
}
GlobFolderCopy.prototype.setDestFolder = function (destFolder) {
    this.destFolder = destFolder;
}
GlobFolderCopy.prototype.execute = function (done) {
    console.log('GlobFolderCopy.execute', this.srcFolder);
    if (this.deleteDest) {
        del.sync([this.destFolder + '/**'], { force: true });
    }
    var self = this;
    glob(this.srcFolder + '/**/*.*', {}, function (er, files) {
        files.forEach(function (item) {
            if (file.isFile(item) == false) return;
            var fileName = item.substr((self.srcFolder + '/').length);
            var fileTo = self.destFolder + '/' + fileName;
            file.copy(item, fileTo);
        });
        done();
    });
}

var WizziJobProducer = function (wizziJobPath, options) {
    this.wizziJobPath = wizziJobPath;
    this.options = options || {};
}
WizziJobProducer.prototype.execute = function (done) {


    var ittffolder = path.join(__dirname, "ittf/models");

    // Production options override the default options (see wizzi.options)
    var productionOptions = {
        indentSpaces: 4,    // 1 indent (tab) = 4 spaces
        basedir: __dirname,
        verbose: 2 // 0= error only, 1=warnings, 2=all
    };

    var pman = new ProductionManager(options(productionOptions));

    pman.registerModule(site);

    pman.addWizziJob({
        options: {}, // optional, override production options
        wizzi: {
            src: this.wizziJobPath,
        }
    });

    pman.run(function (err, result) {
        if (err) {
            console.log(util.inspect(err, { depth: null }));
            return;
        }
        pman.persistToFile(function (err, result) {
            if (err) {
                console.log(util.inspect(err, { depth: null }));
            }
            done();
        });
    });

}

md.GlobFolderProducer = GlobFolderProducer;
md.GlobFolderCopy = GlobFolderCopy;
md.WizziJobProducer = WizziJobProducer;
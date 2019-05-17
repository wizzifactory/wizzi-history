var path = require('path');
var async = require('async');
var glob = require('glob');
var wizzi = require('wizzi');
var file = wizzi.file;
var site = require('wizzi-lab-site');
var browserify = require('browserify');
var cacheify = require('cacheify');
var bundle = require('./bundle');
var leveldb = require('./leveldb');
var db = leveldb('./cache');

var md = module.exports = {}

md.bundleifyFromBundleIttf = function (bundleIttfPath, context, callback) {
    bundle.loadBrowserify(bundleIttfPath, context, function (err, options) {
        if (err) return callback(err);
        console.log('bundleifyFromBundleIttf.options', options);
        md.bundleify(options, context, callback);
    });
}

md.bundleify = function (options, context, callback) {

    context = context || {};

    var baseCwd = options.baseCwd;
    var ittfCwd = path.resolve(baseCwd, options.ittfFolder);
    var assetsCwd = path.resolve(baseCwd, options.assetsFolder);
    var buildCwd = path.resolve(baseCwd, options.buildFolder);

    var entryFilename = options.entryFilename;
    var bundleFilename = options.bundleFilename;

    getJsIttfFiles(ittfCwd, assetsCwd, function (err, generanda) {
        generanda.forEach(function (item) {
            item.__context = context;
        });
        console.log('generanda', generanda);

        async.map(generanda, Async_JsModule, function (err, result) {
            if (err) return callback(err);

            Async_Browserify({
                srcFolder: assetsCwd,
                srcFilename: entryFilename,
                destFolder: buildCwd,
                destFilename: bundleFilename,
                babel: options.babel,
                literal: options.literal
            }, function (err, result) {
                if (err) return callback(err);
                callback(null, result);
            });

        });
    });
}

function getJsIttfFiles(ittfCwd, assetsCwd, callback) {

    glob(ittfCwd + '/**/*.js.ittf', {}, function (err, jsFiles) {
        if (err) return callback(err);
        glob(ittfCwd + '/**/*.jsx.ittf', {}, function (err, jsxFiles) {
            if (err) return callback(err);
            var files = jsFiles.concat(jsxFiles);
            var generanda = []
            for (var i = 0, l = files.length; i < l; i++) {
                var item = files[i];
                if (item.indexOf('/t/') >= 0) return;
                if (file.isFile(item) == false) return;
                var fileName = item.substr((ittfCwd + '/').length);
                var fileTo = assetsCwd + '/' + fileName.substr(0, fileName.length - 5);
                generanda.push({
                    from: item,
                    to: fileTo
                });
            };
            callback(null, generanda);
        });
    });

}

function Async_JsModule(item, callback) {
    site.jsModule(item.from, item.__context, function (err, result) {
        if (err) return callback(err);
        file.write(item.to, result);
        callback(null);
    });
}

function Async_Browserify(options, callback) {
    var srcFolder = options.srcFolder;
    var srcFilename = options.srcFilename;
    var destFolder = options.destFolder;
    var destFilename = options.destFilename;
    var b = browserify(undefined, { extensions: ['.js', '.jsx'] });
    b.add(path.join(srcFolder, srcFilename));
    setBabelifyTransform(b, options);
    setLiteralifyTransform(b, options);
    b.bundle(function (err, buf) {
        if (err) return callback(err);
        file.write(path.join(destFolder, destFilename), buf.toString());
        callback('Bundle create at ' + path.join(destFolder, destFilename));
    });
}

function setBabelifyTransform(b, options) {
    if (!options.babel) return;
    var opt = options.babel;
    var babelOptions = { presets: [], plugins: [] };
    if (opt.es2015) {
        babelOptions.presets.push('es2015');
    }
    if (opt['stage-0']) {
        babelOptions.presets.push('stage-0');
    }
    if (opt['stage-1']) {
        if (opt['stage-0']) {
            console.warn('browserify-babelify: stage-1 included in stage-0, skipped');
        } else {
            babelOptions.presets.push('stage-1');
        }
    }
    if (opt['stage-2']) {
        if (opt['stage-0'] || opt['stage-1']) {
            console.warn('browserify-babelify: stage-2 included in stage-0/1, skipped');
        } else {
            babelOptions.presets.push('stage-2');
        }
    }
    if (opt['stage-3']) {
        if (opt['stage-0'] || opt['stage-1'] || opt['stage-2']) {
            console.warn('browserify-babelify: stage-3 included in stage-0/1/2, skipped');
        } else {
            babelOptions.presets.push('stage-3');
        }
    }
    if (opt.react) {
        babelOptions.presets.push('react');
    }
    b.transform(getBabelify(), babelOptions);
}

var babelify = null;
function getBabelify() {
    if (!babelify)
        babelify = cacheify(require("babelify"), db);
    return babelify;
}

function setLiteralifyTransform(b, options) {
    if (options.literal) {
        b.transform(getLiteralify().configure(options.literal));
    }
}

var literalify = null;
function getLiteralify() {
    if (!literalify)
        literalify = require("literalify");
    return literalify;
}

md.test = function () {
    md.bundleify({
        baseCwd: path.join(__dirname, 'examples/01'),
        ittfCwd: 'ittf',
        assetsCwd: 'assets',
        buildCwd: 'build',
        entryFilename: 'index.jsx',
        bundleFilename: 'bundle.js',
        babel: {
            es2015: true,
            react: true
        },
        literal: {
            "react": "window.React",
            "react-dom": "window.ReactDOM",
        }
    },
    {},
    function (err, result) {
        console.log('error', err);
    });
}
/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: c:\my\wizzi\v2\sources\plugins\wizzi-lab-spa\ittf\lib\artifacts\spa\project_files\trans\main.js.ittf
    utc time: Mon, 17 Jul 2017 15:07:32 GMT
*/
'use strict';
var __wz = (function() {
    var res = {};
    return {
        require: function(name) {
            return res[name];
        }
    }
})();
var util = require('util');
var path = require('path');
var _ = require('lodash');
var md = module.exports = {};
var myname = 'model.transformation.spa.project_files.main';
var babel = (function(__) {
    function analize(spa, ctx) {
        if (_.isObject(spa.babel) == false) {
            ctx.useBabel = false;
            return ;
        }
        ctx.useBabel = true;
    }
    function execute(spa, ctx) {
        if (!ctx.useBabel) {
            return ;
        }
        spa.package.addUniqueDevDependency("babel", "^6.23.0");
        spa.package.addUniqueDevDependency("babel-polyfill", "^6.23.0");
        if (ctx.useBrowserify) {
            spa.package.addUniqueDevDependency("babelify", "^7.3.0");
        }
        var i, i_len=spa.babel.babelPresets.length, preset;
        for (i=0; i<i_len; i++) {
            preset = spa.babel.babelPresets[i];
            if (preset.wzName == 'env') {
                spa.package.addUniqueDevDependency("babel-preset-env", "^1.2.2");
            }
            else if (preset.wzName == 'es2017') {
                spa.package.addUniqueDevDependency("babel-preset-es2017", "^6.22.0");
            }
            else if (preset.wzName == 'es2016') {
                spa.package.addUniqueDevDependency("babel-preset-es2016", "^6.22.0");
            }
            else if (preset.wzName == 'es2015') {
                spa.package.addUniqueDevDependency("babel-preset-es2015", "^6.24.0");
            }
            else if (preset.wzName == 'react') {
                spa.package.addUniqueDevDependency("babel-preset-react", "^6.23.0");
            }
        }
        if (ctx.useReact) {
            spa.package.addUniqueDevDependency("babel-preset-react", "^6.23.0");
        }
    }
    function babelrc(spa, ctx) {
        var gd = {
            name: 'babelrc', 
            file: '.babelrc', 
            lines: []
        };
        spa.genDatas.push(gd);
    }
    return {
        analize: analize,
        execute: execute
    };
})(__wz);

var browserify = (function(__) {
    function analize(spa, ctx) {
        if (_.isObject(spa.browserify) == false) {
            ctx.useBrowserify = false;
            return ;
        }
        ctx.useBrowserify = true;
        ctx.useGulp = true;
        if (spa.browserify.globItems.length > 0) {
            ctx.useGlob = true;
        }
        var i, i_len=spa.browserify.allItems.length, item;
        for (i=0; i<i_len; i++) {
            item = spa.browserify.allItems[i];
            if (item.watch) {
                ctx.useWatch = true;
                spa.browserify.useWatch = true;
            }
        }
    }
    function execute(spa, ctx) {
        if (!ctx.useBrowserify) {
            return ;
        }
        spa.package.addUniqueDevDependency("browserify", "^14.1.0");
        spa.package.addUniqueDevDependency("brfs", "^1.4.3");
        if (ctx.useReact) {
            spa.package.addUniqueDevDependency("reactify", "^1.1.1");
        }
        if (ctx.useIstanbul) {
            spa.package.addUniqueDevDependency("browserify-istanbul", "^2.0.0");
        }
    }
    return {
        analize: analize,
        execute: execute
    };
})(__wz);

var coverage = (function(__) {
    function analize(spa, ctx) {
        if (_.isObject(spa.test) == false || spa.test.testCoverages.length == 0) {
            ctx.useCoverage = false;
            return ;
        }
        ctx.useCoverage = true;
        var i, i_len=spa.test.testCoverages.length, item;
        for (i=0; i<i_len; i++) {
            item = spa.test.testCoverages[i];
            if (item.wzName == 'istanbul') {
                ctx.useIstanbul = true;
            }
            else if (item.wzName == 'codecov.io') {
                ctx.useCodecovIO = true;
            }
        }
    }
    function execute(spa, ctx) {
        if (!ctx.useCoverage) {
            return ;
        }
        if (ctx.useIstanbul) {
            spa.package.addUniqueDevDependency("istanbul", "^0.4.5");
        }
        if (ctx.useCodecovIO) {
            spa.package.addUniqueDevDependency("codecov.io", "^0.1.6");
        }
    }
    return {
        analize: analize,
        execute: execute
    };
})(__wz);

var git = (function(__) {
    function analize(spa, ctx) {
    }
    function execute(spa, ctx) {
        var gd = {
            name: 'gitignore', 
            file: '.gitignore', 
            lines: []
        };
        gd.lines.push('node_modules/');
        gd.lines.push('.DS_Store:');
        if (ctx.useCoverage) {
            gd.lines.push('coverage/');
        }
        gd.lines.push('npm-debug.log');
        spa.genDatas.push(gd);
    }
    return {
        analize: analize,
        execute: execute
    };
})(__wz);

// https://github.com/vigetlabs/gulp-starter
var gulp = (function(__) {
    function analize(spa, ctx) {
        if (_.isObject(spa.gulp) == false) {
            return ;
        }
        ctx.useGulp = true;
    }
    function execute(spa, ctx) {
        if (!ctx.useGulp) {
            return ;
        }
        spa.package.addUniqueDevDependency("gulp", "^3.9.1");
        spa.package.addUniqueDevDependency("gulp-util", "3.0.8");
        spa.package.addUniqueDevDependency("gulp-header", "1.8.8");
        spa.package.addUniqueDevDependency("gulp-banner", "0.1.3");
        spa.package.addUniqueDevDependency("async", "2.1.5");
        spa.package.addUniqueDevDependency("del", "2.2.2");
        spa.package.addUniqueDevDependency("uglifyify", "3.0.4");
        if (ctx.useWatch) {
            spa.package.addUniqueDevDependency("gulp-watch", "4.3.11");
        }
        if (ctx.useBrowserify) {
            spa.package.addUniqueDevDependency("gulp-uglify", "2.1.1");
            spa.package.addUniqueDevDependency("gulp-sourcemaps", "2.4.1");
            spa.package.addUniqueDevDependency("vinyl-source-stream", "1.1.0");
            spa.package.addUniqueDevDependency("vinyl-buffer", "1.0.0");
        }
        spa.package.addUniqueScript('build', 'gulp default');
        var gd = {};
        gd.name = 'gulp';
        gd.file = 'gulpfile.js';
        spa.genDatas.push(gd);
    }
    return {
        analize: analize,
        execute: execute
    };
})(__wz);

var karma = (function(__) {
    function analize(spa, ctx) {
        if (_.isObject(spa.karma) == false) {
            ctx.useKarma = false;
            return ;
        }
        ctx.useKarma = true;
    }
    function execute(spa, ctx) {
        if (!ctx.useKarma) {
            return ;
        }
        spa.package.addUniqueDevDependency("karma", "^1.5.0");
        if (ctx.useBrowserify) {
            spa.package.addUniqueDevDependency("karma-browserify", "^5.0.5");
        }
        var i, i_len=spa.test.testBrowsers.length, item;
        for (i=0; i<i_len; i++) {
            item = spa.test.testBrowsers[i];
            if (item.wzName === 'chrome') {
                spa.package.addUniqueDevDependency("karma-chrome-launcher", "^2.0.0");
            }
            else if (item.wzName === 'firefox') {
                spa.package.addUniqueDevDependency("karma-safari-launcher", "^1.0.0");
            }
            else if (item.wzName === 'ie') {
                spa.package.addUniqueDevDependency("karma-ie-launcher", "^1.0.0");
            }
            else if (item.wzName === 'safari') {
                spa.package.addUniqueDevDependency("karma-safari-launcher", "^1.0.0");
            }
            else if (item.wzName === 'phantomjs') {
                spa.package.addUniqueDevDependency("karma-safari-launcher", "^1.0.2");
            }
        }
        var i, i_len=spa.test.testFrameworks.length, item;
        for (i=0; i<i_len; i++) {
            item = spa.test.testFrameworks[i];
            if (item.wzName === 'mocha') {
                spa.package.addUniqueDevDependency("karma-mocha", "^1.1.1");
                spa.package.addUniqueDevDependency("karma-mocha-reporter", "^2.0.4");
            }
            else if (item.wzName === 'firefox') {
                spa.package.addUniqueDevDependency("karma-safari-launcher", "^1.0.0");
            }
        }
        if (ctx.useCoverage) {
            spa.package.addUniqueDevDependency("karma-coverage", "^1.0.0");
        }
        if (ctx.useSinon && ctx.useChai) {
            spa.package.addUniqueDevDependency("karma-sinon-chai", "^1.2.2");
        }
    }
    return {
        analize: analize,
        execute: execute
    };
})(__wz);

var license = (function(__) {
    function analize(spa, ctx) {
    }
    function execute(spa, ctx) {
        var gd = {
            name: 'license', 
            file: 'license.txt', 
            lines: []
        };
        gd.lines.push('MIT License');
        gd.lines.push('');
        gd.lines.push('Copyright (c) 1983-2017 Stefano Bassoli');
        gd.lines.push('');
        gd.lines.push('Permission is hereby granted, free of charge, to any person obtaining a copy');
        gd.lines.push('of this software and associated documentation files (the "Software"), to deal');
        gd.lines.push('in the Software without restriction, including without limitation the rights');
        gd.lines.push('to use, copy, modify, merge, publish, distribute, sublicense, and/or sell');
        gd.lines.push('copies of the Software, and to permit persons to whom the Software is');
        gd.lines.push('furnished to do so, subject to the following conditions:');
        gd.lines.push('');
        gd.lines.push('The above copyright notice and this permission notice shall be included in');
        gd.lines.push('all copies or substantial portions of the Software.');
        gd.lines.push('');
        gd.lines.push('THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR');
        gd.lines.push('IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,');
        gd.lines.push('FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE');
        gd.lines.push('AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER');
        gd.lines.push('LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,');
        gd.lines.push('OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN');
        gd.lines.push('THE SOFTWARE.');
        spa.genDatas.push(gd);
    }
    return {
        analize: analize,
        execute: execute
    };
})(__wz);

var react = (function(__) {
    // http://redux.js.org/
    function analize(spa, ctx) {
        if (_.isObject(spa.react) == false) {
            ctx.useReact = false;
            return ;
        }
        ctx.useReact = true;
    }
    function execute(spa, ctx) {
        if (!ctx.useReact) {
            return ;
        }
        spa.package.addUniqueDevDependency("react", "^15.4.2");
        spa.package.addUniqueDevDependency("react-dom", "^15.4.2");
    }
    return {
        analize: analize,
        execute: execute
    };
})(__wz);

var sinon = (function(__) {
    function analize(spa, ctx) {
        if (_.isObject(spa.sinon) == false) {
            ctx.useSinon = false;
            return ;
        }
        ctx.useSinon = true;
    }
    function execute(spa, ctx) {
        if (!ctx.useSinon) {
            return ;
        }
        spa.package.addUniqueDevDependency("sinon", "^2.0.0");
    }
    return {
        analize: analize,
        execute: execute
    };
})(__wz);

var travis = (function(__) {
    function analize(spa, ctx) {
        if (_.isObject(spa.travis) == false) {
            ctx.useTravis = false;
            return ;
        }
        ctx.useTravis = true;
    }
    function execute(spa, ctx) {
        if (!ctx.useTravis) {
            return ;
        }
        var gd = {
            name: 'travis', 
            file: '.travis.yml', 
            lines: []
        };
        gd.lines.push('language: node_js');
        gd.lines.push('node_js:');
        gd.lines.push('  - node');
        gd.lines.push('cache:');
        if (ctx.useYarn) {
            gd.lines.push('  yarn:true');
        }
        gd.lines.push('  directories:');
        gd.lines.push('    - node_modules');
        if (ctx.useYarn && ctx.useCodecov) {
            gd.lines.push('after_script:');
            gd.lines.push('  - yarn codecov');
        }
        gd.lines.push('notifications:');
        gd.lines.push('  email: false');
        spa.genDatas.push(gd);
    }
    return {
        analize: analize,
        execute: execute
    };
})(__wz);

var webpack = (function(__) {
    function analize(spa, ctx) {
        if (_.isObject(spa.webpack) == false) {
            ctx.useWebpack = false;
            return ;
        }
        ctx.useWebpack = true;
        ctx.webpack = spa.webpack.ctx = {};
        var i, i_len=spa.webpack.webpackLoaders.length, loader;
        for (i=0; i<i_len; i++) {
            loader = spa.webpack.webpackLoaders[i];
            if (loader.wzName === 'eslint') {
                ctx.webpack.useEslintLoader = true;
            }
            else if (loader.wzName === 'file') {
                ctx.webpack.useFileLoader = true;
            }
            else if (loader.wzName === 'url') {
                ctx.webpack.useUrlLoader = true;
            }
            else if (loader.wzName === 'babel') {
                ctx.webpack.useBabelLoader = true;
            }
            else if (loader.wzName === 'jsx') {
                ctx.webpack.useJSXLoader = true;
            }
            else if (loader.wzName === 'css') {
                ctx.webpack.useCssLoader = true;
            }
            else if (loader.wzName === 'style') {
                ctx.webpack.useStyleLoader = true;
            }
            else if (loader.wzName === 'less') {
                ctx.webpack.useLessLoader = true;
            }
            else {
                ctx.errors.push({
                    message: "Webpack loader unknown: '" + loader.wzName + "'"
                });
            }
        }
        var i, i_len=spa.webpack.webpackPlugins.length, plugin;
        for (i=0; i<i_len; i++) {
            plugin = spa.webpack.webpackPlugins[i];
            if (plugin.wzName === 'interpolate-html') {
                ctx.webpack.useInterpolateHtmlPlugin = true;
            }
            else if (plugin.wzName === 'html') {
                ctx.webpack.useHtmlPlugin = true;
            }
            else if (plugin.wzName === 'case-sensitive') {
                ctx.webpack.useCaseSensitivePathPlugin = true;
            }
            else if (plugin.wzName === 'missing-node-modules') {
                ctx.webpack.useMissingNodeModulesPlugin = true;
            }
            else if (plugin.wzName === 'open-browser') {
                ctx.webpack.useOpenBrowserPlugin = true;
            }
            else if (plugin.wzName === 'extract-text') {
                ctx.webpack.useExtractTextPlugin = true;
            }
            else if (plugin.wzName === 'uglify') {
                ctx.webpack.useUglifyPlugin = true;
            }
            else if (plugin.wzName === 'manifest') {
                ctx.webpack.useManifestPlugin = true;
            }
            else {
                ctx.errors.push({
                    message: "Webpack plugin unknown: '" + plugin.wzName + "'"
                });
            }
        }
    }
    function execute(spa, ctx) {
        if (!ctx.useWebpack) {
            return ;
        }
        spa.package.addUniqueDevDependency("webpack", "^2.2.1");
        /**
             LOADERS
        */
        if (ctx.webpack.useEslintLoader) {
            spa.package.addUniqueDevDependency("eslint-loader", "^1.6.3");
        }
        if (ctx.webpack.useCssLoader) {
            spa.package.addUniqueDevDependency("autoprefixer", "^6.7.7");
            spa.package.addUniqueDevDependency("css-loader", "^0.27.3");
        }
        if (ctx.webpack.useFileLoader) {
            spa.package.addUniqueDevDependency("file-loader", "^0.10.1");
        }
        if (ctx.webpack.useUrlLoader) {
            spa.package.addUniqueDevDependency("url-loader", "^0.5.8");
        }
        if (ctx.webpack.useBabelLoader) {
            spa.package.addUniqueDevDependency("babel-loader", "^6.4.1");
        }
        if (ctx.webpack.useJSXLoader) {
            spa.package.addUniqueDevDependency("jsx-loader", "^0.13.2");
        }
        if (ctx.webpack.useStyleLoader) {
            spa.package.addUniqueDevDependency("style-loader", "^0.15.0");
        }
        if (ctx.webpack.useLessLoader) {
            spa.package.addUniqueDevDependency("less", "^2.7.2");
            spa.package.addUniqueDevDependency("less-loader", "^4.0.0");
        }
        /**
             PLUGINS
        */
        if (ctx.webpack.useInterpolateHtmlPlugin) {
            spa.package.addUniqueDevDependency("react-dev-utils", "^0.5.2");
        }
        if (ctx.webpack.useHtmlPlugin) {
            spa.package.addUniqueDevDependency("html-webpack-plugin", "^2.28.0");
        }
        if (ctx.webpack.useCaseSensitivePathPlugin) {
            spa.package.addUniqueDevDependency("case-sensitive-paths-webpack-plugin", "^1.1.4");
        }
        if (ctx.webpack.useMissingNodeModulesPlugin) {
            spa.package.addUniqueDevDependency("react-dev-utils", "^0.5.2");
        }
        if (ctx.webpack.useManifestPlugin) {
            spa.package.addUniqueDevDependency("webpack-manifest-plugin", "^1.1.0");
        }
        if (ctx.webpack.useExtractTextPlugin) {
            spa.package.addUniqueDevDependency("extract-text-webpack-plugin", "^2.1.0");
        }
        if (ctx.webpack.useOpenBrowserPlugin) {
            spa.package.addUniqueDevDependency("open-browser-webpack-plugin", "^0.0.5");
        }
        var gd = {};
        gd.name = 'webpack';
        gd.file = 'webpack.config.js';
        spa.genDatas.push(gd);
        if (ctx.useReact) {
            gd = {};
            gd.name = 'react-webpack-env';
            gd.file = 'env.js';
            spa.genDatas.push(gd);
            gd = {};
            gd.name = 'react-webpack-paths';
            gd.file = 'paths.js';
            spa.genDatas.push(gd);
            gd = {};
            gd.name = 'react-webpack-polyfill';
            gd.file = 'polyfill.js';
            spa.genDatas.push(gd);
        }
    }
    return {
        analize: analize,
        execute: execute
    };
})(__wz);

var yarn = (function(__) {
    function analize(spa, ctx) {
        if (_.isObject(spa.yarn) == false) {
            ctx.useYarn = false;
            return ;
        }
        ctx.useYarn = true;
    }
    function execute(spa, ctx) {
        if (!ctx.useYarn) {
            return ;
        }
    }
    return {
        analize: analize,
        execute: execute
    };
})(__wz);

var xpackage = (function(__) {
    function analize(spa, ctx) {
        if (_.isObject(spa.package) == false) {
            // TODO
        }
    }
    function execute(spa, ctx) {
        var gd = spa.package;
        gd.name = 'package';
        gd.file = 'package.json';
        spa.genDatas.push(gd);
    }
    return {
        analize: analize,
        execute: execute
    };
})(__wz);

var finish = (function(__) {
    function analize(spa, ctx) {
    }
    function execute(spa, ctx) {
        if (!ctx.useGlob) {
            spa.package.addUniqueDevDependency("glob", "^7.1.1");
        }
    }
    return {
        analize: analize,
        execute: execute
    };
})(__wz);

md.trans = function(model, ctx, callback) {
    var spa = model;
    spa.genDatas = [];
    var ctx = {
        errors: []
    };
    babel.analize(spa, ctx);
    browserify.analize(spa, ctx);
    coverage.analize(spa, ctx);
    git.analize(spa, ctx);
    gulp.analize(spa, ctx);
    karma.analize(spa, ctx);
    license.analize(spa, ctx);
    react.analize(spa, ctx);
    sinon.analize(spa, ctx);
    travis.analize(spa, ctx);
    webpack.analize(spa, ctx);
    yarn.analize(spa, ctx);
    finish.analize(spa, ctx);
    babel.execute(spa, ctx);
    browserify.execute(spa, ctx);
    coverage.execute(spa, ctx);
    git.execute(spa, ctx);
    gulp.execute(spa, ctx);
    karma.execute(spa, ctx);
    license.execute(spa, ctx);
    react.execute(spa, ctx);
    sinon.execute(spa, ctx);
    travis.execute(spa, ctx);
    webpack.execute(spa, ctx);
    yarn.execute(spa, ctx);
    finish.execute(spa, ctx);
    // must be the last one
    xpackage.execute(spa, ctx);
    spa.__ctx = ctx;
    if (ctx.errors.length > 0) {
        callback(ctx.errors);
    }
    else {
        callback(null, spa);
    }
};

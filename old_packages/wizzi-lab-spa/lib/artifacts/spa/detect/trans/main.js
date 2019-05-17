/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: c:\my\wizzi\v2\sources\plugins\wizzi-lab-spa\ittf\lib\artifacts\spa\detect\trans\main.js.ittf
    utc time: Mon, 17 Jul 2017 15:07:32 GMT
*/
'use strict';
var util = require('util');
var path = require('path');
var wizzi = require('wizzi');
var log = wizzi.log(module);
var md = module.exports = {};
var myname = 'model.transformation.spa.bundler.main';
md.trans = function(model, ctx, callback) {
    if (model.wzElement != 'spa') {
        wizzi.errors.NodeError(myname + '.trans. Model wzElement must be spa. Found: ' + model.wzElement, model);
    }
    var ctx = {};
    searchFeatures(model, ctx);
    searchPackages(model, ctx);
    callback(null, model);
};
function searchFeatures(spa,ctx) {
    if (spa.react) {
        ctx.useReact = true;
        if (spa.react.flux) {
            ctx['use_flux_' + spa.react.flux.wzName] = true;
            if (spa.react.flux.persist === 'redux-persist') {
                ctx.use_redux_persist = true;
            }
        }
        if (spa.react.dnd) {
            ctx['use_react_dnd'] = true;
        }
    }
}

function searchPackages(spa,ctx) {
    var wp = spa.webpack;
    spa.package.addUniqueDevDependency("autoprefixer-loader", "^2.0.0");
    if (ctx.use_flux_alt) {
        spa.package.addUniqueDependency("alt", "^0.17.9");
        spa.package.addUniqueDependency("alt-container", "^1.0.0");
    }
    if (ctx.use_flux_redux) {
        spa.package.addUniqueDependency("redux", "^3.0.4");
        if (ctx.useReact) {
            spa.package.addUniqueDependency("react-redux", "^4.0.0");
        }
        if (ctx.use_redux_persist) {
            spa.package.addUniqueDependency("redux-persist", "^1.4.3");
        }
    }
    if (spa.buildSystem === 'gulp') {
        spa.package.addUniqueDevDependency("del", "^1.2.0");
        spa.package.addUniqueDevDependency("gulp", "^3.9.0");
        spa.package.addUniqueDevDependency("gulp-changed", "^1.2.1");
        spa.package.addUniqueDevDependency("gulp-inject", "^1.3.1");
        spa.package.addUniqueDevDependency("gulp-inject-string", "0.0.2");
        spa.package.addUniqueDevDependency("gulp-load-plugins", "^0.10.0");
        spa.package.addUniqueDevDependency("gulp-size", "^1.2.1");
        spa.package.addUniqueDevDependency("gulp-util", "^3.0.5");
        spa.package.addUniqueDevDependency("open", "0.0.5");
        spa.package.addUniqueDevDependency("run-sequence", "^1.1.0");
    }
    if (wp && wp.webpackEntry.kind === 'array') {
        var i, i_len=wp.webpackEntry.jsArray.spaitems.length, entry;
        for (i=0; i<i_len; i++) {
            entry = wp.webpackEntry.jsArray.spaitems[i];
            if (entry.name === "'babel-polyfill'") {
                spa.package.addUniqueDependency("babel-polyfill", "^6.0.16");
            }
        }
    }
    if (spa.useBabel5) {
        spa.package.addUniqueDevDependency("babel-core", "5.8.33");
        spa.package.addUniqueDevDependency("babel-loader", "5.3.3");
        if (ctx.useReact) {
            spa.package.addUniqueDevDependency("babel-plugin-react-transform", "1.1.1");
        }
    }
    if (spa.useBabel6) {
        spa.package.addUniqueDevDependency("babel-core", "^6.1.2");
        spa.package.addUniqueDevDependency("babel-loader", "^6.0.1");
        if (spa.babelEsLint) {
            spa.package.addUniqueDevDependency("babel-eslint", "^3.1.23");
        }
        if (spa.babelDevExpression) {
            spa.package.addUniqueDevDependency("babel-plugin-dev-expression", "^0.1.0");
        }
        var i, i_len=spa.babelPresets.length, p;
        for (i=0; i<i_len; i++) {
            p = spa.babelPresets[i];
            if (p === 'es2015') {
                spa.package.addUniqueDevDependency("babel-preset-es2015", "6.1.2");
            }
            if (p === 'react') {
                spa.package.addUniqueDevDependency("babel-preset-react", "6.1.2");
            }
            if (p === 'stage0') {
                spa.package.addUniqueDevDependency("babel-preset-stage0", "*");
            }
            if (p === 'stage1') {
                spa.package.addUniqueDevDependency("babel-preset-stage1", "*");
            }
            if (p === 'stage2') {
                spa.package.addUniqueDevDependency("babel-preset-stage2", "*");
            }
            if (p === 'stage3') {
                spa.package.addUniqueDevDependency("babel-preset-stage3", "*");
            }
        }
    }
    if (spa.babelPlugins) {
        var i, i_len=spa.babelPlugins.length, plugin;
        for (i=0; i<i_len; i++) {
            plugin = spa.babelPlugins[i];
            if (plugin === 'transform-runtime') {
                spa.package.addUniqueDevDependency("babel-runtime", "*");
                spa.package.addUniqueDevDependency("babel-plugin-transform-runtime", "*");
            }
        }
    }
    if (wp) {
        var i, i_len=wp.webpackLoaders.length, loader;
        for (i=0; i<i_len; i++) {
            loader = wp.webpackLoaders[i];
            if (loader.wzName.indexOf('file') >= 0) {
                spa.package.addUniqueDevDependency("file-loader", "~0.8.4");
            }
            if (loader.wzName.indexOf('url') >= 0) {
                spa.package.addUniqueDevDependency("url-loader", "~0.5.6");
            }
            if (loader.wzName.indexOf('jsx') >= 0) {
                spa.package.addUniqueDevDependency("jsx-loader", "~0.13.2");
            }
            if (loader.wzName.indexOf('css') >= 0) {
                spa.package.addUniqueDevDependency("css-loader", "^0.19.0");
            }
            if (loader.wzName.indexOf('style') >= 0) {
                spa.package.addUniqueDevDependency("style-loader", "^0.12.4");
            }
            if (loader.wzName.indexOf('less') >= 0) {
                spa.package.addUniqueDevDependency("less", "^2.5.1");
                spa.package.addUniqueDevDependency("less-loader", "^2.2.0");
            }
        }
        var i, i_len=wp.webpackPlugins.length, p;
        for (i=0; i<i_len; i++) {
            p = wp.webpackPlugins[i];
            if (p.wzName === 'open-browser') {
                spa.package.addUniqueDevDependency("open-browser-webpack-plugin", "0.0.1");
            }
            if (p.wzName === 'html') {
                spa.package.addUniqueDevDependency("html-webpack-plugin", "~1.6.2");
            }
            if (p.wzName === 'extract-text') {
                spa.package.addUniqueDevDependency("extract-text-webpack-plugin", "^0.8.2");
            }
        }
    }
    if (ctx.useReact) {
        spa.package.addUniqueDevDependency("react", "^0.14.2");
        spa.package.addUniqueDevDependency("react-dom", "^0.14.2");
        spa.package.addUniqueDevDependency("react-transform-hmr", "^1.0.1");
    }
    if (ctx.use_react_dnd) {
        spa.package.addUniqueDevDependency("react-dnd", "^2.0.2");
        spa.package.addUniqueDevDependency("react-dnd-html5-backend", "^2.0.0");
    }
    if (spa.webpack) {
        spa.package.addUniqueDevDependency("webpack", "^1.10.0");
        spa.package.addUniqueDevDependency("webpack-merge", "^0.2.0");
        if (spa.devServer.wzName === 'webpack') {
            spa.package.addUniqueDevDependency("webpack-dev-middleware", "^1.2.0");
            spa.package.addUniqueDevDependency("webpack-dev-server", "^1.10.1");
        }
    }
    var i, i_len=spa.usages.length, usage;
    for (i=0; i<i_len; i++) {
        usage = spa.usages[i];
        if (usage.wzName === 'in-browser') {
            spa.package.addUniqueDevDependency("node-libs-browser", "^0.5.2");
        }
    }
}


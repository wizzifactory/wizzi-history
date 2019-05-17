/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-studio\wizzi\ittf\server\ittfcssresources.js.ittf
    utc time: Thu, 06 Dec 2018 17:50:06 GMT
*/
'use strict';
var path = require('path');
var file = require('wizzi').file;
var md = module.exports = {};
var css_resources = {};
function css_r(name, fileName) {
    name = name.toLowerCase();
    css_resources[name] = path.join(__dirname, 'static', 'lib', fileName);
}
css_r('angular-table', '/angular-table/src/main/webapp/css/lib/angular-table.css');
css_r('bootstrap', 'wizzi/bootstrap.wizzi.css');
css_r('bootstrap-slider', 'seiyria-bootstrap-slider/dist/css/bootstrap-slider.css');
css_r('codemirror-js', 'codemirror/lib/codemirror.css');
css_r('font-awesome', 'font-awesome/css/font-awesome.wizzi.css');
css_r('form-validation', 'commercial/formValidation/formValidation.min.css');
css_r('humane', 'humane-js/themes/jackedup.css');
css_r('iconfont-awesome', 'fontawesome-iconpicker/dist/css/fontawesome-iconpicker.css');
css_r('iphonecheck', 'iphonecheck/iphone-style-checkboxes.wizzi.css');
css_r('prettify', 'google-code-prettify/src/prettify.css');
css_r('select2', 'select2/dist/css/select2.css');
css_r('select2-bootstrap', 'select2-bootstrap-theme/dist/select2-bootstrap.css');
css_r('sh', 'syntaxhighlighter/styles/shCore.css');
css_r('sh-core-default', 'syntaxhighlighter/styles/shCoreDefault.css');
css_r('sh-theme-default', 'syntaxhighlighter/styles/shThemeDefault.css');
css_r('semantic', 'semantic-UI/semantic.css');
css_r('spectrum', 'spectrum/spectrum.css');
css_r('typeahead', 'typeahead/typeahead.css');
var cssRequested = {};
var cssIsEmitted = {};
md.clearCssDependencies = function() {
    cssRequested = {};
    cssIsEmitted = {};
};
md.addCssDependency = function(deps) {
    var depsArray = deps.split(',');
    var i, i_items=depsArray, i_len=depsArray.length, dep;
    for (i=0; i<i_len; i++) {
        dep = depsArray[i];
        cssRequested[dep] = true;
    }
};
md.emitCssDependencies = function(ctx) {
    for (var k in cssRequested) {
        if (cssRequested[k] === true) {
            _emitCssDependency(k, ctx);
        }
    }
};
function _emitCssDependency(dep, ctx) {
    var dep = dep.trim().toLowerCase();
    if (cssIsEmitted[dep]) {
        return ;
    }
    cssIsEmitted[dep] = true;
    checkCssRequirements(dep, ctx);
    var fileName = css_resources[dep];
    if (!fileName) {
        throw new Error("Css.module.generation. Dependency " + dep + ' not found.');
    }
    if (file.exists(fileName)) {
        var content = file.read(fileName);
        ctx.w(content);
    }
    else {
        throw new Error("Css.module.generation. File for dependency " + dep + ' not found. Filename: ' + fileName);
    }
    cssCheckTail(dep, ctx);
}
function checkCssRequirements(dep, ctx) {
    if (dep === 'form-validation') {
        _emitCssDependency('font-awesome', ctx);
    }
    else if (dep === 'form-validation-bootstrap') {
        _emitCssDependency('bootstrap', ctx);
        _emitCssDependency('form-validation', ctx);
        return false;
    }
    else if (['bootstrap-switch', 'bootstrap-slider'].indexOf(dep) >= 0) {
        _emitCssDependency('bootstrap', ctx);
    }
    else if (['sh-js', 'sh-xml'].indexOf(dep) >= 0) {
        _emitCssDependency('sh', ctx);
        _emitCssDependency('sh-core-default', ctx);
        _emitCssDependency('sh-theme-default', ctx);
        return false;
    }
    return true;
}
function cssCheckTail(dep, ctx) {
    if (dep === 'select2') {
        _emitCssDependency('select2-bootstrap', ctx);
    }
}

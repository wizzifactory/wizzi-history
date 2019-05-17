/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-studio\wizzi\ittf\server\ittfjsresources.js.ittf
    utc time: Thu, 06 Dec 2018 17:50:06 GMT
*/
'use strict';
var path = require('path');
var file = require('wizzi').file;
var md = module.exports = {};
var js_resources = {};
function js_r(name, fileName) {
    name = name.toLowerCase();
    js_resources[name] = path.join(__dirname, 'static', 'lib', fileName);
}
js_r('ace', 'ace/ace-builds/src-noconflict/ace.js');
js_r('ace-js', 'ace/ace-builds/src-noconflict/mode-javascript.js');
js_r('ace-monokay', 'ace/ace-builds/src-noconflict/theme-monokai.js');
js_r('angular', 'angular/angular.js');
js_r('angular-animate', 'angular-animate/angular-animate.js');
js_r('angular-local-storage', 'angular-local-storage/dist/angular-local-storage.js');
js_r('angular-resource', 'angular-resource/angular-resource.js');
js_r('angular-route', 'angular-route/angular-route.js');
js_r('angular-scroll', 'angular-scroll/angular-scroll.js');
js_r('angular-strap', 'angular-strap/dist/angular-strap.js');
js_r('angular-strap-tpl', 'angular-strap/dist/angular-strap.tpl.js');
js_r('angular-table', '/angular-table/src/main/webapp/js/lib/angular-table.js');
js_r('angular-translate', 'angular-translate/angular-translate.js');
js_r('angular-translate-loader-partial', 'angular-translate-loader-partial/angular-translate-loader-partial.js');
js_r('angular-ui-router', 'angular-ui-router/release/angular-ui-router.js');
js_r('textarea-autosize', 'autosize/dist/autosize.js');
js_r('base64', 'js-base64/base64.js');
js_r('bootbox', 'bootbox.js/bootbox.js');
js_r('bootstrap', 'bootstrap/dist/js/bootstrap.js');
js_r('bootstrap-switch', 'bootstrap-switch/dist/js/bootstrap-switch.js');
js_r('bootstrap-slider', 'seiyria-bootstrap-slider/dist/bootstrap-slider.js');
js_r('codemirror', 'codemirror/lib/codemirror.js');
js_r('codemirror-js', 'codemirror/mode/javascript/javascript.js');
js_r('form-validation', 'commercial/formvalidation/formvalidation.min.js');
js_r('form-validation-bootstrap', 'commercial/formvalidation/formvalidation.bootstrap.min.js');
js_r('fonticon', 'fontIconPicker/jquery.fonticonpicker.js');
js_r('geocomplete', 'geocomplete/jquery.geocomplete.js');
js_r('humane', 'humane-js/humane.js');
js_r('handlebars', 'handlebars/handlebars.js');
js_r('iconfont-awesome', 'fontawesome-iconpicker/dist/js/fontawesome-iconpicker.js');
js_r('iphonecheck', 'iphonecheck/iphone-style-checkboxes.js');
js_r('jquery', 'jquery/dist/jquery.js');
js_r('jquery-mask', 'jquery.mask/jquery.mask.js');
js_r('prettify', 'google-code-prettify/src/prettify.js');
js_r('nprogress', 'nprogress/nprogress.js');
js_r('sh', 'syntaxhighlighter/scripts/shCore.js');
js_r('sh-autoloader', 'syntaxhighlighter/scripts/shAutoloader.js');
js_r('sh-js', 'syntaxhighlighter/scripts/shBrushJScript.js');
js_r('sh-plain', 'syntaxhighlighter/scripts/shBrushPlain.js');
js_r('sh-xml', 'syntaxhighlighter/scripts/shBrushXml.js');
js_r('select2', 'select2/dist/js/select2.full.js');
js_r('semantic', 'semantic-UI/semantic.js');
js_r('spectrum', 'spectrum/spectrum.js');
js_r('spinner', 'spin/spin.js');
js_r('string', 'string/string.js');
js_r('typeahead', 'typeahead/typeahead.bundle.js');
js_r('underscore', 'underscore/underscore.js');
var jsRequested = {};
var jsIsEmitted = {};
md.clearJsDependencies = function() {
    jsRequested = {};
    jsIsEmitted = {};
};
md.addJsDependency = function(deps) {
    var depsArray = deps.split(',');
    var i, i_items=depsArray, i_len=depsArray.length, dep;
    for (i=0; i<i_len; i++) {
        dep = depsArray[i];
        jsRequested[dep] = true;
    }
};
md.emitJsDependencies = function(ctx) {
    for (var k in jsRequested) {
        if (jsRequested[k] === true) {
            _emitJsDependency(k, ctx);
        }
    }
};
function _emitJsDependency(dep, ctx) {
    var dep = dep.trim().toLowerCase();
    if (jsIsEmitted[dep]) {
        return ;
    }
    jsIsEmitted[dep] = true;
    checkJsRequirements(dep, ctx);
    var fileName = js_resources[dep];
    if (!fileName) {
        throw new Error("Js.module.generation. Dependency " + dep + ' not found.');
    }
    if (file.exists(fileName)) {
        var content = file.read(fileName);
        ctx.w(content);
    }
    else {
        throw new Error("Js.module.generation. File for dependency " + dep + ' not found. Filename: ' + fileName);
    }
    jsCheckTail(dep, ctx);
}
function checkJsRequirements(dep, ctx) {
    if (dep === 'ace-js') {
        _emitJsDependency('ace', ctx);
        _emitJsDependency('ace-monokay', ctx);
    }
    else if (dep === 'angular-resource') {
        _emitJsDependency('angular', ctx);
    }
    else if (dep === 'bootbox') {
        _emitJsDependency('bootstrap', ctx);
    }
    else if (dep === 'bootstrap') {
        _emitJsDependency('jquery', ctx);
    }
    else if (dep === 'angular-strap') {
        _emitJsDependency('angular-animate', ctx);
    }
    else if (['bootstrap-switch', 'bootstrap-slider'].indexOf(dep) >= 0) {
        _emitJsDependency('bootstrap', ctx);
    }
    else if (dep === 'codemirror-js') {
        _emitJsDependency('codemirror', ctx);
    }
    else if (dep === 'form-validation-bootstrap') {
        _emitJsDependency('bootstrap', ctx);
        _emitJsDependency('form-validation', ctx);
    }
    else if (dep === 'select2-bootstrap') {
        _emitJsDependency('bootstrap', ctx);
        _emitJsDependency('select2', ctx);
    }
    else if (dep === 'iphonecheck') {
        _emitJsDependency('jquery', ctx);
    }
    else if (dep === 'jquery-mask') {
        _emitJsDependency('jquery', ctx);
    }
    else if (['sh-js', 'sh-xml'].indexOf(dep) >= 0) {
        _emitJsDependency('sh', ctx);
        _emitJsDependency('sh-autoloader', ctx);
        _emitJsDependency('sh-plain', ctx);
        _emitJsDependency('sh-xml', ctx);
    }
    else if (dep === 'typeahead') {
        _emitJsDependency('bootstrap', ctx);
    }
}
function jsCheckTail(dep, ctx) {
    if (dep === 'angular-translate') {
        _emitJsDependency('angular-translate-loader-partial', ctx);
    }
    else if (dep === 'angular-strap') {
        _emitJsDependency('angular-strap-tpl', ctx);
    }
}

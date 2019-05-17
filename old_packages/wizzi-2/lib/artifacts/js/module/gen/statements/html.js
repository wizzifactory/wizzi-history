/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: C:\My\wizzi\v2\sources\wizzi-2-boot\ittf\lib\artifacts\js\module\gen\statements\html.js.ittf
    utc time: Tue, 11 Jul 2017 17:02:26 GMT
*/
'use strict';
var u = require('./util');
var _ = require('lodash');
var lineParser = require('../../../../../util/lineParser');
var verify = require('../../../../../util/verify');
var html_react = require('../kinds/react/html');

var myname = 'js.module.statements.html';
var md = module.exports = {};

md.load = function(cnt) {
    var _tags = "a abbr address area article aside audio b base bdi bdo big blockquote body br" + " button canvas caption cite code col colgroup data datalist dd del details dfn" + " dialog div dl dt em embed fieldset figcaption figure footer form h1 h2 h3 h4 h5" + " h6 head header hr html i iframe img input ins kbd keygen label legend li link" + " main map mark menu menuitem meta meter nav noscript object ol optgroup option" + " output p param picture pre progress q rp rt ruby s samp script section select" + " small source span strong _style sub summary sup svg table tbody td textarea tfoot th" + " thead time title tr track u ul var video wbr" + " altGlyph altGlyphDef altGlyphItem animate animateColor animateMotion animateTransform" + " circle clipPath color-profile cursor defs desc discard ellipse" + " filter font font-face font-face-format font-face-name font-face-src font-face-uri" + " foreignObject g glyph glyphRef hatch hatchpath hkern image line linearGradient" + " marker mask metadata missing-glyph mpath path pattern polygon polyline radialGradient" + " rect solidcolor stop style svg switch symbol text textPath tref tspan" + " unknown use video view vkern";
    var html_supported_tags = _tags.split(' ');
    var _events = "copy cut paste " + " compositionEnd compositionStart compositionUpdate" + " keyDown keyPress keyUp" + " focus blur" + " change input submit" + " click contextMenu doubleClick" + " drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop" + " mouseDown mouseEnter mouseLeave mouseMove mouseOut mouseOver mouseUp" + " select" + " touchCancel touchEnd touchMove touchStart" + " scroll" + " wheel" + " abort canPlay canPlayThrough durationChange emptied encrypted"+ " ended error loadedData loadedMetadata loadStart pause play" + " playing progress rateChange seeked seeking stalled suspend" + " timeUpdate volumeChange waiting" + " load" + " transitionEnd";
    var html_supported_events = _events.split(' ');
    var html_supported_onEvents = [];
    var i, i_len=html_supported_events.length, item;
    for (i=0; i<i_len; i++) {
        item = html_supported_events[i];
        html_supported_onEvents.push('on' + _.capitalize(item));
    }
    cnt.stm.htmlelement = function(model,ctx) {
        var p = lineParser.parseNameValueRaw(model.wzName, model)
        ,
            tag = p.name(),
            text = p.value();
        md._htmlelement(cnt, model, tag, text, ctx);
    };
    var i, i_len=html_supported_tags.length, item;
    for (i=0; i<i_len; i++) {
        item = html_supported_tags[i];
        cnt.stm[item] = function(model,ctx) {
            md._htmlelement(cnt, model, ctx);
        };
    }
    var i, i_len=html_supported_onEvents.length, item;
    for (i=0; i<i_len; i++) {
        item = html_supported_onEvents[i];
        cnt.stm[item] = function() {
        };
    }
    cnt.stm.js = function(model,ctx) {
        ctx.w("__html.push('<script src=\"" + model.wzName + "\"></script>')");
    };
    cnt.stm.css = function(model,ctx) {
        ctx.w("__html.push('<link href=\"" + model.wzName + "\" rel=\"stylesheet\">')");
    };
    cnt.stm.doctype = function(model,ctx) {
        ctx.w("__html.push('<doctype " + model.wzName + ">')");
    };
    cnt.stm.ready = function(model,ctx) {
        if (model.kind === 'jquery') {
            ctx.w('$(function() {');
            cnt.genItems(model.statements, ctx, {
                indent: true
            });
            ctx.w('});');
        }
        else {
            ctx.w('window.onload = function() {');
            cnt.genItems(model.statements, ctx, {
                indent: true
            });
            ctx.w('};');
        }
    };
    cnt.stm.tohtml = function(model,ctx) {
        if (model.kind === 'dom') {
            cnt.stm.html_dom(model, ctx);
        }
        else if (model.kind === 'nh') {
            cnt.stm.html_ng(model, ctx);
        }
        else if (model.kind === 'hb') {
            cnt.stm.html_hb(model, ctx);
        }
        else {
            cnt.stm.html_f(model, ctx);
        }
    };
    cnt.stm.html_f = function(model,ctx) {
        ctx.w('function ' + model.wzName + '(ctx) {');
        ctx.indent();
        ctx.w('var __html = [];');
        ctx.__inside_html = true;
        cnt.genItems(model.statements, ctx, {
            indent: false
        });
        ctx.__inside_html = false;
        ctx.w("return __html.join('');");
        ctx.deindent();
        ctx.w("}");
    };
    cnt.stm.html_dom = function(model,ctx) {
        ctx.w('function ' + model.wzName + '(ctx) {');
        ctx.indent();
        ctx.w('var __html = [];');
        ctx.__inside_html = true;
        cnt.genItems(model.statements, ctx, {
            indent: false
        });
        ctx.__inside_html = false;
        ctx.w("return $(__html.join(''));");
        ctx.deindent();
        ctx.w("}");
    };
    cnt.stm.html_hb = function(model,ctx) {
        ctx.w('function ' + model.wzName + '(ctx) {');
        ctx.indent();
        ctx.w('var __html = [];');
        ctx.__inside_html = true;
        ctx.__inside_handlebar = true;
        cnt.genItems(model.statements, ctx, {
            indent: false
        });
        ctx.__inside_handlebar = false;
        ctx.__inside_html = false;
        ctx.w("return Handlebars.compile(__html.join(''));");
        ctx.deindent();
        ctx.w("}");
    };
    md._htmlelement = function(cnt,model,tag,text,ctx) {
        if (typeof (ctx) === 'undefined') {
            ctx = tag;
            text = model.wzName;
            tag = model.wzElement;
        }
        var attrs = getAttrs(model, ctx);
        var statements = null,
            value = null;
        var i, i_len=model.statements.length, s;
        for (i=0; i<i_len; i++) {
            s = model.statements[i];
            if (s.isEvent) {
                var name = s.wzElement;
                if (s.statements && s.statements.length > 0) {
                    value = null;
                    statements = s.statements;
                }
                else {
                    if (s.wzName.trim().length > 0) {
                        value = s.wzName.trim();
                    }
                    else {
                        value = '{this.' + s.wzElement + '}';
                    }
                    statements = null;
                }
                attrs.push({
                    name: name, 
                    value: value, 
                    statements: statements
                });
            }
            else if (s.wzElement === '_style') {
                name = 'style';
                if (s.statements && s.statements.length > 0) {
                    value = null;
                    statements = s.statements;
                }
                else {
                    value = s.wzName.trim();
                    statements = null;
                }
                attrs.push({
                    name: name, 
                    value: value, 
                    statements: statements
                });
            }
            else if (s.wzElement === 'jsPropertyOrValue') {
                var p = lineParser.parseNameValueRaw(s.wzName, s)
                ,
                    name = p.name(),
                    value = p.value();
                if (value) {
                    if (ctx.__jskind === 'react') {
                        ;
                    }
                    else {
                        var ip = lineParser.parseInterpolation(value, model, ctx.__inside_handlebar, ctx.__inside_ng)
                        ;
                        value = ip.join();
                    }
                }
                statements = s.statements && s.statements.length > 0 ? s.statements : null;
                attrs.push({
                    name: name, 
                    value: value.trim(), 
                    statements: statements
                });
            }
        }
        if (ctx.__jskind === 'react') {
            var save___inside_html = ctx.__inside_html;
            ctx.__inside_html = true;
            html_react.htmlelement(cnt, model, tag, text, ctx, attrs);
            ctx.__inside_html = save___inside_html;
        }
        else {
            var attrs_string = [];
            attrs.forEach(function(a) {
                if (['multiple'].indexOf(a.name) >= 0) {
                    attrs_string.push('\' + ( ' + a.value + ' ? \' ' + a.name + '\' : \'\' ) + \'');
                }
                else if (a.value !== '@@null') {
                    if (a.value.length == 0) {
                        attrs_string.push((' ' + a.name));
                    }
                    else {
                        attrs_string.push(' ' + a.name + '="\' + ' + a.value + ' + \'"');
                    }
                }
            });
            var isCode = ['script', 'style'].indexOf(tag) >= 0;
            var lf = isCode ? '\\n' : '';
            if (isCode) {
                ctx.__incode = true;
            }
            ctx.w("__html.push('" + lf + "<" + tag + attrs_string.join('') + ">" + lf + "');");
            if (text) {
                text = text.trim();
                var ip = lineParser.parseInterpolation(text, model, ctx.__inside_handlebar, ctx.__inside_ng)
                ;
                ctx.w("__html.push(" + ip.join() + ");");
            }
            cnt.genItems(model.statements, ctx, {
                indent: false
            });
            ctx.w("__html.push('</" + tag + ">" + lf + "');");
            if (isCode) {
                ctx.__incode = false;
            }
        }
    };
    function getAttrs(model,ctx) {
        var name,
            value,
            retval = [];
        for (var a in model) {
            value = null;
            if (html_supported_onEvents.indexOf(a) > -1) {
                if (model[a] == true) {
                    name = a;
                    value = '{this.' +  a + '}';
                }
            }
            else if (isAttrValue(a, model[a])) {
                name = verify.replaceAll(a, '_', '-');
                value = model[a];
            }
            else if (a.substr(0, 3) === 'ng-') {
                name = a;
                value = model[a];
            }
            else if (a.substr(0, 5) === 'data-') {
                name = a;
                value = model[a];
            }
            else if (a.substr(0, 5) === 'aria-') {
                name = a;
                value = model[a];
            }
            if (value) {
                if (ctx.__jskind === 'react') {
                    if (name == 'class') {
                        name = 'className';
                    }
                }
                else {
                    var ip = lineParser.parseInterpolation(value, model, ctx.__inside_handlebar, ctx.__inside_ng)
                    ;
                    value = ip.join();
                }
                retval.push({
                    name: name, 
                    value: value
                });
            }
        }
        return retval;
    }
    function isAttrValue(a,v) {
        if (noattrs.indexOf(a) > -1) {
            return false;
        }
        if (v == null || verify.isArray(v) || verify.isObject(v) || verify.isFunction(v)) {
            return false;
        }
        return true;
    }
    var noattrs = [
        'wzTag', 
        'wzName', 
        'wzElement', 
        'wzParent', 
        'wzSourceLineInfo', 
        '___exportName'
    ];
};

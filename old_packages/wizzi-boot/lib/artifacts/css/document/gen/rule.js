// generator: /wizzi-labs/wizzi-lab-site/ittf/lib/artifacts/js/module/gen/main.js, utc time: Thu, 23 Mar 2017 19:48:38 GMT
'use strict';
var util = require('util');
var wizzi = require('wizzi').wizzi;
var verify = wizzi.verify;
var lineParser = wizzi.lineParser;
var md = module.exports = {};
var myname = 'css.document.rule';
md.load = function(cnt) {
    cnt.stm.elementRule = function(model,ctx) {
        writeRule(cnt, model, ctx);
    };
    cnt.stm.classRule = function(model,ctx) {
        writeRule(cnt, model, ctx);
    };
    cnt.stm.idRule = function(model,ctx) {
        writeRule(cnt, model, ctx);
    };
    cnt.stm.media = function(model,ctx) {
        ctx.w('@media ' + model.WmtName + '{');
        cnt.genItems(model.rules, ctx, { indent:true });
        ctx.w('}');
    };
    cnt.stm.fontface = function(model,ctx) {
        ctx.w('@font-face {');
        cnt.genItems(model.rules, ctx, { indent:true });
        ctx.w('}');
    };
    cnt.stm.keyframes = function(model,ctx) {
        ctx.w('@' + (model.vendor || '') + 'keyframes ' + model.WmtName + ' {');
        cnt.genItems(model.rules, ctx, { indent:true });
        ctx.w('}');
    };
    cnt.stm.keyframe = function(model,ctx) {
        ctx.w(model.WmtName + ' {');
        cnt.genItems(model.rules, ctx, { indent:true });
        ctx.w('}');
    };
    cnt.stm.comment = function(model,ctx) {
        ctx.w('/* ' + model.wzName + ' */');
    };
};
function writeRule(cnt,model,ctx) {
    // log 'writeRule, model.ruleParts', model.ruleParts
    ctx.w(model.ruleParts.join(', ') + ' {');
    ctx.indent();
    var i, i_len=getProps(model).length, prop;
    for (i=0; i<i_len; i++) {
        prop = getProps(model)[i];
        writeProperty(prop.name, prop.value, ctx);
    }
    ctx.deindent();
    ctx.w('}');
    cnt.genItems(model.rules, ctx, { indent:false });
}

function getProps(rule) {
    var retval = [];
    for (var prop in rule) {
        if (isPropValue(prop, rule[prop])) {
            retval.push({ name: verify.replaceAll(prop, '_', '-'), value: rule[prop] });
        }
    }
    var i, i_len=rule.properties.length, prop;
    for (i=0; i<i_len; i++) {
        prop = rule.properties[i];
        // log 'prop', util.inspect(prop, { depth: 3 })
        if (prop.wzElement === 'property') {
            var p = lineParser.parseNameValueRaw(prop.wzName, prop);
            if (prop.properties.length > 0) {
                // Nested properties
                if (p.hasValue()) {
                    retval.push({ name: p.name(), value: p.value() });
                }
                var j, j_len=prop.properties.length, nestedprop;
                for (j=0; j<j_len; j++) {
                    nestedprop = prop.properties[j];
                    var p_nested = lineParser.parseNameValueRaw(nestedprop.wzName, nestedprop);
                    retval.push({ name: p.name() + '-' + p_nested.name(), value: p_nested.value() });
                }
            }
            else {
                if (p.hasValue()) {
                    retval.push({ name: p.name(), value: p.value() });
                }
            }
        }
        else {
            retval.push({ name: prop.wzTag, value: prop.wzName });
        }
    }
    return retval;
}

var noattrs = [
    'wzTag', 
    'wzName', 
    'wzElement', 
    'wzParent', 
    'wzSourceLineInfo', 
    '___exportName'
];
function isPropValue(a,v) {
    if (noattrs.indexOf(a) > -1) {
        return false;
    }
    if (v == null || verify.isArray(v) || verify.isObject(v) || verify.isFunction(v)) {
        return false;
    }
    return true;
}

function writeProperty(name,value,ctx) {
    if (name === "background-image" && value.indexOf("linear-gradient") >= 0) {
        ctx.w(name + ": " + value.replace("linear-gradient", "-webkit-linear-gradient") + ";");
        ctx.w(name + ": " + value.replace("linear-gradient", "-moz-linear-gradient") + ";");
        ctx.w(name + ": " + value.replace("linear-gradient", "-o-linear-gradient") + ";");
        ctx.w(name + ": " + value.replace("linear-gradient", "-ms-linear-gradient") + ";");
        ctx.w(name + ": " + value + ";");
    }
    else if (name === "border-radius") {
        ctx.w("-webkit-border-radius: " + value + ";");
        ctx.w("-khtml-border-radius: " + value + ";");
        ctx.w("-moz-border-radius: " + value + ";");
        ctx.w("-o-border-radius: " + value + ";");
        ctx.w(name + ": " + value + ";");
    }
    else if (name === "box-shadow") {
        ctx.w("-webkit-box-shadow: " + value + ";");
        ctx.w("-moz-box-shadow: " + value + ";");
        ctx.w("-o-box-shadow: " + value + ";");
        ctx.w(name + ": " + value + ";");
    }
    else if (name === "transition") {
        ctx.w("-webkit-transition: " + value + ";");
        ctx.w("-moz-transition: " + value + ";");
        ctx.w("-o-transition: " + value + ";");
        ctx.w(name + ": " + value + ";");
    }
    else if (name === "user-select") {
        ctx.w("-webkit-user-select: " + value + ";");
        ctx.w("-moz-user-select: " + value + ";");
        ctx.w("-ms-user-select: " + value + ";");
        ctx.w("-o-user-select: " + value + ";");
        ctx.w(name + ": " + value + ";");
    }
    else if (name === "opacity" && verify.isNumber(value)) {
        ctx.w(name + ": " + value/100 + ";");
        ctx.w("filter: alpha(opacity=" + value + ");");
    }
    else {
        ctx.w(name + ": " + value + ";");
    }
}


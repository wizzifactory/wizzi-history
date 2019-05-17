/*
    artifact generator: C:\My\wizzi\v4\node_modules\v4-wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v4\kernel\wizzi-mtree\src\ittf\lib\loader\ittfinterpolate.js.ittf
    utc time: Tue, 10 Oct 2017 15:44:11 GMT
*/
'use strict';
var jsWizziRunner = require('../jswizzi/jsWizziRunner');
/**
     rules:
     Macro expressions are enclosed by ${ and } delimiters.
     example: ${name}.
     A macro expression can be escaped and used as a literal,
     example: \$\{name}.
     A macro expression may contain paired graphs { },
     example: ${ for { var i=0; i<10; i++} ; return i; }.
     An empty macro ${} is treated as a literal, it is not replaced.
     An unclosed delimiter ${ is treated as a literal, it is not an error.
*/
var state_text = 0;
var state_tag = 1;
var state_key = 2;
function interpolate(template, jsWizziContext) {
    if (typeof template === 'undefined' || template === null) {
        return '';
    }
    var l = template.length,
        result = [],
        ch,
        key,
        inside_tags = 0,
        state = state_text,
        replacer = null,
        keyOrCode;
    for (var i=0; i<l; i++) {
        ch = template[i];
        if (ch == '\\') {
            console.log(template[i+1], template[i+2], template[i+3]);
        }
        if (state == state_text && ch == '\\' && i+3 < l && template[i+1] == '$' && template[i+2] == '\\' && template[i+3] == '{') {
            result.push('${');
            i = i +3;
            continue;
        }
        if (ch == '$') {
            if (state == state_text) {
                state = state_tag;
            }
            else if (state == state_key) {
                key.push(ch);
            }
            else {
                // state == state_tag
                // case double
                result.push('$$');
                state = state_text;
            }
        }
        else if (ch == '{') {
            if (state == state_text) {
                result.push(ch);
            }
            else if (state == state_key) {
                // case '{' inside $ { }
                inside_tags++;
                key.push(ch);
            }
            else {
                // state == state_tag
                // case ${
                state = state_key;
                key = [];
                inside_tags = 0;
            }
        }
        else if (ch == '}') {
            if (state == state_text) {
                result.push(ch);
            }
            else if (state == state_key) {
                if (inside_tags > 0) {
                    // case '{}' inside $ { }
                    inside_tags--;
                    key.push(ch);
                }
                else {
                    keyOrCode = key.join('');
                    if (keyOrCode.replace(/\s/g,'').length == 0) {
                        // case empty ${} - is ok do not replace
                        result.push('${}');
                    }
                    else {
                        var replacer = evalKeyOrCode(keyOrCode, jsWizziContext);
                        if (replacer && replacer.__is_error) {
                            return replacer;
                        }
                        result.push(replacer);
                    }
                    state = state_text;
                }
            }
            else {
                // state == state_tag
                // case strange sequence '$}' but ok
                result.push('$}');
                state = state_text;
            }
        }
        else {
            if (state == state_text) {
                result.push(ch);
            }
            else if (state == state_key) {
                key.push(ch);
            }
            else {
                // state == state_tag
                // case sequence '$*' is text
                result.push('$' + ch);
                state = state_text;
            }
        }
    }
    // check for unclosed macros
    if (state == state_key) {
        result.push('${' + key.join(''));
    }
    else if (state == state_tag) {
        result.push('$');
    }
    return result.join('');
}
function evalKeyOrCode(keyOrCode, jsWizziContext) {
    // log 'wizzi-mtree.loader.ittfInterpolate.evalKeyOrCode: ', keyOrCode
    var stm = keyOrCode.indexOf('return ') > -1 ? 'var _____result = function dummy() { ' + keyOrCode + ' }();' : 'var _____result = ' + keyOrCode + ';';
    var notUsed = jsWizziRunner.run(stm, jsWizziContext);
    if (notUsed && notUsed.__is_error) {
        return notUsed;
    }
    // console.log("jsWizziContext.getValue('_____result')", jsWizziContext.getValue('_____result'));
    return jsWizziContext.getValue('_____result');
}
module.exports = interpolate;

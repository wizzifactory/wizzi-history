/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: C:\My\wizzi\v2\sources\wizzi-2-boot\ittf\lib\ittf\ittfInterpolate.js.ittf
    utc time: Tue, 11 Jul 2017 17:02:26 GMT
*/
'use strict';
var wizziJsRunner = require('../esprima/wizziJsRunner');
var state_text = 0;
var state_tag = 1;
var state_key = 2;
function interpolate(template,jsWizziContext) {
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
                    keyOrCode = key.join('').replace(/\s/g,'');
                    if (keyOrCode.length == 0) {
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
    if (state == state_key) {
        result.push('${' + key.join(''));
    }
    else if (state == state_tag) {
        result.push('$');
    }
    return result.join('');
}

function evalKeyOrCode(keyOrCode,jsWizziContext) {
    // log 'ittfInterpolate.evalKeyOrCode: ', keyOrCode
    var notUsed = wizziJsRunner.run('var _____result = ' + keyOrCode, jsWizziContext);
    if (notUsed && notUsed.__is_error) {
        return notUsed;
    }
    return jsWizziContext.getValue('_____result');
}

module.exports = interpolate;

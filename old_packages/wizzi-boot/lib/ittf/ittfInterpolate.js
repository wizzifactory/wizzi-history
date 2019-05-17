// generator: /wizzi-labs/wizzi-lab-site/ittf/lib/artifacts/js/module/gen/main.js, utc time: Thu, 23 Mar 2017 19:48:43 GMT
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
                        replacer = evalKeyOrCode(keyOrCode, jsWizziContext);
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
    wizziJsRunner.run('var _____result = ' + keyOrCode, jsWizziContext);
    return jsWizziContext.getValue('_____result');
}

module.exports = interpolate;

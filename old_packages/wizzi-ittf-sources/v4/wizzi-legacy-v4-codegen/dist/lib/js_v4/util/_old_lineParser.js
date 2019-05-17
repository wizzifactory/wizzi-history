/*
    artifact generator: C:\My\wizzi\v4\node_modules\v4-wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v4\plugins\wizzi-codegen\src\ittf\lib\js_v4\util\lineparser.js.ittf
    utc time: Wed, 11 Oct 2017 11:02:31 GMT
*/
'use strict';

var verify = require('./verify');

var md = module.exports = {};
md.parse = function(text, node) {
    if (!verify.isString(text)) {
        return {
                tokens: [], 
                join: function() {
                    return '';
                }
            };
    }
    var ch,
        l = text.length,
        tokens = [],
        token = {
            quote: null, 
            text: '', 
            raw: ''
        };
    for (var i = 0; i < l; i++) {
        ch = text[i];
        if (token.quote != null) {
            if (ch == token.quote) {
                tokens.push(token);
                token = {
                    quote: null, 
                    text: '', 
                    raw: ''
                };
            }
            else {
                token.text += ch;
                token.raw += ch;
            }
        }
        else if (ch == '"' || ch == '\'') {
            if (token.text.length > 0) {
                errors.NodeError("Invalid use of quote inside text", node);
            }
            token.quote = ch;
        }
        else if (['(', ')', '[', ']', '{', '}'].indexOf(ch) > - (1)) {
            if (token.text.length > 0) {
                tokens.push(token);
            }
            tokens.push({
                quote: null, 
                text: ch, 
                raw: ch
            });
            token = {
                quote: null, 
                text: '', 
                raw: ''
            };
        }
        else if (ch == ' ' || ch == '\t') {
            if (token.text.length > 0) {
                token.raw += ch;
                tokens.push(token);
                token = {
                    quote: null, 
                    text: '', 
                    raw: ''
                };
            }
        }
        else {
            token.text += ch;
            token.raw += ch;
        }
    }
    if (token.text.length > 0) {
        tokens.push(token);
        token = {
            quote: null, 
            text: '', 
            raw: ''
        };
    }
    return {
            tokens: tokens, 
            length: tokens.length, 
            join: function(sep, start) {
                var t = [],
                    startIndex = (start || 0);
                for (var i = startIndex; i < this.tokens.length; i++) {
                    if (sep === 'forValue') {
                        var s = this.tokens[i].text;
                        if (['(', ')', '[', ']', '{', '}'].indexOf(s) > - (1)) {
                            t.push(this.tokens[i].text);
                        }
                        else {
                            t.push((this.tokens[i].text + ' '));
                        }
                    }
                    else {
                        t.push(this.tokens[i].text);
                    }
                }
                if (sep === 'forValue') {
                    return t.join('').trim()
                    ;
                }
                else {
                    return t.join(sep).trim()
                    ;
                }
            }, 
            getByPos: function(pos) {
                return pos > this.length ? null : this.tokens[(pos - 1)];
                ;
            }, 
            matchByPos: function(pos, test) {
                return pos > this.length ? false : this.tokens[(pos - 1)].text === test;
            }, 
            name: function() {
                return this.length > 0 ? this.tokens[0].text : null;
            }, 
            value: function() {
                return this.join('forValue', 1);
            }, 
            nameValue: function() {
                var ret = {
                    name: '', 
                    value: ''
                };
                if (this.tokens.length >= 2) {
                    tk = this.tokens[0];
                    ret.name = tk.text;
                    for (var i = 1; i < this.tokens.length; i++) {
                        tk = this.tokens[i];
                        ret.value += (tk.quote || '');
                        ret.value += tk.raw;
                        ret.value += (tk.quote || '');
                    }
                }
                return ret;
            }
        };
};
md.parseInterpolation = function(text, node, handlebar, ng) {
    if (!verify.isString(text)) {
        return {
                tokens: [], 
                join: function() {
                    return '';
                }
            };
    }
    var openMacro = ng ? '[' : '{';
    var closeMacro = ng ? ']' : '}';
    var ch,
        l = text.length,
        state = 0,
        tokens = [],
        token = {
            kind: 0, 
            text: ''
        };
    for (var i = 0; i < l; i++) {
        ch = text[i];
        if (ch == openMacro) {
            if (state === 0) {
                state = 1;
            }
            else if (state === 1) {
                if (token.text.length > 0) {
                    tokens.push(token);
                }
                token = {
                    kind: 1, 
                    text: ''
                };
                state = 2;
            }
            else if (state === 2) {
                token.text += ch;
            }
            else if (state === 11) {
                token.text += closeMacro;
                state = 2;
            }
        }
        else if (ch == closeMacro) {
            if (state === 0) {
                token.text += ch;
            }
            else if (state === 1) {
                token.text += openMacro;
                state = 0;
            }
            else if (state === 2) {
                state = 11;
            }
            else if (state === 11) {
                if (token.text.length > 0) {
                    tokens.push(token);
                }
                token = {
                    kind: 0, 
                    text: ''
                };
                state = 0;
            }
        }
        else {
            if (state === 1) {
                token.text += openMacro;
                state = 0;
            }
            else if (state === 11) {
                token.text += closeMacro;
                state = 2;
            }
            token.text += ch;
        }
    }
    if (state === 1) {
        token.text += openMacro;
        state = 0;
    }
    else if (state === 11) {
        token.text += closeMacro;
        state = 2;
    }
    if (token.text.length > 0) {
        tokens.push(token);
    }
    return {
            tokens: tokens, 
            length: tokens.length, 
            join: function() {
                var token,
                    t = [];
                for (var i = 0; i < this.tokens.length; i++) {
                    token = this.tokens[i];
                    if (t.length > 0) {
                        t.push(' + ');
                    }
                    if (token.kind === 0) {
                        t.push('"' + escapename(token.text) + '"');
                    }
                    else {
                        if (handlebar) {
                            t.push('"{{ ' + escapename(token.text) + '}}"');
                        }
                        else {
                            t.push(token.text);
                        }
                    }
                }
                return t.join('');
            }
        };
};
/**
     name = first not (blank or tab) char sequence
     value = all remaining chars after name + (blank or tab)
     ignore quotes unless the value part is enclosed with double quotes : "
     example (with no quotes)
     trip 'to the london bridge'
     name() = trip
     value() = 'to the london bridge'
     example (quotes ignored 1)
     trip 'to the ' + city + ' bridge'
     name() = trip
     value() = 'to the ' + city + ' bridge'
     example (quotes escaped)
     trip "to the " + city + " bridge"
     name() = trip
     value() = "to the \" + city + \" bridge"
*/
md.parseNameValueRaw = function(text, node) {
    var name = '',
        value = [],
        quotes = [];
    if (verify.isNotEmpty(text)) {
        var ch,
            state = 0,
            l = text.length;
        for (var i = 0; i < l; i++) {
            ch = text[i];
            if (state == 2 && (ch == '"' || ch == "'") && text[i-1] !== '\\') {
                quotes.push({ q: ch, p: value.length });
            }
            if (ch == ' ' || ch == '\t') {
                if (state == 0) {
                    ;
                }
                else if (state == 1) {
                    state = 2;
                }
                else if (state == 2) {
                    value.push(ch);
                }
            }
            else {
                if (state == 0) {
                    name = ch;
                    state = 1;
                }
                else if (state == 1) {
                    name += ch;
                }
                else if (state == 2) {
                    value.push(ch);
                }
            }
        }
    }
    return {
            name: function() {
                return name;
            }, 
            value: function() {
                if (quotes.length > 0) {
                    // log '*=*=*= temporary wizzi-codegen.lineparser. quotes, value: ', quotes, value.join('')
                    // log quotes[0].q, quotes[quotes.length -1].q
                }
                if (quotes.length > 2 && quotes[0].q === quotes[quotes.length -1].q && quotes[0].q === '"') {
                    var q = quotes[0].q;
                    for (var i = 1; i < quotes.length -1; i ++) {
                        if (quotes[i].q === q) {
                            value[quotes[i].p] = '\\' + q;
                        }
                    }
                    // log '*=*=*= temporary wizzi-codegen.lineparser. value: ', value.join('')
                }
                return value.join('');
            }, 
            hasValue: function() {
                return value.length > 0;
            }
        };
};
function escapename(value) {
    if (verify.isNotEmpty(value)) {
        return verify.replaceAll(verify.replaceAll(value, "\\", "\\\\"), '"', '\\"')
        ;
    }
    else {
        return value;
    }
}

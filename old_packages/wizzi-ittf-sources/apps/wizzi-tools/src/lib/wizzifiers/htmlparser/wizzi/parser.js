var util = require('util');

var verbose = false;

function log(label, obj) {
    if (verbose) console.log(label, util.inspect(obj, { depth: 1 }));
}

var md = module.exports = {};
var priv = {};

var START = 0;
var WAIT_TAG_NAME = 1;
var TAG_NAME = 2;
var ENDTAG_NAME = 3;
var WAIT_ATTR_NAME = 4;
var ATTR_NAME = 5;
var WAIT_ATTR_EQU = 6;
var WAIT_ATTR_VALUE = 7;
var ATTR_VALUE = 8;
var TEXT = 9;
var WAIT_EMPTY_ELEMENT_TAG_RIGHT_CLOSE = 10;
var DOCTYPE = 11;
var START_COMMENT_1 = 21; // <!
var START_COMMENT_2 = 22; // <!-
var COMMENT = 24; // from <!--
var END_COMMENT_1 = 25; // -
var END_COMMENT_2 = 26; // --
var COULD_BE_ENDOFTEXT = 31; // --
var START_SWIG_1 = 41; // {
var SWIG = 42; // from {%
var END_SWIG_1 = 43; // %


md.Parser = function (handlers) {
    this.handlers = handlers;
}

md.Parser.prototype.write = function (input) {
    var state = {
        cur: START,
        prev: null,
        stack: [],
        line: 1,
        col: 0,
        tagcount: 0,
        chprev: null
    };
    priv.resetStateOpenTag(state);
    for (var k in this.handlers) {
        state[k] = this.handlers[k];
    }
    var ch, l = input.length;
    for (var i = 0; i < l; i++) {
        ch = input[i];
        if (state.cur === COULD_BE_ENDOFTEXT) {
            if (ch === '/') { // ok is end of text
                priv.ontext(state);
                priv.resetStateOpenTag(state);
                state.cur = WAIT_TAG_NAME;
            } else { // no text continue or is opentag
                if (isOpenTag(input, l, i)) { // is opentag
                    priv.ontext(state);
                    priv.resetStateOpenTag(state);
                    state.cur = WAIT_TAG_NAME;
                } else if (isOpenComment(input, l, i)) { // is open comment
                    state.cur = WAIT_TAG_NAME; // will be intercepted by doExclamation
                } else {
                    state.cur = TEXT; // text continue
                    state.text += '<'; // add the suspended <
                }
            }
        } else if (state.cur === START_SWIG_1 && ch !== '%') {
            if (state.prev === null) {
                priv.error("Missing prev state on START_SWIG_1" + state.cur, state);
            }
            state.cur = state.prev;
            priv.append('{', state);
        }
        priv.loop(ch, state);
        state.chprev = ch;
    }
}

md.Parser.prototype.end = function () {
}

priv.resetStateOpenTag = function (state) {
    state.quote = null;
    state.tagname = null;
    state.attrname = null;
    state.attrvalue = null;
    state.text = null;
    state.attribs = {};
}

priv.loop = function (ch, state) {
    state.col++;
    // console.log('ch ' + ch + ' state.cur ' + state.cur + ' line ' + state.line + ' col ' + state.col);
    if (priv.specialCases(ch, state)) return;
    if (ch === '<') {
        priv.doLT(state);
    } else if (ch === '>') {
        priv.doGT(state);
    } else if (ch === '/') {
        priv.doSlash(state);
    } else if (ch === '=') {
        priv.doEq(state);
    } else if (ch === '!') {
        priv.doExclamation(state);
    } else if (ch === '-') {
        priv.doMinus(state);
    } else if (ch === '{') {
        priv.doOpenGraph(state);
    } else if (ch === '}') {
        priv.doCloseGraph(state);
    } else if (ch === '%') {
        priv.doPercent(state);
    } else if (ch === '\r' || ch === '\n') {
        if (ch === '\n' && state.chprev === '\r') return;
        if (ch === '\r' && state.chprev === '\n') return; // ???
        state.line++;
        state.col = 0;
        priv.doLF(state);
    } else if (isWhite(ch)) {
        priv.doWhite(ch, state);
    } else if (isQuote(ch)) {
        priv.doQuote(ch, state);
    } else {
        priv.append(ch, state);
    }
}

priv.specialCases = function (ch, state) {
    if (state.cur === COMMENT && ch !== '-') {
        state.comment = (state.comment || '') + ch;
        return true;
    }
    if (state.cur === TEXT && state.quote != null) {
        state.text = (state.text || '') + ch;
        if (ch === state.quote) {
            state.quote = null;
        }
        return true;
    }
    if (state.cur === TEXT && isQuote(ch) &&
        (state.currenttagname === 'script' || state.currenttagname === 'style')) {
        state.text = (state.text || '') + ch;
        state.quote = ch;
        return true;
    }
    if (state.cur === ATTR_VALUE && ch !== state.quote) {
        state.attrvalue = (state.attrvalue || '') + ch;
        return true;
    }
    if (state.cur === START_COMMENT_1 && ch !== '-') {
        if (state.tagcount == 0) {
            state.cur = DOCTYPE;
        } else {
            state.text = (state.text || '') + "<!";
            state.cur = TEXT;
        }
    } else if (state.cur === START_COMMENT_2 && ch !== '-') {
        state.text = (state.text || '') + "<!-";
        state.cur = TEXT;
    } else if (state.cur === END_COMMENT_1 && ch !== '-') {
        state.comment = (state.comment || '') + "-";
        state.cur = COMMENT;
    } else if (state.cur === END_COMMENT_2 && ch !== '>') {
        state.comment = (state.comment || '') + "--";
        state.cur = COMMENT;
    }
    return false;
}

priv.doLT = function (state) {
    if (state.cur === START) {
        ;
    } else if (state.cur === TEXT) {
        state.cur = COULD_BE_ENDOFTEXT;
        return;
        //priv.ontext(state);
        //priv.resetStateOpenTag(state);
    } else {
        priv.error("doLT invalid state.cur " + state.cur, state);
    }
    state.cur = WAIT_TAG_NAME;
}

priv.doGT = function (state) {
    if (state.cur === TAG_NAME) {
        priv.onopentag(state);
    } else if (state.cur === WAIT_ATTR_NAME || state.cur === WAIT_EMPTY_ELEMENT_TAG_RIGHT_CLOSE) {
        priv.onopentag(state);
    } else if (state.cur === ATTR_NAME) {
        state.attribs[state.attrname] = null;
        priv.onopentag(state); // ends with attribute without value
    } else if (state.cur === ATTR_VALUE) {
        priv.onopentag(state); // forgive attr value not closed
    } else if (state.cur === ENDTAG_NAME) {
        priv.onclosetag(state);
    } else if (state.cur === END_COMMENT_2) {
        priv.oncomment(state);
        state.comment = null;
    } else if (state.cur === DOCTYPE) {
        priv.ondoctype(state);
        state.doctype = null;
    } else {
        priv.error("doGT invalid state.cur " + state.cur, state);
    }
    state.cur = TEXT;
}

priv.doSlash = function (state) {
    if (state.cur === WAIT_TAG_NAME) {
        state.cur = ENDTAG_NAME;
    } else if (state.cur === TAG_NAME) {
        console.log('11111111');
        state.cur = WAIT_EMPTY_ELEMENT_TAG_RIGHT_CLOSE;
    } else if (state.cur === WAIT_ATTR_NAME) {
        state.cur = WAIT_EMPTY_ELEMENT_TAG_RIGHT_CLOSE;
    } else
        priv.append('/', state);
}

priv.doExclamation = function (state) {
    if (state.cur === WAIT_TAG_NAME) {
        state.cur = START_COMMENT_1;
    } else
        priv.append('!', state);
}

priv.doMinus = function (state) {
    if (state.cur === COMMENT) {
        state.cur = END_COMMENT_1;
    } else if (state.cur === END_COMMENT_1) {
        state.cur = END_COMMENT_2;
    } else if (state.cur === START_COMMENT_1) {
        state.cur = START_COMMENT_2;
    } else if (state.cur === START_COMMENT_2) {
        state.cur = COMMENT;
    } else
        priv.append('-', state);
}

priv.doOpenGraph = function (state) {   
    if (state.cur === START ||
        state.cur === TEXT ||
        state.cur === WAIT_ATTR_NAME) {
        state.prev = state.cur;
        state.preSwig = state.cur;
        state.cur = START_SWIG_1;
    } else {
        priv.append('{', state);
    }
}

priv.doCloseGraph = function (state) {
    if (state.cur === END_SWIG_1) {
        // TODO emit swig command
        priv.onswig(state);
        state.cur = state.preSwig;
        state.preSwig = null;
    } else {
        priv.append('}', state);
    }
}

priv.doPercent = function (state) {
    if (state.cur === START_SWIG_1) {
        priv.ontext(state);
        state.cur = SWIG;
    } else if (state.cur === SWIG) {
        state.cur = END_SWIG_1;
    } else {
        priv.append('%', state);
    }
}

priv.doEq = function (state) {
    if (state.cur === ATTR_NAME || state.cur === WAIT_ATTR_EQU) {
        state.cur = WAIT_ATTR_VALUE;
    } else
        priv.append('=', state);
}

priv.doWhite = function (ch, state) {
    if (state.cur === START) {
        ;
    } else if (state.cur === TAG_NAME) {
        state.cur = WAIT_ATTR_NAME;
    } else if (state.cur === ENDTAG_NAME) {
            ; // forgive
    } else if (state.cur === ATTR_NAME) {
        state.cur = WAIT_ATTR_EQU;
    } else if (state.cur === WAIT_ATTR_EQU) {
        ; // can be before =, anyway forgive
    } else
        priv.append(ch, state);
}

priv.doLF = function (state) {
    // TODO
    if (state.cur === START) {
        ;
    } else {
        priv.append('\n', state);
    }
}

priv.doQuote = function (ch, state) {
    if (state.cur === WAIT_ATTR_VALUE) {
        state.cur = ATTR_VALUE;
        state.quote = ch;
    } else if (state.cur === ATTR_VALUE && state.quote === ch) {
        state.attribs[state.attrname] = state.attrvalue;
        state.attrname = state.attrvalue = null;
        state.cur = WAIT_ATTR_NAME;
        state.quote = null;
    } else
        priv.append(ch, state);
}

priv.append = function (ch, state) {
    if (state.cur === WAIT_TAG_NAME) {
        state.tagname = ch;
        state.cur = TAG_NAME;
    } else if (state.cur === TAG_NAME || state.cur === ENDTAG_NAME) {
        state.tagname = (state.tagname || '') + ch;
    } else if (state.cur === WAIT_ATTR_NAME) {
        if (!isWhite(ch)) { // whitespaces beetween attributes
            state.attrname = ch;
            state.cur = ATTR_NAME;
        }
    } else if (state.cur === ATTR_NAME) {
        state.attrname = (state.attrname || '') + ch;
    } else if (state.cur === WAIT_ATTR_EQU) {
        // attrib has no value
        state.attribs[state.attrname] = null;
        // this is the start of a new attribute name
        state.cur = ATTR_NAME;
        state.attrname = ch;
    } else if (state.cur === ATTR_VALUE) {
        state.attrvalue = (state.attrvalue || '') + ch;
    } else if (state.cur === TEXT) {
        state.text = (state.text || '') + ch;
        // log('state.text', state.text);
    } else if (state.cur === COMMENT) {
        state.comment = (state.comment || '') + ch;
    } else if (state.cur === DOCTYPE) {
        state.doctype = (state.doctype || '') + ch;
    } else if (state.cur === SWIG) {
        state.swig = (state.swig || '') + ch;
    } else {
        priv.error("append invalid state.cur " + state.cur, state);
    }
}

priv.onopentag = function (state) {
    //if (state.stack.length > 0) {
    //    var last = state.stack.pop();
    //    if (last in voidElements)
    //    {
    //        log('onopentag.last.isvoid', last);
    //        if (state.onclosetag) {
    //            state.onclosetag(last);
    //        }
    //    }
    //    else
    //        log('onopentag.last.isnotvoid', last);
    //}
    state.tagcount++;
    state.stack.push(state.tagname);
    state.currenttagname = state.tagname;
    if (state.onopentag) {
        state.onopentag(state.tagname, state.attribs);
    }
    if (state.tagname in voidElements)
    {
        // log('opentag.isvoid', state.tagname);
        if (state.onclosetag) {
            state.onclosetag(state.tagname);
        }
    }
}

priv.onclosetag = function (state) {
    if (state.onclosetag) {
        state.onclosetag(state.tagname);
    }
}

priv.oncomment = function (state) {
    if (state.oncomment) {
        state.oncomment(state.comment);
    }
}

priv.ondoctype = function (state) {
    if (state.ondoctype) {
        state.ondoctype(state.doctype);
    }
}

priv.ontext = function (state) {
    if (typeof state.text == 'undefined' || state.text == null) return;
    if (state.text.length == 0) return;
    if (!isText(state.text)) return;
    if (state.ontext) {
        state.ontext(state.text);
    }
    state.text = '';
}

priv.onswig = function (state) {
    if (state.onswig) {
        state.onswig(state.swig);
    }
    state.swig = '';
}

priv.error = function (message, state) {
    log('state', state);
    throw new Error(message + ' at line ' + state.line + ' col ' + state.col);
}

function isText(text) {
    var ch, l = text.length;
    for (var i = 0; i < l; i++) {
        ch = text[i];
        if (ch !== ' ' && ch !== '\t' && ch !== '\n' && ch !== '\r') {
            return true;
        }
    }
    return false;
}

var tagNameRegExp = /^[A-Za-z]+[\w]*$/;

function isOpenTag(input, len, start) {
    var i = start;
    var ch = input[i];
    var tag = '';
    while (i < len && ch !== '>' && isWhite(ch) == false) {
        tag += ch;
        ch = input[++i];
    }
    if (tag.substr(-1, 1) == '/') {
        var ttag = tag.substr(0, tag.length - 1);
        var istag = tagNameRegExp.test(ttag);
        // console.log('isOpenTag (/)', tag, istag);
        return istag;
    }
    var istag = tagNameRegExp.test(tag);
    // console.log('isOpenTag', tag, istag);
    return istag;
}

function isOpenComment(input, len, start) {
    return len - start > 3 && input.substr(start, 3) === '!--';
}

function isTagChar(ch) {
    return ch === ' ' || ch === '\t';
}

function isWhite(ch) {
    return ch === ' ' || ch === '\t';
}

function isQuote(ch) {
    return ch === '"' || ch === '\'';
}

function log(label, data) {
    console.log(label, util.inspect(data, { depth: null }));
}

var voidElements = {
    __proto__: null,
    area: true,
    base: true,
    basefont: true,
    br: true,
    col: true,
    command: true,
    embed: true,
    frame: true,
    hr: true,
    img: true,
    input: true,
    isindex: true,
    keygen: true,
    link: true,
    meta: true,
    param: true,
    source: true,
    track: true,
    wbr: true,

    //common self closing svg elements
    path: true,
    circle: true,
    ellipse: true,
    line: true,
    rect: true,
    use: true,
    stop: true,
    polyline: true,
    polygone: true
};

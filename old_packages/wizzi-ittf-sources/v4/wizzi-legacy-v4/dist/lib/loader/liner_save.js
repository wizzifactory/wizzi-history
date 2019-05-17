/*
    artifact generator: C:\My\wizzi\v4\node_modules\v4-wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v4\kernel\wizzi-mtree\src\ittf\lib\loader\liner_save.js.ittf
    utc time: Tue, 10 Oct 2017 15:44:11 GMT
*/
'use strict';
var util = require('util');
/**
     Reads an IttfDocument and extract an array of line descriptions
*/
/**
     Input
     param textContent:String - The text content of the IttfDocument
     param ittfDocumentData:Object {
     sourceKey:String - The IttfDocument key generated by the loadContext
     }
*/
/**
     Output
     lines:Array of
     line : {
     indent: Number,
     name: String,
     value: String, // always trimmed
     row: Number,
     col: Number,
     sourceKey: String,
     tagSuffix: undefined || '(',
     hasMacro: Boolean
     }
*/
/**
     Ittf commands for comments
     $ and $ ... singleline comment
     $ and * ... * and $ multiline comment
     Comment states
     0 = no comment seen
     1 = seen char $ could be first char of comment
     2 = seen chars $ and * we are inside multiline comments
     3 = seen chars $ and * ... and *  could be first char of end of multiline comments
     21 = seen chars $ and $ we are inside singleline comment
     Es6 macro states
     0 = no macro seen
     1 = seen char ` we are inside template
     2 = seen escape char inside a template, the next ` char does not close the macro string
     10 = seen char $ inside a template could be start of macro
*/
var COMMENT = {
    NONE: 0, 
    NONE_SEEN_DOLLAR: 1, 
    MULTI_LINE: 2, 
    MULTI_LINE_SEEN_ASTER: 3, 
    SINGLE_LINE: 21
};
var MACRO = {
    NONE: 0, 
    INSIDE_TEMPLATE: 1, 
    INSIDE_TEMPLATE_SEEN_ESCAPE: 2, 
    INSIDE_TEMPLATE_SEEN_DOLLAR: 10
};
var CP = {
    DOLLAR: 36, 
    ASTER: 42, 
    SLASH: 92, 
    SINGLE_QUOTE: 39, 
    DOUBLE_QUOTE: 34, 
    TAB: 9, 
    LF: 10, 
    CR: 13, 
    SPACE: 32
};
module.exports = function(textContent, ittfDocumentData) {
    var sourceKey = ittfDocumentData.sourceKey,
        lines = [],
        leadingWhiteSpaces = 0,
        line = null,
        linepos = 1,
        lineHasMacro = false,
        colpos = 0,
        commentState = COMMENT.NONE,
        macroState = MACRO.NONE,
        quote = null,
        // TODO ensure textContent is red as utf-8 and avoid this
        chunk = textContent.toString('utf-8'),
        ch,
        chUni,
        i,
        l = chunk.length;
    // TODO replace ch with chUni
    for (i = 0; i < l; i++) {
        ch = chunk[i];
        chUni = chunk.charCodeAt(i);
        var cp = (chunk.charAt(index) + chunk.charAt(index + 1)).codePointAt(0);
        if (cp > 0xffff) {
            console.log('wizzi-mtree.loader.liner.cp > 0xffff');
            index += 1;
        }
        colpos++;
        if (ch == '\\') {
            // log '+++++ wizzi-mtree.liner', chunk[i+1], chunk[i+2], chunk[i+3]
        }
        if (quote != null) {
            if (quote == ch) {
                quote = null;
            }
            processMacro(ch);
        }
        else {
            if (commentState == COMMENT.MULTI_LINE) {
                if (ch == '*') {
                    // could be start of end of comment
                    commentState = COMMENT.MULTI_LINE_SEEN_ASTER;
                }
                else {
                    // skip comment char
                    if (ch == '\n') {
                        linepos++;
                        colpos = 0;
                    }
                }
            }
            else if (commentState == COMMENT.SINGLE_LINE) {
                if (ch == '\n') {
                    // end of line comment
                    // delegate end of comment to processMacro
                    processMacro(ch);
                }
            }
            else if (commentState == COMMENT.MULTI_LINE_SEEN_ASTER) {
                if (ch == '$') {
                    // ok, really is end of comment
                    commentState = COMMENT.NONE;
                }
                else {
                    // no, multi line comments continue
                    commentState = COMMENT.MULTI_LINE;
                    // check if it is eol
                    if (ch == '\n') {
                        linepos++;
                        colpos = 0;
                    }
                }
            }
            else if (commentState == COMMENT.NONE_SEEN_DOLLAR && ch == '*') {
                // ok, really is start of multi line comment
                commentState = COMMENT.MULTI_LINE;
            }
            else if (commentState == COMMENT.NONE_SEEN_DOLLAR && ch == '$') {
                // ok, is a single line comment
                commentState = COMMENT.SINGLE_LINE;
            }
            else if (commentState == COMMENT.NONE_SEEN_DOLLAR && ch != '*') {
                // no, it was not a comment, reset
                commentState = COMMENT.NONE;
                processMacro('$');
                processMacro(ch);
            }
            else if (commentState == COMMENT.NONE && ( ch == '"' || ch == "'" )) {
                // start of literal
                quote = ch;
                processMacro(ch);
            }
            else if (commentState == COMMENT.NONE && ch == '$') {
                // could be start of comment
                commentState = COMMENT.NONE_SEEN_DOLLAR;
            }
            else if (ch == '\\' && i+3 < l && chunk[i+1] == '$' && chunk[i+2] == '\\' && chunk[i+3] == '{') {
                processChar('$');
                processChar('{');
                i = i +3;
            }
            else {
                processMacro(ch);
            }
        }
    }
    if (line) {
        if (typeof (line.value) !== 'undefined') {
            line.value = line.value.trim();
        }
        line.hasMacro = lineHasMacro;
        // log 'last push line', line
        lines.push(line);
        lineHasMacro = false;
    }
    return lines;
    function processMacro(ch) {
        if (macroState == MACRO.INSIDE_TEMPLATE_SEEN_ESCAPE) {
            // remove escape state
            macroState = MACRO.INSIDE_TEMPLATE;
            processChar(ch);
            // log 'macroState', macroState, ch
        }
        else if (macroState == MACRO.INSIDE_TEMPLATE_SEEN_DOLLAR) {
            if (ch == '{') {
                // ok - really it was a start of macro
                // Alt+146 = Æ
                processChar('Æ');
                processChar('{');
                lineHasMacro = true;
            }
            else {
                // no - it was not a start of macro
                processChar('$');
                processChar(ch);
            }
            macroState = MACRO.INSIDE_TEMPLATE;
            // log 'macroState', macroState, ch
        }
        else {
            if (chUni == 96) {
                if (macroState > MACRO.NONE) {
                    macroState = MACRO.NONE;
                    processChar(ch);
                    // log 'macroState', macroState, ch
                }
                else {
                    macroState = MACRO.INSIDE_TEMPLATE;
                    processChar(ch);
                    // log 'macroState', macroState, ch
                }
            }
            else {
                if (macroState == MACRO.INSIDE_TEMPLATE) {
                    if (ch == '$') {
                        // could be start of macro
                        macroState = MACRO.INSIDE_TEMPLATE_SEEN_DOLLAR;
                        // log 'macroState', macroState, ch
                    }
                    else if (ch == '\\') {
                        // could be an escape of a template start inside a template
                        macroState = MACRO.INSIDE_TEMPLATE_SEEN_ESCAPE;
                        processChar(ch);
                        // log 'macroState', macroState, ch
                    }
                    else {
                        // log 'process char macroState', macroState, ch
                        processChar(ch);
                    }
                }
                else {
                    processChar(ch);
                }
            }
        }
    }
    function processChar(ch) {
        if (ch == '\n') {
            if (line) {
                if (typeof (line.value) !== 'undefined') {
                    line.value = line.value.trim();
                }
                line.hasMacro = lineHasMacro;
                lines.push(line);
                line = null;
                lineHasMacro = false;
            }
            else {
                // Allow blank line. Do nothing
            }
            leadingWhiteSpaces = 0;
            colpos = 0;
            linepos++;
            macroState = MACRO.NONE;
            if (commentState != COMMENT.MULTI_LINE) {
                commentState = COMMENT.NONE;
            }
        }
        else if (ch == '\r') {
        }
        else if ([' ', '\t'].indexOf(ch) !== -1) {
            if (ch == '\t') {
                colpos += 3;
            }
            if (line) {
                if (typeof (line.value) == 'undefined') {
                    line.value = '';
                }
                else {
                    line.value += ch;
                }
            }
            else {
                leadingWhiteSpaces += ch == ' ' ? 1 : 4;
            }
        }
        else if (['('].indexOf(ch) !== -1) {
            if (line) {
                if (typeof (line.value) == 'undefined') {
                    line.tagSuffix = ch;
                    line.value = '';
                }
                else {
                    line.value += ch;
                }
            }
            else {
                line = {
                    indent: leadingWhiteSpaces / 4, 
                    name: ch, 
                    row: linepos, 
                    col: colpos, 
                    sourceKey: sourceKey
                };
            }
        }
        else {
            if (line) {
                if (typeof(line.value) == 'undefined') {
                    line.name += ch;
                }
                else {
                    line.value += ch;
                }
            }
            else {
                line = {
                    indent: leadingWhiteSpaces / 4, 
                    name: ch, 
                    row: linepos, 
                    col: colpos, 
                    sourceKey: sourceKey
                };
            }
        }
        if (line) {
            // log 'line.name, value', line.name, line.value
        }
    }
};
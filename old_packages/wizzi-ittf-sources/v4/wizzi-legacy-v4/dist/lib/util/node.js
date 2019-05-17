/*
    artifact generator: C:\My\wizzi\v4\node_modules\v4-wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v4\kernel\wizzi-mtree\src\ittf\lib\util\node.js.ittf
    utc time: Tue, 10 Oct 2017 15:44:11 GMT
*/
'use strict';
var util = require('util');
var verify = require('./verify');
var md = module.exports = {};
/**
     Node object {
     name:String
     value:String
     parent:Object of type Node
     children:Array  of items of type Node
     }
*/
/**
     IttfCommands are nodes which name
     starts with the char "$"
     The search go down to descendants
*/
md.findIttfCommand = function(item, cmdname, type, startItem) {
    if (startItem && item.id === startItem.id) {
        // \b || (startItem && item.parent && item.parent.id === startItem.parent.id)
        // searching the hook for an append command
        // when descending from a parent we encounter startItem
        // or a sibling we skip it and its descendants
        return null;
    }
    if (item.name === ('$' + type)) {
        if (item.value && item.value.trim() === cmdname) {
            return item;
        }
        if (!item.value && cmdname === 'default') {
            return item;
        }
    }
    var found,
        i,
        l = item.children.length;
    for (i = 0; i < l; i++) {
        found = md.findIttfCommand(item.children[i], cmdname, type, startItem);
        if (found) {
            return found;
        }
    }
    return null;
};
/**
     find a $hook command
     The search go up to ancestors
*/
md.findHookExt = function(item, hookname, startItem) {
    if (typeof startItem === 'undefined') {
        startItem = item;
    }
    var prn = item.parent;
    if (!prn) {
        return null;
    }
    var hook = md.findIttfCommand(prn, hookname, 'hook', startItem);
    if (hook) {
        return hook;
    }
    return md.findHookExt(prn, hookname, startItem);
};
/**
     find a $virtual command
     The search go up to ancestors
*/
md.findVirtual = function(item, virtname) {
    var prn = item.parent;
    if (!prn) {
        return null;
    }
    var virt = md.findIttfCommand(prn, virtname, 'virtual');
    if (virt) {
        return virt;
    }
    return md.findVirtual(prn, virtname);
};
md.replace = function(item, replacers) {
    if (!item.parent) {
        // log 'util/node/replace/item', item
        var i, i_len=replacers.length, repl;
        for (i=0; i<i_len; i++) {
            repl = replacers[i];
            // log 'util/node/replace/repl', repl
        }
    }
    var nodes = item.parent.children;
    item.parent.children = [];
    var i, i_len=nodes.length, child;
    for (i=0; i<i_len; i++) {
        child = nodes[i];
        if (child === item) {
            var j, j_len=replacers.length, replchild;
            for (j=0; j<j_len; j++) {
                replchild = replacers[j];
                replchild.parent = item.parent;
                item.parent.children.push(replchild);
            }
        }
        else {
            item.parent.children.push(child);
        }
    }
};
md.remove = function(item) {
    var nodes = item.parent.children;
    item.parent.children = [];
    var i, i_len=nodes.length, child;
    for (i=0; i<i_len; i++) {
        child = nodes[i];
        if (child !== item) {
            item.parent.children.push(child);
        }
    }
};
/**
     inline a node hierarchy in a single text line
     separated by the "__LS__" sequence
*/
md.textToLine = function(node) {
    var acc = [];
    if (node.children) {
        var i, i_len=node.children.length, item;
        for (i=0; i<i_len; i++) {
            item = node.children[i];
            textline(item, acc, '');
        }
    }
    return acc.join(work.lineSep)
    ;
};
function textline(node, acc, indent) {
    var open = node.tagSuffix == '(' ? '(' : ' ';
    acc.push(indent + node.name + open + (node.value || ''));
    var i, i_len=node.children.length, item;
    for (i=0; i<i_len; i++) {
        item = node.children[i];
        textline(item, acc, (indent + '  '));
    }
}
md.lineToText = function(text) {
    if (typeof(text) === 'undefined' || text == null) {
        return {
                text: text, 
                lines: null
            };
    }
    var text = verify.replaceAll(text, work.textSep, '\n')
    ;
    var ss = text.split('\n');
    if (ss.length == 1) {
        return {
                text: ss[0], 
                lines: null
            };
    }
    else {
        var lines = verify.replaceAll(ss[1], work.lineSep, '\n').split('\n')
        ;
        return {
                text: ss[0], 
                lines: lines
            };
    }
};
md.isParentOfName = function(parsernode, nameOrArray) {
    var test = parsernode.parent;
    while (test) {
        if (verify.isArray(nameOrArray)) {
            var match = false;
            var i, i_len=nameOrArray.length, value;
            for (i=0; i<i_len; i++) {
                value = nameOrArray[i];
                match = match || test.name === value;
            }
            if (match) {
                return match;
            }
        }
        else {
            if (test.name === nameOrArray) {
                return true;
            }
        }
        test = test.parent;
    }
    return false;
};
function spaces(num) {
    return Array((num + 1)).join(" ")
    ;
}
function _dumpNodeDeep(node, indent) {
    console.log(spaces(indent) + node.name + ' ' + (node.value || '') + ' ids: ' + node.parsedId + ' ' + node.id);
    if (node.$args || node.$params) {
        console.log(spaces(indent) + ' $args: ' + node.$args + ' $params: ' + node.$params);
    }
    indent++;
    var i, i_len=node.children.length, child;
    for (i=0; i<i_len; i++) {
        child = node.children[i];
        _dumpNodeDeep(child, indent);
    }
}
md.dump = function(nodes) {
    var i, i_len=nodes.length, node;
    for (i=0; i<i_len; i++) {
        node = nodes[i];
        _dumpNodeDeep(node, 1);
    }
};
var work = {};
work.lineSep = "__LS__";
work.textSep = "__TS__";

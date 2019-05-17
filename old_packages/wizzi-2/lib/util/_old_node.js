var util = require('util');
var log = require('../util/log')(module, { tofile: true });
var verify = require('../util/verify');
var md = module.exports = {};
/*
    IttfCommand finder
*/
md.findIttfCommand = function (item, cmdname, type) {
    /*
    if (cmdname === 'code-js') {
        console.log('findKook', item.name, item.value);
    }
    */
    if (item.name === ('$' + type)) {
        // console.log('node.findIttfCommand.item.$hook, cmdname', item.value, cmdname);
        if (item.value && item.value.trim() === cmdname) {
            // console.log('node.findIttfCommand.found', item.value);
            /*
            if (cmdname === 'code-js') {
                console.log('found', item.name, item.value);
            }
            */
            return item;
        }
        if (!item.value && cmdname === 'default') return item;
    }
    var found, i, l = item.childs.length;
    for (i = 0; i < l; i++) {
        found = md.findIttfCommand(item.childs[i], cmdname, type)
        if (found) return found;
    }
    return null;
}
md.findHookExt = function (item, hookname) {
    var prn = item.parent;
    if (!prn) return null;
    var hook = md.findIttfCommand(prn, hookname, 'hook')
    if (hook) return hook;
    return md.findHookExt(prn, hookname);
}
md.findVirtual = function (item, virtname) {
    var prn = item.parent;
    if (!prn) return null;
    var virt = md.findIttfCommand(prn, virtname, 'virtual')
    if (virt) return virt;
    return md.findVirtual(prn, virtname);
}
/*
    Tree manipulation
*/
md.replace = function (item, replacers) {
    var nodes = item.parent.childs;
    item.parent.childs = [];
    nodes.forEach(function (child) {
        if (child === item) {
            replacers.forEach(function (replchild) {
                replchild.parent = item.parent;
                item.parent.childs.push(replchild);
            });
        }
        else
            item.parent.childs.push(child);
    });
}
md.remove = function (item) {
    var nodes = item.parent.childs;
    item.parent.childs = [];
    nodes.forEach(function (child) {
        if (child !== item) {
            item.parent.childs.push(child);
        }
    });
}
/*
    Node text ($.)
*/
md.textToLine = function (node) {
    var acc = [];
    if (node.childs) {
        node.childs.forEach(function (item) {
            textline(item, acc, '');
        })
    }
    var ret = acc.join(work.lineSep);
    // console.log('textToLine', ret);
    return ret;
}
function textline(node, acc, indent) {
    var open = node.tagSuffix == '(' ? '(' : ' ';
    // console.log('textline', node.name + open + (node.value || ''));
    acc.push(indent + node.name + open + (node.value || ''));
    if (node.childs) {
        node.childs.forEach(function (item) {
            textline(item, acc, indent + '  ');
        })
    }
}
md.lineToText = function (text) {
    if (typeof text === 'undefined' || text == null) {
        return { text: text, lines: null };
    }
    var text = verify.replaceAll(text, work.textSep, '\n');
    var ss = text.split('\n');
    if (ss.length == 1) {
        return { text: ss[0], lines: null };
    } else {
        var lines = verify.replaceAll(ss[1], work.lineSep, '\n').split('\n');
        return { text: ss[0], lines: lines };
    }
}
md.isParentOfName = function (parsernode, nameOrArray) {
    var logga = verify.startsWith(parsernode.name, 'spa.staticFolders.push');
    var test = parsernode.parent;
    while (test) {
        // if (logga) console.log('md.isParentOfName', test.name, nameOrArray[0], nameOrArray[1]);
        if (verify.isArray(nameOrArray)) {
            var match = false;
            nameOrArray.forEach(function (value) {
                match = match || test.name === value;
            })
            if (match) return match;
        } else {
            if (test.name === nameOrArray) return true;
        }
        test = test.parent;
    }
    return false;
}
function spaces(num) {
    return Array(num + 1).join(" ");
}
function _dumpNodeDeep(node, indent)
{
    console.log(spaces(indent) + node.name + ' ' + (node.value || '') + ' ids: ' + node.parsedId + ' ' + node.id);
    if (node.$args || node.$params)
        console.log(spaces(indent) + ' $args: ' + node.$args + ' $params: ' + node.$params);
    indent++;
    node.childs.forEach(function (n) {
        _dumpNodeDeep(n, indent);
    })
}
md.dump = function (nodes) {
    nodes.forEach(function (node) {
        _dumpNodeDeep(node, 1);
    });
}
var work = {};
work.lineSep = "__LS__";
work.textSep = "__TS__";

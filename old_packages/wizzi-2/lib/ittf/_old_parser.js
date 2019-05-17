var util = require('util');
var log = require('../util/log')(module);
/*
    Parses lexed lines into a tree structure object
        detects the $params command
        implements line continuation
        assigns an id to each node
    !!! A line object is transformed in place into a node object 
        without recreation (cloning) !!!
    ittf commands:
        $params  // the param values are stored in the IttfModel
        \        // implements line continuation
                 //   the value is appendend to the value of the parent line
                 //   without separators
        \b       // implements line continuation
                 //   the value is appendend to the value of the parent line
                 //   with a space separator:  prevLine,value += ' ' + currentLine.value
        \n       // implements line continuation
                 //   the value is appendend to the value of the parent line
                 //   with a space line break separator:  prevLine,value += '\n' + currentLine.value
    line -> node : {
        + parent: Object, // parent ittf node
        + model: Object, // the IttfModel to which the line belongs
        + childs: Array, // the childrem ittf nodes
        id: Number,
        indent: Number,
        name: String,
        value: String,
        row: Number,
        col: Number,
        sourceKey: String,
        tagSuffix: undefined || '('
    }
    
*/
/*
    params
        lines  // created by ./lexer.js
        ittfModel // the caller, created by ./ittf.js
*/
module.exports = function (lines, ittfModel) {
    var nodes = [],
        root = null,
        current = null,
        nameFirstChar = null,
        nameLength = 0,
        line,
        i,
        l = lines.length;
    for (var i = 0; i < l; i++) {
        line = lines[i];
        nameFirstChar = line.name[0];
        nameLength = line.name.length;
        // console.log('ittf.parser line', line)
        line.id = ittfModel.loadContext.getNewNodeId()
        line.model = ittfModel;
        if (line.indent == 0 && current == null) {
            // root node
            line.parent = null;
            nodes.push(line);
        } else if (current == null) {
            throw new Error(
                "Malformed tree, root node cannot have an indent. Filepath: " + ittfModel.uri + '\n' +
                'line: ' + util.inspect(line)
                );
        } else if (line.indent == current.indent) {
            // sibling node
            // console.log('ittf.parser line, current.parent', line, current.parent)
            if (typeof current.parent === 'undefined' || current.parent === null) {
                throw new Error(
                    "Malformed tree, only one root note allowed." +
                    "\nNode " + line.name + ' ' + (line.value || '') + ' row: ' + line.row + ' col: ' + line.col +
                    "\nFilepath: " + ittfModel.uri
                    );
            }
            line.parent = current.parent;
            current.parent.childs.push(line);
        } else if (line.indent > current.indent) {
            // child node
            if (nameFirstChar == '$' && line.name === '$params') {
                // TODO Verify current.parent === null
                // current must be the root node of a mixin
                if (current.indent > 0) {
                    throw new Error(
                        "The $params node must be a child of the root node." +
                        "\nNode " + line.name + ' ' + (line.value || '') + ' row: ' + line.row + ' col: ' + line.col +
                        ".\nFilepath: " + ittfModel.uri
                        );
                }
                current.model.$params = line.value;
                continue;
            } else if (nameFirstChar == '\\' && nameLength == 1) {
                current.value += line.value
                continue;
            } else if (nameFirstChar == '\\' && line.name === '\\b') {
                current.value += ' ' + line.value
                continue;
            } else if (nameFirstChar == '\\' && line.name === '\\n') {
                current.value += '\n' + line.value
                continue;
            } else {
                line.parent = current;
                current.childs.push(line);
            }
        } else if (line.indent < current.indent) {
            // child of ancestor node or root node
            var parent = current.parent;
            while (parent != null && line.indent < parent.indent)
                parent = parent.parent;
            line.parent = parent.parent;
            if (parent.parent) {
                parent.parent.childs.push(line);
            } else {
                throw new Error(
                    "Malformed tree, only one root note allowed." +
                    "\nNode " + line.name + ' ' + (line.value || '') + ' row: ' + line.row + ' col: ' + line.col +
                    ".\n Filepath: " + ittfModel.uri);
                //VIA nodes.push(line);
            }
        }
        current = line;
        current.childs = [];
    }
    return nodes;
};

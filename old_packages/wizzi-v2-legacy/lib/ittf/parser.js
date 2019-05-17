/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: C:\My\wizzi\v2\sources\wizzi-2-boot\ittf\lib\ittf\parser.js.ittf
    utc time: Tue, 11 Jul 2017 18:50:00 GMT
*/
'use strict';
var util = require('util');
var log = require('../util/log')(module)

;
/**
     . parses lexed lines into a tree structure object
     . detects the $params command
     . implements line continuation
     . assigns an id to each node
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
     //   with a line break separator:  prevLine,value += '\n' + currentLine.value
    
     Outputs
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
     hasMacro: Boolean
     }
*/
module.exports = function(lines,ittfModel) {
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
        line.id = ittfModel.loadContext.getNewNodeId();
        line.model = ittfModel;
        if (line.indent == 0 && current == null) {
            line.parent = null;
            nodes.push(line);
        }
        else if (current == null) {
            return error('Malformed tree, root node cannot have an indent.', line, ittfModel)
            ;
        }
        else if (line.indent == current.indent) {
            if (typeof(current.parent) === 'undefined' || current.parent === null) {
                return error('Malformed tree, only one root note allowed.', line, ittfModel)
                ;
            }
            line.parent = current.parent;
            current.parent.childs.push(line);
        }
        else if (line.indent > current.indent) {
            if (nameFirstChar == '$' && line.name === '$params') {
                if (current.indent > 0) {
                    return error('The $params node must be a child of the root node.', line, ittfModel)
                    ;
                }
                current.model.$params = line.value;
                continue;
            }
            else if (nameFirstChar == '\\' && nameLength == 1) {
                // value continuation on new line
                current.value += line.value;
                continue;
            }
            else if (nameFirstChar == '\\' && line.name === '\\b') {
                // value continuation on new line with space
                current.value += (' ' + line.value);
                continue;
            }
            else if (nameFirstChar == '\\' && line.name === '\\n') {
                // value continuation on new line with line break
                current.value += ('\n' + line.value);
                continue;
            }
            else {
                line.parent = current;
                current.childs.push(line);
            }
        }
        else if (line.indent < current.indent) {
            var parent = current.parent;
            while (parent != null && line.indent < parent.indent) {
                parent = parent.parent;
            }
            line.parent = parent.parent;
            if (parent.parent) {
                parent.parent.childs.push(line);
            }
            else {
                return error('Malformed tree, only one root note allowed.', line, ittfModel)
                ;
            }
        }
        current = line;
        current.childs = [];
    }
    return nodes;
};
function error(message,line,ittfModel) {
    message = message + '\nNode ' + line.name + ' ' + (line.value || '') + ' row: ' + line.row + ' col: ' + line.col + '.\n Filepath: ' + ittfModel.uri;
    return {
            __is_error: true, 
            message: message, 
            source: 'lib/ittf/parser'
        };
}


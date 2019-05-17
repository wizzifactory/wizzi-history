/*
    artifact generator: C:\My\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\My\wizzi\v5\apps\wizzi-tools\src\ittf\lib\wizzifiers\graphqlparser\graphql\cleanAST.js.ittf
*/
'use strict';
var verify = require('wizzi-utils').verify;
function cleanAst(ast) {
    delete ast.loc
    var i, i_items=Object.keys(ast), i_len=Object.keys(ast).length, k;
    for (i=0; i<i_len; i++) {
        k = Object.keys(ast)[i];
        if (verify.isArray(ast[k])) {
            // log 'k', k
            var temp = [];
            var j, j_items=ast[k], j_len=ast[k].length, node;
            for (j=0; j<j_len; j++) {
                node = ast[k][j];
                if (node.type === 'space') {
                }
                else {
                    cleanAst(node);
                    temp.push(node);
                }
            }
            ast[k] = temp;
        }
        if (verify.isObject(ast[k])) {
            // log 'k', k
            cleanAst(ast[k]);
        }
    }
    return ast;
}
module.exports = cleanAst;

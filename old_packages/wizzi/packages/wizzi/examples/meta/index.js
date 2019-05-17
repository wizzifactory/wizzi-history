/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\kernel\wizzi\src\ittf\examples\meta\index.js.ittf
*/
'use strict';
var async = require('async');
var path = require('path');
var stringify = require('json-stringify-safe');
var wizzi = require('../../index');
var jsCheatPath = path.join(__dirname, 'ittf', 'js', 'cheatsheet.meta.ittf');
// Generate the meta mTree.
wizzi.mtree(jsCheatPath, {}, function(err, mTree) {
    if (err) {
        console.log('err', err);
        throw new Error(err.message);
    }
    var result = {
        items: [
            
        ]
    };
    var i, i_items=mTree.nodes[0].children, i_len=mTree.nodes[0].children.length, n;
    for (i=0; i<i_len; i++) {
        n = mTree.nodes[0].children[i];
        console.log(n.n, n.v);
        if (n.n === 'item') {
            var itemResult = {};
            var j, j_items=n.children, j_len=n.children.length, item;
            for (j=0; j<j_len; j++) {
                item = n.children[j];
                if (item.n === 'ittf' && item.children.length == 1) {
                    console.log(item.n, mTree.toIttf(item.children[0]));
                    var ittfNode = {
                        n: 'module', 
                        children: [
                            {
                                n: 'kind', 
                                v: 'react', 
                                children: [
                                    
                                ]
                            }
                        ]
                    };
                    var k, k_items=item.children, k_len=item.children.length, node;
                    for (k=0; k<k_len; k++) {
                        node = item.children[k];
                        ittfNode.children.push(node);
                    }
                    itemResult[item.n] = mTree.toIttf(item.children[0]);
                    itemResult[item.n + 'Wrapped'] = mTree.toIttf(ittfNode);
                }
                else {
                    itemResult[item.n] = item.v;
                    console.log(item.n, item.v);
                }
            }
            result.items.push(itemResult);
        }
        else {
            result[n.n] = n.v;
        }
    }
    var dump = stringify(result, null, 2);
    console.log('result\n', dump);
    var dump = stringify(mTree.toIttf(), null, 2);
    // log 'jsCheatSheet\n', dump
    var dump = stringify(mTree, null, 2);
    // log 'jsCheatSheet\n', dump
    async.map(result.items, function(item, callback) {
        wizzi.genFromText(item.ittfWrapped, {}, {
            artifactName: 'js/module'
        }, function(err, artifactText) {
            if (err) {
                console.log('err', err);
                throw new Error(err.message);
            }
            item.generated = artifactText;
            callback(null);
        });
    }, function(err, notUsed) {
        if (err) {
            return callback(err);
        }
        var dump = stringify(result, null, 2);
        console.log('result\n', dump);
    });
});

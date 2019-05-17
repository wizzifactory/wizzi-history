/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\plugins\wizzi-meta\src\ittf\lib\artifacts\cheatsheet\preprint\trans\main.js.ittf
*/
'use strict';
var util = require('util');
var path = require('path');
var verify = require('wizzi-utils').verify;
var async = require('async');
var stringify = require('json-stringify-safe');
var prettify = require('wizzi-utils').prettifyFromString;

var myname = 'model.transformer.cheatsheet.preprint';

var md = module.exports = {};

md.trans = function(model, ctx, callback) {
    if (verify.isFunction(callback) != true) {
        throw new Error(myname + ' a callback parameter of type function is required. In uri: ' + model.ittfDocumentUri);
    }
    if (verify.isObject(ctx) != true) {
        throw new Error(myname + ' a context parameter of type object is required. In uri: ' + model.ittfDocumentUri);
    }
    console.log('Starting transform cheatsheet/preprint');
    var _all_items = [];
    var result = {
        elements: [
            
        ]
    };
    var i, i_items=model.children, i_len=model.children.length, itemTop;
    for (i=0; i<i_len; i++) {
        itemTop = model.children[i];
        if (itemTop.name !== 'element') {
            result[itemTop.name] = itemTop.value;
        }
    }
    var i, i_items=model.children, i_len=model.children.length, itemTop;
    for (i=0; i<i_len; i++) {
        itemTop = model.children[i];
        // log itemTop.name, itemTop.value
        if (itemTop.name === 'element') {
            var elementResult = {
                name: itemTop.value, 
                items: [
                    
                ]
            };
            var j, j_items=itemTop.children, j_len=itemTop.children.length, itemEl;
            for (j=0; j<j_len; j++) {
                itemEl = itemTop.children[j];
                if (itemEl.name === 'item') {
                    var itemResult = {
                        schema: result.schema, 
                        render: 'artifact'
                    };
                    var k, k_items=itemEl.children, k_len=itemEl.children.length, item;
                    for (k=0; k<k_len; k++) {
                        item = itemEl.children[k];
                        if (item.name === 'ittf') {
                            // log item.name, toIttf(item.children[0])
                            if (item.children.length == 1) {
                                if ((result.schema === 'json' && (item.children[0].name === '{' || item.children[0].name === '[')) || item.children[0].name === ittfRootFromSchema(result.schema) || ittfRootFromSchema(result.schema) === 'any') {
                                    // is already ok, has the correct root
                                    // ??? set itemResult[item.name] = toIttf(item.children[0])
                                    itemResult[item.name] = toIttf(item.children[0]);
                                    itemResult[item.name + 'Wrapped'] = itemResult[item.name];
                                }
                                else {
                                    // wrap it
                                    var ittfNode = wrapperForSchema(result.schema);
                                    var l, l_items=item.children, l_len=item.children.length, node;
                                    for (l=0; l<l_len; l++) {
                                        node = item.children[l];
                                        ittfNode.children.push(node);
                                    }
                                    itemResult[item.name] = toIttf(item.children[0]);
                                    itemResult[item.name + 'Wrapped'] = toIttf(ittfNode);
                                }
                            }
                            else {
                                // wrap them
                                var ittfNode = wrapperForSchema(result.schema);
                                var l, l_items=item.children, l_len=item.children.length, node;
                                for (l=0; l<l_len; l++) {
                                    node = item.children[l];
                                    ittfNode.children.push(node);
                                }
                                itemResult[item.name] = toIttf(item.children[0]);
                                itemResult[item.name + 'Wrapped'] = toIttf(ittfNode);
                            }
                        }
                        else {
                            itemResult[item.name] = item.value;
                            // log item.name, item.value
                        }
                    }
                    elementResult.items.push(itemResult);
                    _all_items.push(itemResult);
                }
                else {
                    elementResult[itemEl.name] = itemEl.value;
                }
            }
            result.elements.push(elementResult);
        }
    }
    var dump = stringify(result, null, 2);
    // log 'result\n', dump
    var dump = stringify(toIttf(model), null, 2);
    // log 'jsCheatSheet\n', dump
    var dump = stringify(model, null, 2);
    // log 'jsCheatSheet\n', dump
    var counter = 0;
    async.map(_all_items, function(item, callback) {
        // log 'counter', ++counter
        prettify(item.ittf, function(err, pretty) {
            if (err) {
                return callback(err);
            }
            item.ittfPretty = pretty;
            // log 'cheatsheet.preprint.ctx', ctx
            // log 'counter.prettified', counter
            if (item.render === 'script') {
                // log 'ctx.wizziFactory.loadMTreeDebugInfoFromText', ctx.wizziFactory.loadMTreeDebugInfoFromText
                ctx.wizziFactory.loadMTreeDebugInfoFromText(item.ittfWrapped, {}, function(err, script) {
                    // log 'counter', --counter
                    if (err) {
                        item.generated = '\n' + verify.htmlEscape(stringify(err, null, 2));
                    }
                    else {
                        item.generated = '\n' + verify.htmlEscape(script.mTreeBuildUpScript);
                    }
                    callback(null);
                });
            }
            else {
                // log 'ctx.wizziFactory.loadModelAndGenerateArtifactFromText', ctx.wizziFactory.loadModelAndGenerateArtifactFromText
                ctx.wizziFactory.loadModelAndGenerateArtifactFromText(item.ittfWrapped, {
                    artifactRequestContext: {
                        noUseStrict: true, 
                        noGeneratorComments: true
                    }
                }, artifactNameFromSchema(item.schema), function(err, artifactText) {
                    // log 'counter', --counter
                    if (err) {
                        item.generated = '\n' + verify.htmlEscape(stringify(err, null, 2));
                    }
                    else {
                        artifactText = verify.htmlEscape(artifactText);
                        item.generated = '\n' + artifactText;
                    }
                    callback(null);
                });
            }
        });
    }, function(err, notUsed) {
        if (err) {
            return callback(err);
        }
        var dump = stringify(result, null, 2);
        // log 'result\n', dump
        console.log('Ending transform cheatsheet/preprint');
        callback(null, result);
    });
};
function toIttf(node) {
    var buffer = [];
    if (node && node.children) {
        _toIttfNodeDeep(node, 0, buffer);
    }
    else {
        this.nodes.forEach(function(node) {
            _toIttfNodeDeep(node, 0, buffer);
        });
    }
    return buffer.join('\n');
}
function _toIttfNodeDeep(node, indent, buffer) {
    if (node.name) {
        buffer.push(spaces(indent * 4) + node.name + ' ' + (node.value || ''));
    }
    else {
        buffer.push(spaces(indent * 4) + node.n + ' ' + (node.v || ''));
    }
    var i, i_items=node.children, i_len=node.children.length, child;
    for (i=0; i<i_len; i++) {
        child = node.children[i];
        _toIttfNodeDeep(child, indent + 1, buffer);
    }
}
function spaces(num) {
    return Array(num + 1).join(" ")
    ;
}
function wrapperForSchema(schema) {
    if (schema === 'js') {
        return {
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
    }
    else if (schema === 'ts') {
        return {
                n: 'module', 
                children: [
                    
                ]
            };
    }
    else {
        return {
                n: schema, 
                children: [
                    
                ]
            };
    }
}
var schemaArtifactMap = {
    js: 'js/module', 
    ts: 'ts/module', 
    html: 'html/document', 
    css: 'css/document', 
    scss: 'scss/document', 
    svg: 'svg/document', 
    vtt: 'vtt/document', 
    md: 'md/document', 
    json: 'json/document', 
    ittf: 'ittf/document'
};
function artifactNameFromSchema(schema) {
    // log 'artifactNameFromSchema', schema, schemaArtifactMap[schema]
    return schemaArtifactMap[schema];
}
var schemaIttfRootMap = {
    js: 'module', 
    html: 'html', 
    css: 'css', 
    scss: 'scss', 
    svg: 'svg', 
    md: 'vtt', 
    vtt: 'vtt', 
    json: '{', 
    ittf: 'any'
};
function ittfRootFromSchema(schema) {
    // log 'ittfRootFromSchema', schema, schemaIttfRootMap[schema]
    return schemaIttfRootMap[schema];
}

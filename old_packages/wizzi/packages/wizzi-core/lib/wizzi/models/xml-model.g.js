/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\plugins\wizzi-core\src\ittf\lib\wizzi\models\xml-model.g.js.ittf
*/
'use strict';
/** -àà
     Pseudo schema xml
*/
var util = require('util');
var lineparser = require('../../util/lineParser');

module.exports = function(mTree, ittfDocumentUri, request, callback) {
    if (!(mTree.nodes && mTree.nodes.length == 1)) {
        return callback(error('Malformed mTree must have one root node. Found mTree.nodes: ' + mTree.nodes));
    }
    var root = mTree.nodes[0];
    if (root.n !== "xml") {
        return callback(error('The root node of an xml ittf document must be : "xml". Found: ' + root.n + ' ' + root.v));
    }
    var xml = toXmlElement('xml', root.children);
    if (xml && xml.__is_error) {
        console.log('__is_error ', xml);
        return callback(xml);
    }
    xml.wzElement = 'xml';
    return callback(null, xml);
};
function toXmlElement(tag, nodes) {
    // log '===== ++++++ xml.toXmlElement, nodes.length', nodes.length
    var ret = {
        tag: tag, 
        attributes: [], 
        elements: []
    };
    var i, i_items=nodes, i_len=nodes.length, node;
    for (i=0; i<i_len; i++) {
        node = nodes[i];
        // log '===== ++++++ xml.toXmlElement, node.n', node.n, node.v, node.children.length
        if (node.n === '@') {
            var nv = lineparser.parseNameValueRaw(node.v);
            if (tag === 'xml' && nv.name() === 'encoding') {
                ret.encoding = nv.value();
            }
            else if (tag === 'xml' && nv.name() === 'standalone') {
                ret.standalone = nv.value();
            }
            else {
                ret.attributes.push({
                    name: nv.name(), 
                    value: nv.value()
                });
            }
        }
        else if (node.n === '+') {
            ret.elements.push({
                text: node.v
            });
            if (node.children && node.children.length > 0) {
                var newelement = toXmlElement(node.n, node.children);
                if (newelement && newelement.__is_error) {
                    return newelement;
                }
                ret.elements.push(newelement);
            }
        }
        else if (node.v && node.v.length > 0) {
            if (tag === 'xml' && node.n === 'encoding') {
                ret.encoding = node.v;
            }
            else if (tag === 'xml' && node.n === 'standalone') {
                ret.standalone = node.v;
            }
            else {
                ret.elements.push({
                    tag: node.n, 
                    text: node.v, 
                    attributes: [], 
                    elements: []
                });
                if (node.children && node.children.length > 0) {
                    var newelement = toXmlElement(node.n, node.children);
                    if (newelement && newelement.__is_error) {
                        return newelement;
                    }
                    ret.elements.push(newelement);
                }
            }
        }
        else {
            if (node.children && node.children.length > 0) {
                var newelement = toXmlElement(node.n, node.children);
                if (newelement && newelement.__is_error) {
                    return newelement;
                }
                ret.elements.push(newelement);
            }
        }
    }
    return ret;
}
function error(message) {
    return {
            __is_error: true, 
            source: 'wizzi-core/lib/wizzi/models/xml-model.g', 
            message: message
        };
}

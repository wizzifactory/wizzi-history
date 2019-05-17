// generator: /wizzi-labs/wizzi-lab-site/ittf/lib/artifacts/js/module/gen/main.js, utc time: Thu, 23 Mar 2017 19:48:41 GMT
'use strict';
var util = require('util');
var _ = require('lodash');
var errors = require('../../../../../lib/errors');
var verify = require('../../../../../lib/util/verify');
var log = require('../../../../../lib/util/log')(module);
var jsModelType = require('../../../../../legacy').jsModelType;
var md = module.exports = {};
var myname = 'model.transformation.wizzischema.html.docs.main';
md.trans = function(model,ctx,callback) {
    if (model.wzElement != 'wizzischema') {
        errors.NodeError(myname + '.trans. Model wzElement must be wizzischema. Found: ' + model.wzElement, model);
    }
    ctx.result = {
        name: model.wzName, 
        preserveTags: model.preserveTags
    };
    md.wizzischema(model, ctx);
    callback(null, ctx.result);
};
md.wizzischema = function(model,ctx,parent) {
    ctx.result.requires = [];
    ctx.result.exportTos = [];
    ctx.result.elements = [];
    var i, i_len=model.exportTos.length, exportTo;
    for (i=0; i<i_len; i++) {
        exportTo = model.exportTos[i];
        md.exportTo(exportTo, ctx, ctx.result);
    }
    var i, i_len=model.elements.length, element;
    for (i=0; i<i_len; i++) {
        element = model.elements[i];
        md.element(element, ctx, ctx.result);
    }
};
md.exportTo = function(model,ctx,parent) {
    parent.exportTos.push(model.wzName);
};
md.element = function(model,ctx,parent) {
    var flags = '';
    flags += model.isAbstract ? 'is-abstract ' : '';
    flags += model.addToChildren ? 'add-to-children ' : '';
    var node = {
        name: model.wzId, 
        super: model.superId, 
        isRoot: model.isRoot, 
        tags: model.tagName.split('|'), 
        flags: flags, 
        attributes: [], 
        relations: [], 
        derived: [], 
        restricts: [], 
        methods: [], 
        comments: []
    };
    var flatAttributes = model.getFlatAttributes();
    var i, i_len=flatAttributes.length, attr;
    for (i=0; i<i_len; i++) {
        attr = flatAttributes[i];
        node.attributes.push(attr);
    }
    var flatRelations = model.getFlatRelations();
    var i, i_len=flatRelations.length, r;
    for (i=0; i<i_len; i++) {
        r = flatRelations[i];
        node.relations.push(r);
    }
    var i, i_len=model.derived.length, d;
    for (i=0; i<i_len; i++) {
        d = model.derived[i];
        node.derived.push({
            name: d.wzId, 
            tags: d.tagName.split('|')
        });
    }
    var i, i_len=model.methods.length, m;
    for (i=0; i<i_len; i++) {
        m = model.methods[i];
        var methodNode = {
            name: m.wzName, 
            emitKey: m.emitKey, 
            isStatic: m.isStatic, 
            isKnownMethod: m.isKnownMethod, 
            params: [], 
            statements: [], 
            comments: []
        };
        var j, j_len=m.params.length, param;
        for (j=0; j<j_len; j++) {
            param = m.params[j];
            methodNode.params.push(param.wzName);
        }
        var j, j_len=m.statements.length, stm;
        for (j=0; j<j_len; j++) {
            stm = m.statements[j];
            var k, k_len=normalizeJST(stm.wzName).length, item;
            for (k=0; k<k_len; k++) {
                item = normalizeJST(stm.wzName)[k];
                methodNode.statements.push(item);
            }
        }
        var j, j_len=m.comments.length, comment;
        for (j=0; j<j_len; j++) {
            comment = m.comments[j];
            methodNode.comments.push(comment.wzName);
        }
        node.methods.push(methodNode);
    }
    var i, i_len=model.restricts.length, restrict;
    for (i=0; i<i_len; i++) {
        restrict = model.restricts[i];
        node.restricts.push(getRestrictFill(restrict));
    }
    var i, i_len=model.comments.length, comment;
    for (i=0; i<i_len; i++) {
        comment = model.comments[i];
        node.comments.push(comment.wzName);
    }
    parent.elements.push(node);
};
function getRestrictFill(model) {
    var restrictCloned = {
        facets: [], 
        comments: []
    };
    var i, i_len=model.facets.length, facet;
    for (i=0; i<i_len; i++) {
        facet = model.facets[i];
        var facetCloned = {
            type: facet.wzElement, 
            value: facet.wzName, 
            comments: []
        };
        var j, j_len=facet.comments.length, comment;
        for (j=0; j<j_len; j++) {
            comment = facet.comments[j];
            facetCloned.comments.push(comment.wzName);
        }
        restrictCloned.facets.push(facetCloned);
    }
    var i, i_len=model.comments.length, comment;
    for (i=0; i<i_len; i++) {
        comment = model.comments[i];
        restrictCloned.comments.push(comment.wzName);
    }
    return restrictCloned;
}

function normalizeJST(stm) {
    var json = JSON.parse(stm);
    var ret = [];
    if (verify.isArray(json)) {
        var i, i_len=json.length, item;
        for (i=0; i<i_len; i++) {
            item = json[i];
            ret.push(normalizeJSTNode(item));
        }
    }
    else {
        ret.push(normalizeJSTNode(json));
    }
    return ret;
}

function normalizeJSTNode(jstnode) {
    var node = {
        tag: jstnode.n, 
        name: jstnode.n, 
        value: jstnode.v, 
        statements: []
    };
    if (jsModelType.__tagElementMapping[jstnode.n]) {
        node.name = jsModelType.__tagElementMapping[jstnode.n];
    }
    if (jstnode.childs) {
        var i, i_len=jstnode.childs.length, item;
        for (i=0; i<i_len; i++) {
            item = jstnode.childs[i];
            node.statements.push(normalizeJSTNode(item));
        }
    }
    return node;
}


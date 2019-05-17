/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\plugins\wizzi-meta\src\ittf\lib\artifacts\docs\preprint\trans\main.js.ittf
*/
'use strict';
var util = require('util');
var path = require('path');
var _ = require('lodash');
var errors = require('../../../../errors');
var html = require('./html');
var md = module.exports = {};
var myname = 'model.transformation.docs.preprint.main';
md.trans = function(model, ctx, callback) {
    if (model.wzElement != 'docs') {
        errors.NodeError(myname + '.gen. Model wzElement must be docs. Found: ' + model.wzElement, model);
    }
    ctx.result = {};
    ctx.objectCount = 0;
    ctx.conceptCount = 0;
    ctx.sectionCount = 0;
    ctx.apiObjectCount = 0;
    ctx.apiMethodCount = 0;
    ctx.sampleGroupCount = 0;
    ctx.sampleCount = 0;
    ctx.ittfCount = 0;
    ctx.roadmapCount = 0;
    ctx.milestoneCount = 0;
    ctx.todoCount = 0;
    ctx.issueCount = 0;
    md.goItem(model, ctx);
    callback(null, ctx.result);
};
md.docs = function(model, ctx, parent) {
    var node = {
        type: 'docs', 
        name: model.wzName, 
        intro: {
            summaryLines: []
        }, 
        summaryLines: [], 
        project: {}, 
        objects: [], 
        concepts: [], 
        sections: [], 
        sampleGroups: []
    };
    ctx.result = node;
    md.goItems(model.items, ctx, node);
};
md.project = function(model, ctx, parent) {
    var node = {
        type: 'project', 
        name: model.wzName, 
        roadmaps: [], 
        todos: [], 
        issues: [], 
        summaryLines: []
    };
    node.parent = parent;
    parent.project = node;
    md.goItems(model.items, ctx, node);
};
md.roadmap = function(model, ctx, parent) {
    ctx.roadmapCount++;
    var node = {
        type: 'roadmap', 
        name: model.wzName, 
        id: 'roadmap-' + ctx.roadmapCount, 
        milestones: [], 
        summaryLines: []
    };
    node.parent = parent;
    parent.roadmaps.push(node);
    md.goItems(model.items, ctx, node);
};
md.milestone = function(model, ctx, parent) {
    ctx.milestoneCount++;
    var node = {
        type: 'milestone', 
        name: model.wzName, 
        id: 'milestone-' + ctx.milestoneCount, 
        summaryLines: []
    };
    node.parent = parent;
    parent.milestones.push(node);
    md.goItems(model.items, ctx, node);
};
md.todo = function(model, ctx, parent) {
    ctx.todoCount++;
    var node = {
        type: 'todo', 
        name: model.wzName, 
        id: 'todo-' + ctx.todoCount, 
        categories: [], 
        tags: [], 
        summaryLines: []
    };
    node.parent = parent;
    parent.todos.push(node);
    md.goItems(model.items, ctx, node);
};
md.issue = function(model, ctx, parent) {
    ctx.issueCount++;
    var node = {
        type: 'issue', 
        name: model.wzName, 
        id: 'issue-' + ctx.issueCount, 
        categories: [], 
        tags: [], 
        summaryLines: []
    };
    node.parent = parent;
    parent.issues.push(node);
    md.goItems(model.items, ctx, node);
};
md.intro = function(model, ctx, parent) {
    var node = {
        type: 'intro', 
        name: model.wzName, 
        id: (model.id || 'intro'), 
        summaryLines: []
    };
    node.parent = parent;
    parent.intro = node;
    md.goItems(model.items, ctx, node);
};
md.object = function(model, ctx, parent) {
    ctx.objectCount++;
    var node = {
        type: 'object', 
        name: model.wzName, 
        id: (model.id || 'object-' + ctx.objectCount), 
        summaryLines: []
    };
    node.parent = parent;
    parent.objects.push(node);
    md.goItems(model.items, ctx, node);
};
md.concept = function(model, ctx, parent) {
    ctx.conceptCount++;
    var node = {
        type: 'concept', 
        name: model.wzName, 
        id: (model.id || 'concept-' + ctx.conceptCount), 
        summaryLines: []
    };
    node.parent = parent;
    parent.concepts.push(node);
    md.goItems(model.items, ctx, node);
};
md.section = function(model, ctx, parent) {
    ctx.sectionCount++;
    var node = {
        type: 'section', 
        name: model.wzName, 
        id: (model.id || 'section-' + ctx.sectionCount), 
        concepts: [], 
        summaryLines: []
    };
    node.parent = parent;
    parent.sections.push(node);
    md.goItems(model.items, ctx, node);
};
md.apiObject = function(model, ctx, parent) {
    ctx.apiObjectCount++;
    var node = {
        type: 'apiObject', 
        name: model.wzName, 
        id: (model.id || 'api-object-' + ctx.apiObjectCount), 
        apiMethods: [], 
        summaryLines: []
    };
    node.parent = parent;
    if (!parent.apiObjects) {
        parent.apiObjects = [];
    }
    parent.apiObjects.push(node);
    md.goItems(model.items, ctx, node);
};
md.apiMethod = function(model, ctx, parent) {
    ctx.apiMethodCount++;
    var node = {
        type: 'apiMethod', 
        name: model.wzName, 
        id: (model.id || 'api-method-' + ctx.apiMethodCount), 
        apiParams: [], 
        summaryLines: []
    };
    node.parent = parent;
    parent.apiMethods.push(node);
    md.goItems(model.items, ctx, node);
};
md.apiParam = function(model, ctx, parent) {
    var node = {
        type: 'apiParam', 
        name: model.wzName, 
        summaryLines: []
    };
    node.parent = parent;
    parent.apiParams.push(node);
    md.goItems(model.items, ctx, node);
};
md.summary = function(model, ctx, parent) {
    // log 'parent.summaryLines', parent.summaryLines
    var lines = html.toHtmlLines(model.items, ctx);
    lines.forEach(function(v) {
        parent.summaryLines.push(v);
    });
};
md.sampleGroup = function(model, ctx, parent) {
    ctx.sampleGroupCount++;
    var node = {
        type: 'sampleGroup', 
        name: model.wzName, 
        id: (model.id || 'sample-group-' + ctx.sampleGroupCount), 
        summaryLines: [], 
        samples: []
    };
    node.parent = parent;
    parent.sampleGroups.push(node);
    md.goItems(model.items, ctx, node);
};
md.sample = function(model, ctx, parent) {
    ctx.sampleCount++;
    var node = {
        type: 'sample', 
        name: model.wzName, 
        id: (model.id || 'sample-' + ctx.sampleCount), 
        summaryLines: [], 
        primaryIttf: {
            summaryLines: [], 
            nodeLines: []
        }, 
        mixins: [], 
        includes: [], 
        schema: {}
    };
    node.parent = parent;
    parent.samples.push(node);
    md.goItems(model.items, ctx, node);
};
md.ittf = function(model, ctx, parent) {
    ctx.ittfCount++;
    var node = {
        type: 'ittf', 
        name: path.basename(model.wzName), 
        path: model.wzName, 
        id: (model.id || 'ittf-' + ctx.ittfCount), 
        summaryLines: [], 
        nodeLines: []
    };
    node.parent = parent;
    if (model.kind === 'primary') {
        parent.primaryIttf = node;
    }
    else if (model.kind === 'mixin') {
        parent.mixins.push(node);
    }
    else if (model.kind === 'include') {
        parent.includes.push(node);
    }
    else if (model.kind === 'schema') {
        parent.schema = node;
    }
    else {
        errors.NodeError(myname + '.ittf. Unknown kind: ' + model.kind, model);
    }
    md.goItems(model.items, ctx, node);
};
md.js = function(model, ctx, parent) {
    ctx.jsCount++;
    var node = {
        type: 'js', 
        name: path.basename(model.wzName), 
        path: model.wzName, 
        id: (model.id || 'js-' + ctx.jsCount), 
        summaryLines: [], 
        nodeLines: []
    };
    node.parent = parent;
    md.goItems(model.items, ctx, node);
};
md.ittfnode = function(model, ctx, parent) {
    ctx.__ittfNode = {
        level: 0, 
        line: 0
    };
    var lines;
    if (parent.type === 'js') {
        lines = html.toHtmlJsCodeLines(model, ctx);
    }
    else {
        lines = html.toHtmlCodeLines(model, ctx);
    }
    // log 'nodeLines', lines
    lines.forEach(function(v) {
        parent.nodeLines.push(v);
    });
};
md.categories = function(model, ctx, parent) {
    var items = model.wzName.split(',');
    var i, i_items=items, i_len=items.length, item;
    for (i=0; i<i_len; i++) {
        item = items[i];
        var ss = item.split(':');
        var name = ss.length == 2 ? ss[1] : ss[0];
        var key = ss.length == 2 ? ss[0] : null;
        var node = {
            type: 'category', 
            name: name, 
            key: key
        };
        if (!parent.categories) {
            errors.NodeError(myname + '.categories. The parent element do not support categories : ' + model.wzElement + '/' + model.wzName, model);
        }
        parent.categories.push(node);
    }
};
md.tags = function(model, ctx, parent) {
    var items = model.wzName.split(',');
    var i, i_items=items, i_len=items.length, item;
    for (i=0; i<i_len; i++) {
        item = items[i];
        var node = {
            type: 'tag', 
            name: model.wzName
        };
        if (!parent.tags) {
            errors.NodeError(myname + '.tags. The parent element do not support categories : ' + model.wzElement + '/' + model.wzName, model);
        }
        parent.tags.push(node);
    }
};
md.goItem = function(model, ctx, parent) {
    var oper = md[model.wzElement];
    if (oper) {
        oper(model, ctx, parent);
    }
    else {
        errors.NodeError(myname + '.goItem. Unknown wzElement: ' + model.wzTag + '/' + model.wzElement, model);
    }
};
md.goItems = function(items, ctx, parent, options) {
    options = options || {};
    options.from = options.from || 0;
    for (var i = options.from; i < items.length; i++) {
        var item = items[i];
        md.goItem(item, ctx, parent);
    }
};

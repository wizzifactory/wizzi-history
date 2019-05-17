var wizzi = require('wizzi');
var lineParser = wizzi.lineParser;
var util = require('./util');
var md = module.exports = {};
var myname = 'form.jsonizer.main';
md.trans = function (model, ctx, callback) {
    var ret = {
        name: model.wzName,
        comments: [],
        items: []
    }
    try
    {
        md.genLoop(model, ctx, ret);
    } catch (ex) {
        return callback(ex);
    }
    callback(null, ret);
}
md.genLoop = function (model, ctx, parent) {
    var item = md[model.wzElement];
    if (item) item(model, ctx, parent);
    else throw new Error(myname + '.ctor. Unknown form item tag: ' + model.wzTag + '/' + model.wzElement, model);
}
md.genItems = function (model, ctx, parent) {
    if (model.items && model.items.length > 0) {
        model.items.forEach(function (item) {
            md.genLoop(item, ctx, parent);
        });
    }
}
md.form = function (model, ctx, parent) {
    parent.id = model.wzName;
    parent.htmlId = model.wzName;
    parent.name = model.name || model.wzName;
    parent.title = model.title;
    parent.kind = model.kind;
    if (model.data_kind === 'object') {
        parent.valueIsObject = true;
    } else if (model.data_kind === 'array') {
        parent.valueIsArray = true;
    } else {
        parent.valueIsSingleValue = true;
    }
    parent.size = model.size || 'medium';
    md.genItems(model, ctx, parent);
}
md.comment = function (model, ctx, parent) {
    var c = {
        kind: 'comment',
        text: model.wzName,
        comments: [],
    }
    parent.comments.push(c);
    md.genItems(model, ctx, c);
}
md.href = function (model, ctx, parent) {
    var c = {
        kind: 'href',
        href: model.wzName,
        text: model.text
    }
    parent.comments.push(c);
}
md.tab = function (model, ctx, parent) {
    var ret = createGroup('tab', model.wzName, model.name);
    ret.htmlId = parent.htmlId ? parent.htmlId + '_' + ret.id : ret.id;
    ret.panesParentHtmlId = parent.htmlId;
    parent.items.push(ret);
    md.genItems(model, ctx, ret);
    _setDefaultPane(ret.items);
}
md.pane = function (model, ctx, parent) {
    if (['tab', 'accordion'].indexOf(parent.$kind) < 0) transformationError('Invalid parent for a pane. Should be tab or accordion.', model);
    var ret = createGroup('pane', model.wzName, model.name);
    ret.htmlId = parent.panesParentHtmlId ? parent.panesParentHtmlId + '_' + ret.id : ret.id;
    ret.heading_htmlId = ret.htmlId + '_heading';
    ret.label = model.label;
    if (model.data_kind === 'object') {
        ret.valueIsObject = true;
    } else if (model.data_kind === 'array') {
        ret.valueIsArray = true;
    }
    if (model.isPaneDefault) { ret.isPaneDefault = true; }
    parent.items.push(ret);
    md.genItems(model, ctx, ret);
}
md.accordion = function (model, ctx, parent) {
    var ret = createGroup('accordion', model.wzName, model.name);
    ret.htmlId = parent.htmlId ? parent.htmlId + '_' + ret.id : ret.id;
    ret.panesParentHtmlId = parent.htmlId;
    parent.items.push(ret);
    md.genItems(model, ctx, ret);
    _setDefaultPane(ret.items);
}
md.panel = function (model, ctx, parent) {
    var ret = createGroup('panel', model.wzName, model.name);
    ret.htmlId = parent.htmlId ? parent.htmlId + '_' + ret.id : ret.id;
    ret.label = model.label;
    if (model.data_kind === 'object') {
        ret.valueIsObject = true;
    } else if (model.data_kind === 'array') {
        ret.valueIsArray = true;
    }
    parent.items.push(ret);
    md.genItems(model, ctx, ret);
}
md.control = function (model, ctx, parent) {
    var c = createControl(model.wzName, model.name);
    md._setWidget(c, model, ctx, parent);
    parent.items.push(c);
    md.genItems(model, ctx, c);
    if (c.choices && c.choices.length > 0)
    {
        c.isChoice = true;
        var seenDefault = false;
        c.choices.forEach(function (item) {
            if (item.isChoiceDefault) seenDefault = true;
        });
        if (!seenDefault) c.choices[0].isChoiceDefault = true;
    }
}
md.itemcontrol = function (model, ctx, parent) {
    parent.isItemArray = true;
    var c = createControl(model.wzName, model.name);
    md._setWidget(c, model, ctx, parent);
    parent.itemControl = c;
    md.genItems(model, ctx, c);
}
md.choice = function (model, ctx, parent) {
    if (parent.$kind !== 'control') transformationError('Invalid parent for a choice. Should be a control.', model);
    if (!parent.choices) { parent.choices = []; }
    var choice = createChoice(model.wzName, model.name);
    if (model.isChoiceDefault) choice.isChoiceDefault = true;
    md._setWidget(choice, model, ctx, parent);
    parent.choices.push(choice);
    md.genItems(model, ctx, choice);
}
md.validation = function (model, ctx, parent) {
    if (!parent.validations) { parent.validations = []; }
    var vld = createItem(model.wzName);
    parent.validations.push(vld);
}
md.source = function (model, ctx, parent) {
    if (parent.$kind !== 'control') transformationError('Invalid parent for a source. Should be a control.', model);
    if (parent.source) { transformationError('Duplicated source entry. Not allowed.', model); }
    var source = parent.source = createSource(model.wzName);
    md.genItems(model, ctx, source);
}
md.options = function (model, ctx, parent) {
    if (parent.$kind !== 'control') transformationError('Invalid parent for options. Should be a control.', model);
    if (parent.options) { transformationError('Duplicated options entry. Not allowed.', model); }
    var options = parent.options = createOptions(parent.kind);
    md.genItems(model, ctx, options);
}
md.jsArray = function (model, ctx, parent) {
    if (parent.$kind === 'source') {
        md.genItems(model, ctx, parent);
    } else {
        transformationError('Invalid parent for an array. Not allowed.', model);
    }
}
md.jsProperty = function (model, ctx, parent) {
    console.log(parent.$kind);
    if (parent.$kind === 'mask') {
        _setmaskproperty(parent, model);
    } else if (parent.$kind === 'options') {
        _setOptions(parent, model);
    } else if (parent.$kind === 'source') {
        parent.items.push(model.wzName);
    } else {
        transformationError('jsProperty not allowed on parent $kind ' + parent.$kind, model);
    }
}
md.mask = function (model, ctx, parent) {
    if (parent.$kind !== 'control') transformationError('Invalid parent for a mask. Should be a control.', model);
    if (typeof parent.mask !== 'undefined') transformationError('Parent already has a mask. Cannot define twice.', model);
    var mask = createMask(model.wzName);
    md.genItems(model, ctx, mask);
    parent.mask = mask;
}
md._setWidget = function (c, model, ctx, parent) {
    c.htmlId = parent.htmlId ? parent.htmlId + '_' + c.id : c.id;
    c.kind = model.kind;
    c.size = model.size || parent.size;
    c.label = model.label || c.name;
    c.description = model.description || '';
    if (typeof model.format !== 'undefined') c.format = model.format;
    if (c.kind === 'choice') c.isChoice = true;
    c.datatype = model.datatype || util.datatypeFromKind(c.kind, c);
    if (c.datatype.substr(-2, 2) === '[]') {
        c.datatype = c.datatype.substr(0, c.datatype.length - 2);
        c.isArray = true;
    }
    if (typeof model.default !== 'undefined') c.default = util.objectify(c.datatype, model.default, c);
}
function createItem(name) {
    return { name: name, comments: [] };
}
function createGroup(kind, id, name) {
    return {
        $kind: kind,
        isGroup: true,
        id: id,
        name: name || id,
        comments: [],
        items: []
    }
}
function createControl(id, name, model, parent) {
    return {
        $kind: 'control',
        id: id,
        name: name || id,
        comments: [],
        validators: []
    }
}
function createChoice(id, name) {
    return {
        $kind: 'choice',
        id: id,
        name: name || id,
        comments: [],
        validators: []
    }
}
function createSource(name) {
    return {
        $kind: 'source',
        id: name,
        items: [],
        comments: []
    }
}
function createOptions(parentKind) {
    return {
        $kind: 'options',
        parentKind: parentKind,
        items: {},
        comments: []
    }
}
function createMask(name) {
    return {
        $kind: 'mask',
        format: name,
        translations: [],
        comments: []
    }
}
function _setDefaultPane(items) {
    if (items.length > 0) {
        var seenDefault = false;
        items.forEach(function (item) {
            if (item.isPaneDefault) seenDefault = true;
        });
        if (!seenDefault) {
            items[0].isPaneDefault = true;
        }
    }
}
function _setmaskproperty(mask, model) {
    var p = _property(model.wzName, model);
    if (p.name === 'reverse') mask.reverse = true;
    else if (p.name === 'clearifnotmatch') mask.clearifnotmatch = true;
    else if (p.name === 'selectonfocus') mask.selectonfocus = true;
    else if (p.name === 'trans') {
        var ptrans = _property(p.value, model);
        mask.translations.push({ letter: ptrans.name, regex: ptrans.value });
    } else {
        transformationError('Unknown option for a mask: ' + p.name, model);
    }
}
function _setOptions(parent, model) {
    var p = _property(model.wzName, model);
    if (parent.parentKind === 'bootstrap-slider') {
        if (['min', 'max', 'step'].indexOf(p.name) >= 0) {
            parent.items[p.name] = parseInt(p.value, 10);
        } else if (['scale'].indexOf(p.name) >= 0) {
            parent.items[p.name] = p.value;
        } else {
            transformationError('Unknown option for a bootstrap-slider: ' + p.name, model);
        }
    } else if (parent.parentKind === 'ace') {
        if (['width', 'height'].indexOf(p.name) >= 0) {
            parent.items[p.name] = parseInt(p.value, 10);
        } else if (['mode'].indexOf(p.name) >= 0) {
            parent.items[p.name] = p.value;
        } else {
            transformationError('Unknown option for an ace editor: ' + p.name, model);
        }
    } else if (parent.parentKind === 'codemirror') {
        if (['width', 'height'].indexOf(p.name) >= 0) {
            parent.items[p.name] = parseInt(p.value, 10);
        } else if (['mode'].indexOf(p.name) >= 0) {
            parent.items[p.name] = p.value;
        } else {
            transformationError('Unknown option for an ace editor: ' + p.name, model);
        }
    } else {
        transformationError('Unknown option ' + p.name + ' for control.kind ' + parent.parentKind);
    }
}
function _property(s, node) {
    var p = lineParser.parseNameValue(s, node);
    return { name: p.name(), value: p.value() };
}
function transformationError(msg, model) {
    var error = new wizzi.errors.ModelTransformationError(msg, 'form/jsonizer', model);
    wizzi.fail.warn(error);
    throw error;
}

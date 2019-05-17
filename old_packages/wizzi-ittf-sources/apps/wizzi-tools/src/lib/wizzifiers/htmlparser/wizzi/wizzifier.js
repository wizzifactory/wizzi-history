var util = require('util');
var htmlparser = require('./parser');
var verify = require('../../../util/verify');
var file = require('../../../util/file');
var lineparser = require('../../../util/lineparser'); 
var cloner = require('./cloner');
var ittfwriter = require("../../../util/ittfwriter");

var verbose = false;

function log(label, obj) {
    if (verbose) console.log(label, util.inspect(obj, { depth: 1 }));
}

function parse(html, dummy, options) {
    options = options || {};
    var wizziTree = {
        children: []
    };
    var parser = new htmlparser.Parser({
        onopentag: function (tagname, attribs) {
            log("OpenTag " + tagname, attribs);
            var n = {
                tag: tagname,
                name: '',
                attribs: attribs,
                children: []
            };
            n.parent = wizziTree;
            wizziTree.children.push(n);
            wizziTree = n;
        },
        ontext: function (text) {
            log("Text", text.trim().substr(0, 10));
            var lines = file.splitLines(text.trim());
            if (wizziTree.swig) {
                console.log('++++++++++ wizziTree.swig')
                lines.forEach(function (l) {
                    var n = {
                        tag: '+',
                        name: l,
                        attribs: {},
                        children: []
                    };
                    wizziTree.children.push(n);
                });
            } else if (lines.length == 1) {
                if (wizziTree.children.length > 0) {
                    var n = {
                        tag: '+',
                        name: lines[0],
                        attribs: {},
                        children: []
                    };
                    wizziTree.children.push(n);
                } else {
                    wizziTree.name += lines[0];
                }
            }
            else {
                if (['script', 'style'].indexOf(wizziTree.tag) >= 0) {
                    var n = {
                        tag: '$.',
                        name: '',
                        attribs: {},
                        children: [],
                        lines: []
                    };
                    wizziTree.children.push(n);
                    lines.forEach(function (l) {
                        n.lines.push(l.trim());
                    });
                } else {
                    lines.forEach(function (l) {
                        var n = {
                            tag: '++',
                            name: l.trim(),
                            attribs: {},
                            children: []
                        };
                        wizziTree.children.push(n);
                    });
                }
            }
        },
        onclosetag: function (tagname) {
            // log("CloseTag", tagname);
            if (wizziTree.parent != null) {
                wizziTree = wizziTree.parent;
            } else {
                console.log("WARNING overclose ", tagname)
            }
        },
        onswig: function (text) {
            var p = lineparser.parseNameValue(text, {}),
                tag = p.name().trim(),
                text = p.value();
            log("OpenSwig " + tag, text);
            if (['for', 'if', 'block', 'autoescape', 'filter', 'macro', 'spaceless', 'raw'].indexOf(tag) >= 0) {
                var n = {
                    tag: tag,
                    name: text,
                    attribs: {},
                    children: [],
                    lines: [],
                    swig: true
                };
                n.parent = wizziTree;
                wizziTree.children.push(n);
                wizziTree = n;
            } else if (['endfor', 'endif', 'endblock', 'endautoescape', 'endfilter', 'endmacro', 'endspaceless', 'endraw'].indexOf(tag) >= 0) {
                if (wizziTree.parent != null) {
                    wizziTree = wizziTree.parent;
                } else {
                    console.log("WARNING overclose ", tagname)
                }
            } else if (['extends', 'include', 'import', 'parent', 'set'].indexOf(tag) >= 0) {
                var n = {
                    tag: tag,
                    name: text,
                    attribs: {},
                    children: [],
                    lines: [],
                    swig: true
                };
                wizziTree.children.push(n);
            } else if (['else', 'elif', 'elseif'].indexOf(tag) >= 0) {
                if (wizziTree.parent != null) {
                    wizziTree = wizziTree.parent;
                } else {
                    console.log("WARNING overclose ", tagname)
                }
                var n = {
                    tag: tag,
                    name: text,
                    attribs: {},
                    children: [],
                    lines: [],
                    swig: true
                };
                n.parent = wizziTree;
                wizziTree.children.push(n);
                wizziTree = n;
            } else {
                throw new Error('Html.Wizzifier. Wizzi parse onswig unknown tag: ' + tag);
            }
        }
    });
    parser.write(html);
    parser.end();
    var synthax;
    if (wizziTree.children.length > 1 && typeof(options.embedTag) === 'string') {
        synthax = {
            tag: options.embedTag,
            name: '',
            attribs: {},
            children: []
        };
        wizziTree.children.forEach(function (item) {
            synthax.children.push(item);
        });
    } else {
        synthax = wizziTree.children[0];
    }
    if (!synthax) {
        throw new Error('Html.Wizzifier.Wizzi parse failed. wizziTree: ' + util.inspect(wizziTree, { depth: 2}));
    }
    return synthax;
}

var md = module.exports = {};

md.parse = function (input) {
    return parse(input);
};

md.getWizziTree = function (input, options) {
    options = options || {};
    if (typeof options.verbose !== 'undefined') {
        verbose = options.verbose;
    }
    var startTime = Date.now();
    // for this, syntax is wizziTree
    var syntax = parse(input, true, options);
    if (!syntax) {
        throw new Error('Html.Wizzifier.Wizzi parse failed.');
    }
    syntax = cloner(syntax);
    if (!syntax) {
        throw new Error('Html.Wizzifier.Wizzi cloner(synthax) failed.');
    }
    console.log('Parsed in ' + (Date.now() - startTime) + ' ms');
    if (options.dumpfile) {
        file.write(options.dumpfile, JSON.stringify(syntax, null, 2));
    }
    // for this, syntax is wizziTree
    return syntax;
};

md.getWizziIttf = function (input, options, cb) {
    try {
        var node = md.getWizziTree(input, options);
        cb(null, ittfwriter.stringify(node, { lang: 'html' }));
    } catch (ex) {
        cb({ message: ex.message, stack: ex.stack });
    }
};




var util = require('util');
var file = require('../util/file');
var log = require('../util/log')(module);
var md = module.exports = {};
md.toIttf = function (filepath, model, toconsole) {
    if (toconsole) {
        console.log('_toIttf', 'model dump');
        console.log('_toIttf', '    loadContext');
        md._loadContext_toIttf(null, "        ", model.loadContext, toconsole);
        console.log('_toIttf', '    nodes');
        md._toIttf(null, '        ', model.nodes[0]);
        return;
    }
    file.openWrite(filepath, function (err, stream) {
        if (err) throw err;
        md._toIttf(stream, '', model.nodes[0]);
        stream.end();
    });
}
md._loadContext_toIttf = function (w, indent, loadContext, toconsole) {
    if (toconsole) {
        console.log('_toIttf', indent + 'sources');
        indent += '    ';
        for (var sk in loadContext.sources) {
            console.log('_toIttf', indent + 'source ' + sk);
            var src = loadContext.sources[sk];
            if (src.model && src.model.$args) {
                console.log('_toIttf', indent + '    $args ' + src.model.$args);
            }
            if (src.model && src.model.$params) {
                console.log('_toIttf', indent + '    $params ' + src.model.$params);
            }
        }
        return;
    }
}
md._toIttf = function (w, indent, node) {
    console.log('_toIttf', indent + node.name + " " + node.value + ' ' + node.model.sourceKey + ' ' + node.model.modelKey);
    if (node.$args) {
        console.log('_toIttf', indent + "$args " + node.$args + '(' + node.$mixer + ')');
    }
    if (node.$params) {
        console.log('_toIttf', indent + "$params " + node.$params);
    }
    if (w) {
        w.write(indent + node.name + " " + node.value);
    }
    node.childs.forEach(function (child) {
        md._toIttf(w, indent + '    ', child);
    });
}

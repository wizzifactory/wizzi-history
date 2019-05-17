/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: C:\My\wizzi\v2\packages\wizzi-2\lib\artifacts\wizzischema\test\gen\ittf\wizzischema-test.js.ittf
    utc time: Tue, 11 Jul 2017 15:59:30 GMT
*/
'use strict';
var util = require('util');
var path = require('path');

var wizzi = require('wizzi-core').wizzi;

var stringify = require('json-stringify-safe');
var file = wizzi.file;
var ittf = wizzi.ittf;
var cssWizziModel = require('../../models/css-model.g');
var ittfContext = {
    s1: 'alpha', 
    s2: 'beta', 
    a1: ['gamma 1', 'gamma 2', 'gamma 3'], 
    a2: ['omega 10', 'omega 20', 'omega 30']
};
var filepath = path.join(__dirname, 'ittf', 'test.css.ittf');
ittf.loadModel(filepath, ittfContext, function(err,ittfModel) {
    if (err) {
        throw new Error(err);
    }
    var rootNode = ittfModel.nodes[0];
    var cssmodelType = cssWizziModel[rootNode.n];
    if (!cssmodelType) {
        var maptag = cssWizziModel.__tagElementMapping[rootNode.n];
        if (typeof maptag === 'string') {
            cssmodelType = cssWizziModel[maptag];
        }
        if (!cssmodelType) {
            throw new Error('Cannot map root node ' + rootNode.n + ' to any entity of schema + css, filepath: ' + filepath);
        }
    }
    var cssmodel = new cssmodelType(rootNode.v);
    cssmodel.loadContext = ittfModel.loadContext;
    try {
        cssmodel.loadFromNode(rootNode);
    } catch (ex) {
        throw new Error('Error loading wmt model for css model ' + filepath + '.\n' + ex.message + '\n' + ex.stack);
    }
    var ctx = new cssWizziModel.cssContext();
    cssmodel.wzInitialize(ctx);
    cssmodel.wzVerify(ctx);
    var filepathdump = path.join(__dirname, 'ittf', 'test.css.ittf.dump.json');
    var filepathdumpxml = path.join(__dirname, 'ittf', 'test.css.ittf.dump.xml');
    var filepathdumpprettify = path.join(__dirname, 'ittf', 'test.css.ittf.dump.prettify.html');
    if (cssmodel.toJson) {
        // Export to json for test
        // console.log('cssmodel.toJson', util.inspect(cssmodel.toJson(), { depth: null }));
        file.write(filepathdump, stringify(cssmodel.toJson(), null, 2)
        );
    }
    else {
        // Dump moduel using json-stringify-safe
        file.write(filepathdump, stringify(cssmodel, null, 2)
        );
    }
});


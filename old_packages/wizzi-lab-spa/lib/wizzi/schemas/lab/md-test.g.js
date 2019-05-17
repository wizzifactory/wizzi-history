/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: C:\My\wizzi\v2\packages\wizzi-lab-spa\node_modules\wizzi\lib\artifacts\wizzischema\test\gen\ittf\wizzischema-test.js.ittf
    utc time: Tue, 11 Jul 2017 19:51:57 GMT
*/
'use strict';
var util = require('util');
var path = require('path');

var wizzi = require('wizzi-core').wizzi;

var stringify = require('json-stringify-safe');
var file = wizzi.file;
var ittf = wizzi.ittf;
var mdWizziModel = require('../../models/md-model.g');
var ittfContext = {
    s1: 'alpha', 
    s2: 'beta', 
    a1: ['gamma 1', 'gamma 2', 'gamma 3'], 
    a2: ['omega 10', 'omega 20', 'omega 30']
};
var filepath = path.join(__dirname, 'ittf', 'test.md.ittf');
ittf.loadModel(filepath, ittfContext, function(err,ittfModel) {
    if (err) {
        throw new Error(err);
    }
    var rootNode = ittfModel.nodes[0];
    var mdmodelType = mdWizziModel[rootNode.n];
    if (!mdmodelType) {
        var maptag = mdWizziModel.__tagElementMapping[rootNode.n];
        if (typeof maptag === 'string') {
            mdmodelType = mdWizziModel[maptag];
        }
        if (!mdmodelType) {
            throw new Error('Cannot map root node ' + rootNode.n + ' to any entity of schema + md, filepath: ' + filepath);
        }
    }
    var mdmodel = new mdmodelType(rootNode.v);
    mdmodel.loadContext = ittfModel.loadContext;
    try {
        mdmodel.loadFromNode(rootNode);
    } catch (ex) {
        throw new Error('Error loading wmt model for md model ' + filepath + '.\n' + ex.message + '\n' + ex.stack);
    }
    var ctx = new mdWizziModel.mdContext();
    mdmodel.wzInitialize(ctx);
    mdmodel.wzVerify(ctx);
    var filepathdump = path.join(__dirname, 'ittf', 'test.md.ittf.dump.json');
    var filepathdumpxml = path.join(__dirname, 'ittf', 'test.md.ittf.dump.xml');
    var filepathdumpprettify = path.join(__dirname, 'ittf', 'test.md.ittf.dump.prettify.html');
    if (mdmodel.toJson) {
        // Export to json for test
        // console.log('mdmodel.toJson', util.inspect(mdmodel.toJson(), { depth: null }));
        file.write(filepathdump, stringify(mdmodel.toJson(), null, 2)
        );
    }
    else {
        // Dump moduel using json-stringify-safe
        file.write(filepathdump, stringify(mdmodel, null, 2)
        );
    }
});


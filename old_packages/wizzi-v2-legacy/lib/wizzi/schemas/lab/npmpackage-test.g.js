/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: C:\My\wizzi\v2\packages\wizzi\lib\artifacts\wizzischema\test\gen\ittf\wizzischema-test.js.ittf
    utc time: Tue, 11 Jul 2017 18:43:48 GMT
*/
'use strict';
var util = require('util');
var path = require('path');

var wizzi = require('wizzi-core').wizzi;

var stringify = require('json-stringify-safe');
var file = wizzi.file;
var ittf = wizzi.ittf;
var npmpackageWizziModel = require('../../models/npmpackage-model.g');
var ittfContext = {
    s1: 'alpha', 
    s2: 'beta', 
    a1: ['gamma 1', 'gamma 2', 'gamma 3'], 
    a2: ['omega 10', 'omega 20', 'omega 30']
};
var filepath = path.join(__dirname, 'ittf', 'test.npmpackage.ittf');
ittf.loadModel(filepath, ittfContext, function(err,ittfModel) {
    if (err) {
        throw new Error(err);
    }
    var rootNode = ittfModel.nodes[0];
    var xpackagemodelType = npmpackageWizziModel[rootNode.n];
    if (!xpackagemodelType) {
        var maptag = npmpackageWizziModel.__tagElementMapping[rootNode.n];
        if (typeof maptag === 'string') {
            xpackagemodelType = npmpackageWizziModel[maptag];
        }
        if (!xpackagemodelType) {
            throw new Error('Cannot map root node ' + rootNode.n + ' to any entity of schema + npmpackage, filepath: ' + filepath);
        }
    }
    var xpackagemodel = new xpackagemodelType(rootNode.v);
    xpackagemodel.loadContext = ittfModel.loadContext;
    try {
        xpackagemodel.loadFromNode(rootNode);
    } catch (ex) {
        throw new Error('Error loading wmt model for npmpackage model ' + filepath + '.\n' + ex.message + '\n' + ex.stack);
    }
    var ctx = new npmpackageWizziModel.npmpackageContext();
    xpackagemodel.wzInitialize(ctx);
    xpackagemodel.wzVerify(ctx);
    var filepathdump = path.join(__dirname, 'ittf', 'test.npmpackage.ittf.dump.json');
    var filepathdumpxml = path.join(__dirname, 'ittf', 'test.npmpackage.ittf.dump.xml');
    var filepathdumpprettify = path.join(__dirname, 'ittf', 'test.npmpackage.ittf.dump.prettify.html');
    if (xpackagemodel.toJson) {
        // Export to json for test
        // console.log('xpackagemodel.toJson', util.inspect(xpackagemodel.toJson(), { depth: null }));
        file.write(filepathdump, stringify(xpackagemodel.toJson(), null, 2)
        );
    }
    else {
        // Dump moduel using json-stringify-safe
        file.write(filepathdump, stringify(xpackagemodel, null, 2)
        );
    }
});


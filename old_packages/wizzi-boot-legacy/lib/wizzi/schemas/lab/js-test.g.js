// generator: /wizzi-labs/wizzi-lab-site/ittf/lib/artifacts/js/module/gen/main.js, utc time: Thu, 23 Mar 2017 19:48:51 GMT
'use strict';
var util = require('util');
var path = require('path');

var wizzi = require('wizzi-core').wizzi;

var stringify = require('json-stringify-safe');
var file = wizzi.file;
var ittf = wizzi.ittf;
var jsWizziModel = require('../../models/js-model.g');
var ittfContext = {
    s1: 'alpha', 
    s2: 'beta', 
    a1: ['gamma 1', 'gamma 2', 'gamma 3'], 
    a2: ['omega 10', 'omega 20', 'omega 30']
};
var filepath = path.join(__dirname, 'ittf', 'test.js.ittf');
ittf.loadModel(filepath, ittfContext, function(err,ittfModel) {
    if (err) {
        throw new Error(err);
    }
    var rootNode = ittfModel.nodes[0];
    var modulemodelType = jsWizziModel[rootNode.n];
    if (!modulemodelType) {
        var maptag = jsWizziModel.__tagElementMapping[rootNode.n];
        if (typeof maptag === 'string') {
            modulemodelType = jsWizziModel[maptag];
        }
        if (!modulemodelType) {
            throw new Error('Cannot map root node ' + rootNode.n + ' to any entity of schema + js, filepath: ' + filepath);
        }
    }
    var modulemodel = new modulemodelType(rootNode.v);
    modulemodel.loadContext = ittfModel.loadContext;
    try {
        modulemodel.loadFromNode(rootNode);
    } catch (ex) {
        throw new Error('Error loading wmt model for js model ' + filepath + '.\n' + ex.message + '\n' + ex.stack);
    }
    var ctx = new jsWizziModel.jsContext();
    modulemodel.wzInitialize(ctx);
    modulemodel.wzVerify(ctx);
    var filepathdump = path.join(__dirname, 'ittf', 'test.js.ittf.dump.json');
    var filepathdumpxml = path.join(__dirname, 'ittf', 'test.js.ittf.dump.xml');
    var filepathdumpprettify = path.join(__dirname, 'ittf', 'test.js.ittf.dump.prettify.html');
    if (modulemodel.toJson) {
        // Export to json for test
        // console.log('modulemodel.toJson', util.inspect(modulemodel.toJson(), { depth: null }));
        file.write(filepathdump, stringify(modulemodel.toJson(), null, 2)
        );
    }
    else {
        // Dump moduel using json-stringify-safe
        file.write(filepathdump, stringify(modulemodel, null, 2)
        );
    }
});


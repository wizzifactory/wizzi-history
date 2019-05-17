// generator: /wizzi-labs/wizzi-lab-site/ittf/lib/artifacts/js/module/gen/main.js, utc time: Thu, 23 Mar 2017 19:48:50 GMT
'use strict';
var util = require('util');
var path = require('path');

var wizzi = require('wizzi-core').wizzi;

var stringify = require('json-stringify-safe');
var file = wizzi.file;
var ittf = wizzi.ittf;
var wfjobWizziModel = require('../../models/wfjob-model.g');
var ittfContext = {
    s1: 'alpha', 
    s2: 'beta', 
    a1: ['gamma 1', 'gamma 2', 'gamma 3'], 
    a2: ['omega 10', 'omega 20', 'omega 30']
};
var filepath = path.join(__dirname, 'ittf', 'test.wfjob.ittf');
ittf.loadModel(filepath, ittfContext, function(err,ittfModel) {
    if (err) {
        throw new Error(err);
    }
    var rootNode = ittfModel.nodes[0];
    var wfjobmodelType = wfjobWizziModel[rootNode.n];
    if (!wfjobmodelType) {
        var maptag = wfjobWizziModel.__tagElementMapping[rootNode.n];
        if (typeof maptag === 'string') {
            wfjobmodelType = wfjobWizziModel[maptag];
        }
        if (!wfjobmodelType) {
            throw new Error('Cannot map root node ' + rootNode.n + ' to any entity of schema + wfjob, filepath: ' + filepath);
        }
    }
    var wfjobmodel = new wfjobmodelType(rootNode.v);
    wfjobmodel.loadContext = ittfModel.loadContext;
    try {
        wfjobmodel.loadFromNode(rootNode);
    } catch (ex) {
        throw new Error('Error loading wmt model for wfjob model ' + filepath + '.\n' + ex.message + '\n' + ex.stack);
    }
    var ctx = new wfjobWizziModel.wfjobContext();
    wfjobmodel.wzInitialize(ctx);
    wfjobmodel.wzVerify(ctx);
    var filepathdump = path.join(__dirname, 'ittf', 'test.wfjob.ittf.dump.json');
    var filepathdumpxml = path.join(__dirname, 'ittf', 'test.wfjob.ittf.dump.xml');
    var filepathdumpprettify = path.join(__dirname, 'ittf', 'test.wfjob.ittf.dump.prettify.html');
    if (wfjobmodel.toJson) {
        // Export to json for test
        // console.log('wfjobmodel.toJson', util.inspect(wfjobmodel.toJson(), { depth: null }));
        file.write(filepathdump, stringify(wfjobmodel.toJson(), null, 2)
        );
    }
    else {
        // Dump moduel using json-stringify-safe
        file.write(filepathdump, stringify(wfjobmodel, null, 2)
        );
    }
});


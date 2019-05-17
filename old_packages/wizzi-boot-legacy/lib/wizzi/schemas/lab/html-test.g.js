// generator: /wizzi-labs/wizzi-lab-site/ittf/lib/artifacts/js/module/gen/main.js, utc time: Thu, 23 Mar 2017 19:48:52 GMT
'use strict';
var util = require('util');
var path = require('path');

var wizzi = require('wizzi-core').wizzi;

var stringify = require('json-stringify-safe');
var file = wizzi.file;
var ittf = wizzi.ittf;
var htmlWizziModel = require('../../models/html-model.g');
var ittfContext = {
    s1: 'alpha', 
    s2: 'beta', 
    a1: ['gamma 1', 'gamma 2', 'gamma 3'], 
    a2: ['omega 10', 'omega 20', 'omega 30']
};
var filepath = path.join(__dirname, 'ittf', 'test.html.ittf');
ittf.loadModel(filepath, ittfContext, function(err,ittfModel) {
    if (err) {
        throw new Error(err);
    }
    var rootNode = ittfModel.nodes[0];
    var htmlmodelType = htmlWizziModel[rootNode.n];
    if (!htmlmodelType) {
        var maptag = htmlWizziModel.__tagElementMapping[rootNode.n];
        if (typeof maptag === 'string') {
            htmlmodelType = htmlWizziModel[maptag];
        }
        if (!htmlmodelType) {
            throw new Error('Cannot map root node ' + rootNode.n + ' to any entity of schema + html, filepath: ' + filepath);
        }
    }
    var htmlmodel = new htmlmodelType(rootNode.v);
    htmlmodel.loadContext = ittfModel.loadContext;
    try {
        htmlmodel.loadFromNode(rootNode);
    } catch (ex) {
        throw new Error('Error loading wmt model for html model ' + filepath + '.\n' + ex.message + '\n' + ex.stack);
    }
    var ctx = new htmlWizziModel.htmlContext();
    htmlmodel.wzInitialize(ctx);
    htmlmodel.wzVerify(ctx);
    var filepathdump = path.join(__dirname, 'ittf', 'test.html.ittf.dump.json');
    var filepathdumpxml = path.join(__dirname, 'ittf', 'test.html.ittf.dump.xml');
    var filepathdumpprettify = path.join(__dirname, 'ittf', 'test.html.ittf.dump.prettify.html');
    if (htmlmodel.toJson) {
        // Export to json for test
        // console.log('htmlmodel.toJson', util.inspect(htmlmodel.toJson(), { depth: null }));
        file.write(filepathdump, stringify(htmlmodel.toJson(), null, 2)
        );
    }
    else {
        // Dump moduel using json-stringify-safe
        file.write(filepathdump, stringify(htmlmodel, null, 2)
        );
    }
});


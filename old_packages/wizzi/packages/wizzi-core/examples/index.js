/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\plugins\wizzi-core\src\ittf\examples\index.js.ittf
*/
'use strict';
/** -àà
     Examples: 
    
*/
var path = require('path');
var fs = require('fs');
var stringify = require('json-stringify-safe');
var wizziUtils = require('wizzi-utils');
var mocks = wizziUtils.mocks;
var mtree = require('wizzi-mtree');
/** -àà
    var mocks = require('../tests/mocks');
*/
var basicLoader = mocks.basicLoader;
var genContext = mocks.genContext;
var file = wizziUtils.file;
var verify = wizziUtils.verify;
var wfjobfactory = require('../lib/wizzi/models/wfjob-factory.g');
var wfschemafactory = require('../lib/wizzi/models/wfschema-factory.g');
var jsonfactory = require('../lib/wizzi/models/json-factory.g');
var xmlfactory = require('../lib/wizzi/models/xml-factory.g');
var textfactory = require('../lib/wizzi/models/text-factory.g');
var ittffactory = require('../lib/wizzi/models/ittf-factory.g');
var trans_ittf_htmlpretty = require('../lib/artifacts/ittf/html-pretty/trans/main');
function executeExample() {
    
    executeFiles(wfjobfactory.createLoadModel(mocks.getFactoryWizziObject()), 'wfjob');
    
    executeFiles(wfschemafactory.createLoadModel(mocks.getFactoryWizziObject()), 'wfschema');
    
    executeFiles(jsonfactory.createLoadModel(mocks.getFactoryWizziObject()), 'json');
    
    executeFiles(xmlfactory.createLoadModel(mocks.getFactoryWizziObject()), 'xml');
    
    executeFiles(textfactory.createLoadModel(mocks.getFactoryWizziObject()), 'text');
    
    executeFiles(ittffactory.createLoadModel(mocks.getFactoryWizziObject()), 'ittf');
    
    function executeFiles(loadModel, schema) {
        var suffix = schema === 'ittf' ? '.ittf' : '.' + schema + '.ittf';
        var ittfPath = path.join(__dirname, 'ittf', schema + 's');
        var i, i_items=getFiles(ittfPath,schema), i_len=getFiles(ittfPath,schema).length, item;
        for (i=0; i<i_len; i++) {
            item = getFiles(ittfPath,schema)[i];
            item = item.substring(0, item.length - suffix.length);
            // log 'wizzi-core.examples.index.item', item, 'schema', schema
            execute(loadModel, item, schema);
        }
    }
    
    function execute(loadModel, name, schema) {
        var ittfSource = path.join(__dirname, 'ittf', schema + 's', schema === 'ittf' ? name + '.ittf' : name + '.' + schema + '.ittf');
        var jsOutput = path.join(__dirname, 'outputs', schema + 's', name + '.g.' + schema);
        // log 'wizzi-core.examples.index.before-load ittfSource', ittfSource, 'schema', schema
        loadModel(ittfSource, getContext(), function(err, jsWizziModel) {
            if (err) {
                console.log('err', err);
                throw new Error(err.message);
            }
            // log 'wizzi-core.examples.index.loaded ittfSource', ittfSource, 'schema', schema
            // log 'jsWizziModel', jsWizziModel
            if (jsWizziModel.toJson) {
                file.write(jsOutput, stringify(jsWizziModel.toJson(), null, 4));
            }
            else {
                file.write(jsOutput, stringify(jsWizziModel, null, 4));
            }
            if (schema === 'ittf') {
                trans_ittf_htmlpretty.trans(jsWizziModel, {}, function(err, transformedModel) {
                    if (err) {
                        console.log('err', err);
                        throw new Error(err.message);
                    }
                    file.write(path.join(__dirname, 'outputs', schema + 's', name + '.pretty.' + schema + '.html'), stringify(transformedModel, null, 4));
                });
            }
        });
    }
}
function getFiles(srcpath, schema) {
    return fs.readdirSync(srcpath).filter((file) => {
            return fs.lstatSync(path.join(srcpath, file)).isFile() && verify.endsWith(file, schema === 'ittf' ? '.ittf' : '.' + schema + '.ittf');
        })
    ;
}
function getContext(obj) {
    return Object.assign({}, {
            __productionManager: {
                globalContext: function() {
                    return {};
                }
            }
        }, obj);
}
function getWizziObject() {
    return {
            loadMTree: mtree.createLoadMTree(mocks.repo.getCreateFilesystemStore(), {
                useCache: false
            }), 
            file: wizziUtils.file, 
            verify: wizziUtils.verify, 
            errors: mocks.errors
        };
}
function getLoadModelContext(mTreeBuildUpContext) {
    return mocks.getLoadModelContext(mTreeBuildUpContext);
}
module.exports = executeExample;
if (require.main === module) {
    executeExample();
}

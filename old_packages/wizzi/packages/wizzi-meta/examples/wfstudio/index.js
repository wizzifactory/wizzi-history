/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\plugins\wizzi-meta\src\ittf\examples\wfstudio\index.js.ittf
*/
'use strict';
/** -àà
     Examples: wfstudio
    
*/
var path = require('path');
var fs = require('fs');
var stringify = require('json-stringify-safe');
var wizziUtils = require('wizzi-utils');
var mocks = wizziUtils.mocks;
var mtree = require('wizzi-mtree');
/** -àà
    var mocks = require('../../tests/mocks');
*/
var basicLoader = mocks.basicLoader;
var genContext = mocks.genContext;
var file = wizziUtils.file;
var verify = wizziUtils.verify;
var wfstudiofactory = require('../../lib/wizzi/models/wfstudio-factory.g');
function executeExample() {
    
    var loadModel = wfstudiofactory.createLoadModel(getWizziObject());
    
    var ittfPath = path.join(__dirname, 'ittf');
    var i, i_items=getFiles(ittfPath,'wfstudio'), i_len=getFiles(ittfPath,'wfstudio').length, item;
    for (i=0; i<i_len; i++) {
        item = getFiles(ittfPath,'wfstudio')[i];
        item = item.substring(0, item.length - '.wfstudio.ittf'.length);
        console.log('item', item);
        execute(item);
    }
    
    function execute(name) {
        var ittfSource = path.join(__dirname, 'ittf', name + '.wfstudio.ittf');
        var wfstudioOutput = path.join(__dirname, 'ittf', name + '.g.wfstudio');
        loadModel(ittfSource, {
            __productionManager: mocks.getProductionManager()
        }, function(err, wfstudioWizziModel) {
            if (err) {
                console.log('err', err);
                throw new Error(err.message);
            }
            console.log('wfstudioWizziModel', wfstudioWizziModel);
            file.write(wfstudioOutput, stringify(wfstudioWizziModel.toJson(), null, 2));
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

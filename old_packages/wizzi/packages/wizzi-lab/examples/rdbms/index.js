/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\plugins\wizzi-lab\src\ittf\examples\rdbms\index.js.ittf
    utc time: Sat, 22 Sep 2018 10:57:57 GMT
*/
'use strict';
var path = require('path');
var fs = require('fs');
var wizzi = null;
var wizziUtils = require('wizzi-utils');
var verify = wizziUtils.verify;
var file = wizziUtils.file;
var mocks = wizziUtils.mocks;
var mtree = require('wizzi-mtree');
var errors = wizziUtils.exampleErrors;
var stringify = require('json-stringify-safe');
var rdbmsfactory = require('../../lib/wizzi/models/rdbms-factory.g');
var rdbmshtml_docs = require('../../lib/artifacts/rdbms/html_docs/gen/main');
var rdbmsjsoncrud = require('../../lib/artifacts/rdbms/jsoncrud/gen/main');
function executeExample() {
    
    var loadModel = rdbmsfactory.createLoadModel(getWizziObject());
    
    var ittfPath = path.join(__dirname, 'ittf');
    var i, i_items=getFiles(ittfPath,'rdbms'), i_len=getFiles(ittfPath,'rdbms').length, item;
    for (i=0; i<i_len; i++) {
        item = getFiles(ittfPath,'rdbms')[i];
        item = item.substring(0, item.length - '.rdbms.ittf'.length);
        console.log('item', item);
        execute(item);
    }
    
    function execute(name) {
        var ittfSource = path.join(__dirname, 'ittf', name + '.rdbms.ittf');
        var rdbmsOutput = path.join(__dirname, 'ittf', name + '_jsoncrud.g.js');
        loadModel(ittfSource, getLoadModelContext({}), function(err, rdbmsWizziModel) {
            if (err) {
                console.log('err', err);
                throw new Error(err.message);
            }
            // log 'examples/rdbms result rdbmsWizziModel', rdbmsWizziModel
            var ctx = mocks.getGenContext();
            rdbmshtml_docs.gen(rdbmsWizziModel, ctx, function(err, ctxout) {
                if (err) {
                    console.log('err', err);
                    throw new Error(err.message);
                }
                console.log('ctxout begin ========', '\n' + ctxout.getContent(), '\nctxout end ============');
                file.write(rdbmsOutput, ctxout.getContent());
            });
        });
    }
}
function getFiles(srcpath, schema) {
    return fs.readdirSync(srcpath).filter((file) => {
            return fs.lstatSync(path.join(srcpath, file)).isFile() && verify.endsWith(file, schema === 'ittf' ? '.ittf' : '.' + schema + '.ittf');
        })
    ;
}
function getFilesData(srcpath, schema) {
    var files = fs.readdirSync(srcpath).filter((file) => {
        return fs.lstatSync(path.join(srcpath, file)).isFile() && verify.endsWith(file, '.' + schema + '.ittf');
    })
    ;
    var ret = [];
    var i, i_items=files, i_len=files.length, file;
    for (i=0; i<i_len; i++) {
        file = files[i];
        ret.push({
            path: file, 
            name: file.substring(0, file.length - ('.' + schema + '.ittf').length), 
            fullPath: path.join(srcpath, file)
        });
    }
    return ret;
}
function getWizziObject() {
    return {
            loadMTree: mtree.createLoadMTree(mocks.repo.getCreateFilesystemStore(), {
                useCache: false
            }), 
            file: wizziUtils.file, 
            verify: wizziUtils.verify, 
            errors: errors
        };
}
function getLoadModelContext(mtreeBuilUpContext) {
    return mocks.getLoadModelContext(mtreeBuilUpContext);
}
function executeWizziJob(wfjobDocumentUri, options) {
    options = options || {};
    options.plugins = options.plugins || [];
    options.globalContext = options.globalContext || {};
    var jobPlugins = [
        'wizzi-core', 
        'wizzi-meta', 
        'wizzi-js', 
        'wizzi-web'
    ];
    var i, i_items=options.plugins, i_len=options.plugins.length, item;
    for (i=0; i<i_len; i++) {
        item = options.plugins[i];
        jobPlugins.push(item);
    }
    if (wizzi == null) {
        wizzi = require('wizzi');
    }
    wizzi.executeWizziJob({
        user: 'stefi', 
        role: 'admin', 
        storeKind: 'filesystem', 
        config: {
            wfBaseFolder: 'c:/my/wizzi/v5', 
            plugins: jobPlugins
        }, 
        job: {
            name: 'example ' + wfjobDocumentUri, 
            ittfDocumentUri: wfjobDocumentUri, 
            productionOptions: wizzi.productionOptions({
                indentSpaces: 4, 
                basedir: __dirname, 
                verbose: 2
            }), 
            globalContext: options.globalContext
        }
    }, function(err) {
        if (err) {
            wizzi.printWizziJobError($name, err);
        }
    });
}
module.exports = executeExample;
if (require.main === module) {
    executeExample();
}

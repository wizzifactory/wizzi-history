/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\plugins\wizzi-web\src\ittf\examples\css\index.js.ittf
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
var cssfactory = require('../../lib/wizzi/models/css-factory.g');
var cssgenerator = require('../../lib/artifacts/css/document/gen/main');
function executeExample() {
    
    var loadModel = cssfactory.createLoadModel(getWizziObject());
    
    var ittfPath = path.join(__dirname, 'ittf');
    var i, i_items=getFiles(ittfPath,'css'), i_len=getFiles(ittfPath,'css').length, item;
    for (i=0; i<i_len; i++) {
        item = getFiles(ittfPath,'css')[i];
        item = item.substring(0, item.length - '.css.ittf'.length);
        console.log('item', item);
        execute(item);
    }
    
    function execute_old(name) {
        var ittfSource = path.join(__dirname, 'ittf', name + '.css.ittf');
        var cssOutput = path.join(__dirname, 'ittf', name + '.g.css');
        console.log('examples/css start loadModel', ittfSource);
        loadModel(ittfSource, {
            __productionManager: mocks.getProductionManager()
        }, function(err, wizziModel) {
            if (err) {
                console.log('err', err);
                throw new Error(err.message);
            }
            console.log('css wizziModel', wizziModel);
            var ctx = mocks.getGenContext();
            cssgenerator.gen(wizziModel, ctx, function(err, ctxout) {
                if (err) {
                    console.log('err', err);
                    throw new Error(err.message);
                }
                console.log('ctxout begin ========', '\n' + ctxout.getContent(), '\nctxout end ============');
                file.write(cssOutput, ctxout.getContent());
            });
        });
    }
    function execute(name) {
        var ittfSource = path.join(__dirname, 'ittf', name + '.css.ittf');
        var cssOutput = path.join(__dirname, 'ittf', name + '.g.css');
        if (wizzi == null) {
            wizzi = require('wizzi');
        }
        console.log('examples/css start loadModel', ittfSource);
        wizzi.fsnoaclFactory({
            plugins: {
                items: [
                    'wizzi-html'
                ]
            }
        }, function(err, wf) {
            if (err) {
                throw err;
            }
            wf.loadModel('css', ittfSource, {}, function(err, wizziModel) {
                if (err) {
                    throw err;
                }
                console.log('examples/css result wizziModel.rules', wizziModel.rules);
                var ctx = mocks.getGenContext(wf);
                cssgenerator.gen(wizziModel, ctx, function(err, ctxout) {
                    if (err) {
                        console.log('err', err);
                        throw new Error(err.message);
                    }
                    console.log('ctxout begin ========', '\n' + ctxout.getContent(), '\nctxout end ============');
                    file.write(cssOutput, ctxout.getContent());
                });
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
module.exports = executeExample;
if (require.main === module) {
    executeExample();
}

'use strict';
var path = require('path');
var chalk = require('chalk');
var md = module.exports = {};
var option = require('./util/option');
option.init({
    force: false,
    stack: true
});
md.option = option;
md.chalk = require('chalk');
md.config = require('./config');
md.verify = require('./util/verify');
md.file = require('./util/file');
md.fail = require('./util/fail');
md.log = require('./util/log');
md.pathutil = require('./util/pathutil');
md.utilnode = require('./util/node');
md.StringWriter = require('./util/stringwriter');
md.HtmlBuilder = require('./util/htmlbuilder').HtmlBuilder;
md.lineParser = require('./util/lineparser');
md.interpolate = require('./util/interpolate');
md.ProductionContext = require('./production/context');
md.options = require('./production/options');
md.GenWriter = require('./artifact/genwriter');
// ittf
md.ittf = require('./ittf/ittf');
md.utilnode = require('./util/node');
md.errors = require('./errors');
// SERVICES
md.services = {}
md.services.repository = require('./services/repository');
//stop md.services.logger = require('./services/logger');
md.services.filefinder = require('./services/filefinder');
md.services.fsapi = require('./ittf/repo/fsapi/index');
var startingCWD = process.cwd();
/*
    startRunnerServer is async.
    Can be used to load WizziModels, that is an async process,
    implementing the onStart and onPrepare callbacks in the wizzifile,
    that may call async method on the runnerServer instance.
    During IttfModel build-up and evaluation the calls to runnerServer
    must be sync. Both $.api(name, query) and $.model(name, query)
    are sync methods that must operate on WizziModels or POJO
    previously prepared.
*/
md.startRunnerServer = function (options, callback) {
    options = options || {};
    var runnerServerCWD = options.cwd || process.cwd();
    var wizziFilePath = path.join(runnerServerCWD, 'wizzifile.js');
    if (md.file.isFile(wizziFilePath)) {
        md.wizzifile = require(wizziFilePath);
        console.log(chalk.yellow('WIZZI FILE ' + wizziFilePath));
        /* config */
        if (md.wizzifile.onConfig) {
            md.wizzifile.onConfig(md.config);
        }
        /* RunnerServer */
        var RunnerServer = require('./wizzi/runnerserver');
        md.runnerServer = new RunnerServer(this, runnerServerCWD);
        if (md.wizzifile.onStart) {
            md.wizzifile.onStart(md.runnerServer, function (err) {
                if (err) { return callback(err); }
                if (md.wizzifile.onPrepare) {
                    md.wizzifile.onPrepare(md.runnerServer, function (err) {
                        callback(err);
                    });
                }
            });
        }
    }
}

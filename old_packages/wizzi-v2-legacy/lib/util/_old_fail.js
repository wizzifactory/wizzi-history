/*
 * Adapted from, thanks to
 * Copyright (c) 2014 "Cowboy" Ben Alman
 * https://github.com/gruntjs/grunt/blob/master/LICENSE-MIT
 */
'use strict';
var option = require('./option');
var chalk = require('chalk');
// The module to be exported.
var fail = module.exports = {};
// Error codes.
fail.code = {
    FATAL_ERROR: 1,
    MISSING_WFJOBFILE: 2,
    MISSING_ITTFDOCUMENT: 3,
    MISSING_MIXIN: 4,
    MISSING_INCLUDE: 5,
    ITTF_LOADING_FAILURE: 6,
    MODEL_LOADING_FAILURE: 7,
    MISSING_MODELTRANSFORMER: 8,
    MISSING_ARTIFACTGENERATOR: 9,
    WARNING: 10,
};
// If --stack is enabled, log the appropriate error stack (if it exists).
function dumpStack(e) {
    if (option('stack')) {
        if (e.origError && e.origError.stack) {
            loginfo(e.origError.stack);
        } else if (e.stack) {
            loginfo(e.stack);
        }
    }
}
// A fatal error occurred. Abort immediately.
fail.fatal = function (e, errcode) {
    var msg = "Fatal error: " + String(e.message || e);
    logerror(msg);
    dumpStack(e);
    process.exit(typeof errcode === 'number' ? errcode : fail.code.FATAL_ERROR);
};
// Keep track of error and warning counts.
fail.errorcount = 0;
fail.warncount = 0;
// A warning occurred. Abort immediately unless -f or --force was used.
fail.warn = function (e, errcode) {
    var msg = 'Warning: ' + (typeof e === 'string' ? e : e.message);
    msg += (option('force') ? '\nUsed --force, continuing.' : '\nUse --force to continue.');
    fail.warncount++;
    logwarn(msg);
    // If -f or --force aren't used, stop script processing.
    if (!option('force')) {
        dumpStack(e); // fail stopped 20/2/2017
        if (false) {
            logerror('Aborted due to warnings.');
            process.exit(typeof errcode === 'number' ? errcode : fail.code.WARNING);
        }
    }
};
// This gets called at the very end.
fail.report = function () {
    if (fail.warncount > 0) {
        logerror('Done, but with warnings.');
    } else {
        logsuccess('Done, without errors.');
    }
};
function loginfo(msg) {
    console.log(msg);
}
function logsuccess(msg) {
    console.log(chalk.green(msg));
}
function logwarn(msg) {
    console.log(chalk.yellow(msg));
}
function logerror(msg) {
    console.log(chalk.red(msg));
}

/*
    artifact generator: C:\My\wizzi\v6\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v6\kernel\wizzi-cli\src\ittf\root\index.js.ittf
    utc time: Mon, 01 Apr 2019 16:10:58 GMT
*/
'use strict';
const minimist = require('minimist');
const error = require('./utils/error');
module.exports = () => {
    const args = minimist(process.argv.slice(2));
    console.log('args', args);
    let cmd = args._[0] || 'generate';
    if (args.version || args.v) {
        cmd = 'version';
    }
    if (args.help || args.h) {
        cmd = 'help';
    }
    console.log('cmd', cmd);
    switch (cmd) {
        case 'generate': {
            require('./cmds/generate')();
            break;
        }
        case 'create': {
            require('./cmds/create')(args);
            break;
        }
        case 'help': {
            require('./cmds/help');
            break;
        }
        case '?': {
            require('./cmds/help');
            break;
        }
        default: {
            error(`"${cmd}" is not a valid command!`);
            error(`try wizzi help`, true);
            break;
        }
    }
};

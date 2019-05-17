/*
    artifact generator: C:\My\wizzi\v6\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v6\kernel\wizzi-cli\src\ittf\cmds\help.js.ittf
    utc time: Mon, 01 Apr 2019 16:10:58 GMT
*/
'use strict';
const menus = {
    main: [
        "wizzi [noarguments] | [command] <options>", 
        "", 
        "noarguments ......... execute generation using wizzi.config.js", 
        "create .............. setup wizzi for the current project", 
        "version ............. show package version", 
        "help ................ show help menu for a command"
    ].join('\n'), 
    create: [
        "wizzi create <options>", 
        "", 
        "--kind -k ........... the project kind"
    ].join('\n')
};
module.exports = (args) => {
    const subCmd = args._[0] === 'help' ? args._[1] : args._[0];
    console.log(menus[subCmd] || menus.main);
};

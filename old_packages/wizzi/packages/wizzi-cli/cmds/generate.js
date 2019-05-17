/*
    artifact generator: C:\My\wizzi\v6\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v6\kernel\wizzi-cli\src\ittf\cmds\generate.js.ittf
    utc time: Mon, 01 Apr 2019 16:10:58 GMT
*/
'use strict';
const path = require('path');
const fs = require('fs');
const wizzi = require('wizzi');
module.exports = (args) => {
    let currentDir = process.cwd();
    let currentPath = null;
    let configPath = null;
    while (configPath == null && currentDir.length > 3) {
        currentPath = path.join(currentDir, 'wizzi.config.js');
        try {
            console.log('searching', currentPath);
            const stat = fs.lstatSync(currentPath);
            console.log('stat', stat);
            if (stat.isFile()) {
                configPath = currentPath;
            }
        } 
        catch (ex) {
        } 
        currentDir = path.dirname(currentDir);
    }
    if (!configPath) {
        console.error(`config file "wizzi.config.js" not found`);
        return ;
    }
    const configInstance = require(configPath);
    console.log('configInstance', configInstance);
    wizzi.executeWizziJob({
        user: 'stefi', 
        role: 'admin', 
        storeKind: 'filesystem', 
        config: {
            wfBaseFolder: __dirname, 
            plugins: configInstance.plugins
        }, 
        job: {
            name: configInstance.wfjobName, 
            ittfDocumentUri: configInstance.wfjobPath, 
            productionOptions: wizzi.productionOptions({
                indentSpaces: 4, 
                basedir: __dirname, 
                verbose: 2, 
                dumps: {
                    dumpsBaseFolder: path.join(__dirname, '_dumps'), 
                    mTreeBuildupJsWizziScript: {
                        dump: false
                    }
                }
            }), 
            globalContext: configInstance.globalContext
        }
    }, function(err) {
        if (err) {
            wizzi.printWizziJobError(configInstance.wfjobName, err);
        }
    });
};

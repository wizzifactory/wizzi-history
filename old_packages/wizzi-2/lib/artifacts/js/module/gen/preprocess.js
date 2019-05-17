/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: C:\My\wizzi\v2\sources\wizzi-2-boot\ittf\lib\artifacts\js\module\gen\preprocess.js.ittf
    utc time: Tue, 11 Jul 2017 17:02:26 GMT
*/
'use strict';
var md = module.exports = {};
var myname = 'js.module.preprocess';
md.exec = function(model,ctx) {
    ctx.__wzModule = {
        seen: false, 
        vars: [], 
        consts: [], 
        functions: [], 
        classes: [], 
        requires: []
    };
    ctx.__wzItems = [];
    var i, i_len=model.statements.length, topitem;
    for (i=0; i<i_len; i++) {
        topitem = model.statements[i];
        if (checkWzItem(topitem, ctx.__wzModule)) {
        }
        else if (topitem.wzElement === "wzIife") {
            ctx.__wzItems.push(wzTopLevel(topitem)
            );
        }
    }
};
function wzTopLevel(topitem) {
    var wzItems = topitem.__wzItems = wzItems = {
        seen: false, 
        vars: [], 
        consts: [], 
        functions: [], 
        classes: [], 
        requires: []
    };
    var i, i_len=topitem.statements.length, item;
    for (i=0; i<i_len; i++) {
        item = topitem.statements[i];
        checkWzItem(item, wzItems);
    }
    /**
        console.log('wzItems.requires.length', wzItems.requires.length);
        console.log('wzItems.vars.length', wzItems.vars.length);
        console.log('wzItems.consts.length', wzItems.consts.length);
        console.log('wzItems.functions.length', wzItems.functions.length);
        console.log('wzItems.classes.length', wzItems.classes.length);
    */
    return wzItems;
}

function checkWzItem(item,wzItems) {
    if (item.wzElement === "wzVar") {
        wzItems.vars.push(item);
        wzItems.seen = true;
        return true;
    }
    else if (item.wzElement === "wzConst") {
        wzItems.consts.push(item);
        wzItems.seen = true;
        return true;
    }
    else if (item.wzElement === "wzFunction") {
        wzItems.functions.push(item);
        wzItems.seen = true;
        return true;
    }
    else if (item.wzElement === "wzClass") {
        wzItems.functions.push(item);
        wzItems.seen = true;
        return true;
    }
    else if (item.wzElement === "wzRequire") {
        wzItems.requires.push(item);
        wzItems.seen = true;
        return true;
    }
    return false;
}


// generator: /wizzi-labs/wizzi-lab-site/ittf/lib/artifacts/js/module/gen/main.js, utc time: Thu, 23 Mar 2017 19:48:40 GMT
'use strict';
var md = module.exports = {};
var myname = 'js.module.preprocess';
md.exec = function(model,ctx) {
    ctx.__wzModule = {
        seen: false, 
        vars: [], 
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
        functions: [], 
        classes: [], 
        requires: []
    };
    var i, i_len=topitem.statements.length, item;
    for (i=0; i<i_len; i++) {
        item = topitem.statements[i];
        checkWzItem(item, wzItems);
    }
    /*
    console.log('wzItems.requires.length', wzItems.requires.length);
    console.log('wzItems.vars.length', wzItems.vars.length);
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


/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-app\wizzi\ittf\src\lib\document.js.ittf
    utc time: Sat, 06 Oct 2018 05:59:03 GMT
*/
'use strict';
function makeFolderList(documents) {
    documents.sort(function(a, b) {
        if (a.uri < b.uri) {
            return -1;
        }
        if (a.uri > b.uri) {
            return 1;
        }
        return 0;
    });
    var foldersObj = {}, folder;
    var i, i_items=documents, i_len=documents.length, d;
    for (i=0; i<i_len; i++) {
        d = documents[i];
        folder = foldersObj[d.folder];
        if (folder) {
            folder.documents.push(d);
        }
        else {
            foldersObj[d.folder] = {
                name: d.folder, 
                documents: [d]
            };
        }
    }
    var folderNames = Object.keys(foldersObj);
    folderNames.sort(function(a, b) {
        if (a < b) {
            return -1;
        }
        if (a > b) {
            return 1;
        }
        return 0;
    });
    var folders = [];
    var i, i_items=folderNames, i_len=folderNames.length, n;
    for (i=0; i<i_len; i++) {
        n = folderNames[i];
        folders.push(foldersObj[n]);
    }
    return folders;
}

module.exports = {
    makeFolderList: makeFolderList
};

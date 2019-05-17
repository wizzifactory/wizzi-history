/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\kernel\wizzi-repo\src\ittf\examples\jsondocument.js.ittf
*/
'use strict';

/** -àà
     EXAMPLE: wizzi-repo.examples.jsonDocument
*/

var myname = 'wizzi-repo.examples.jsonDocument';

var util = require('util');
var path = require('path');
var stringify = require('json-stringify-safe');
var vfile = require('wizzi-utils').vfile;
// defaults to filesystem
var fsfile = vfile();
var verify = require('wizzi-utils').verify;
var json = require('../lib/json/index');

heading1('start');
var fsJson = new json.FsJson();
var doc = new json.Document(fsJson);
var baseFolder = 'c:/wz/users/docexample';
var folder_1_path = path.join(baseFolder, 'folder1');
var folder_1_sub_1_path = path.join(baseFolder, 'folder1', 'sub1');
var folder_2_path = path.join(baseFolder, 'folder2');
var folder_3_path = path.join(baseFolder, 'folder3');
var file_1_path = path.join(folder_1_path, 'hello.js.ittf');
var file_2_path = path.join(folder_1_path, 'hello2.js.ittf');
var file_3_path = path.join(folder_1_path, 'hello3.js.ittf');
var file_4_path = path.join(folder_1_sub_1_path, 'hello_sub1.js.ittf');
var file_5_path = path.join(folder_2_path, 'hello2.js.ittf');
var file_6_path = path.join(folder_2_path, 'hello3.js.ittf');
var file_7_path = path.join(folder_2_path, 'hello4.js.ittf');
doc.isFile(file_1_path, function(err, result) {
    if (err) {
        console.log('err', err);
        throw new Error(err.message);
    }
    heading2('clear');
    printValue('isFile.file_1', result);
    if (result) {
        doc.deleteFile(file_1_path, function(err, result) {
            if (err) {
                console.log('err', err);
                throw new Error(err.message);
            }
            printValue('deleted.file_1', result);
            _clear2();
        });
    }
    else {
        _clear2();
    }
});
function _clear2() {
    heading2('clear2');
    doc.isFile(file_2_path, function(err, result) {
        if (err) {
            console.log('err', err);
            throw new Error(err.message);
        }
        printValue('isFile.file_2', result);
        if (result) {
            doc.deleteFile(file_2_path, function(err, result) {
                if (err) {
                    console.log('err', err);
                    throw new Error(err.message);
                }
                printValue('deleted.file_2', result);
                _clear3();
            });
        }
        else {
            _clear3();
        }
    });
}
function _clear3() {
    heading2('clear3');
    doc.isFile(file_3_path, function(err, result) {
        if (err) {
            console.log('err', err);
            throw new Error(err.message);
        }
        printValue('isFile.file_3', result);
        if (result) {
            doc.deleteFile(file_3_path, function(err, result) {
                if (err) {
                    console.log('err', err);
                    throw new Error(err.message);
                }
                printValue('deleted.file_3', result);
                _clear4();
            });
        }
        else {
            _clear4();
        }
    });
}
function _clear4() {
    heading2('clear4');
    doc.isFile(file_4_path, function(err, result) {
        if (err) {
            console.log('err', err);
            throw new Error(err.message);
        }
        printValue('isFile.file_4', result);
        if (result) {
            doc.deleteFile(file_4_path, function(err, result) {
                if (err) {
                    console.log('err', err);
                    throw new Error(err.message);
                }
                printValue('deleted.file_4', result);
                _clear5();
            });
        }
        else {
            _clear5();
        }
    });
}
function _clear5() {
    heading2('clear5');
    doc.isFile(file_5_path, function(err, result) {
        if (err) {
            console.log('err', err);
            throw new Error(err.message);
        }
        printValue('isFile.file_5', result);
        if (result) {
            doc.deleteFile(file_5_path, function(err, result) {
                if (err) {
                    console.log('err', err);
                    throw new Error(err.message);
                }
                printValue('deleted.file_5', result);
                _clear6();
            });
        }
        else {
            _clear6();
        }
    });
}
function _clear6() {
    heading2('clear6');
    doc.isFile(file_6_path, function(err, result) {
        if (err) {
            console.log('err', err);
            throw new Error(err.message);
        }
        printValue('isFile.file_6', result);
        if (result) {
            doc.deleteFile(file_6_path, function(err, result) {
                if (err) {
                    console.log('err', err);
                    throw new Error(err.message);
                }
                printValue('deleted.file_6', result);
                _writeFile();
            });
        }
        else {
            _writeFile();
        }
    });
}
function _writeFile() {
    heading2('_writeFile');
    doc.writeFile(file_1_path, 'Hello wizzi factory\n\t from folder1/hello.js.ittf', function(err, result) {
        if (err) {
            console.log('err', err);
            throw new Error(err.message);
        }
        heading2('writeFile');
        printValue('result', result);
        _createWriteStream();
    });
}
function _createWriteStream() {
    heading2('_createWriteStream');
    var stream = doc.createWriteStream(file_7_path);
    printValue('stream', stream);
    stream.write('Hello createWriteStream\n');
    stream.write('Welcome\n');
    stream.end(function(err, result) {
        if (err) {
            console.log('err', err);
            throw new Error(err.message);
        }
        printValue('result', result);
        _readFile();
    });
}
function _readFile() {
    heading2('_readFile');
    doc.readFile(file_1_path, function(err, content) {
        if (err) {
            console.log('err', err);
            throw new Error(err.message);
        }
        heading2('readFile');
        printValue('content', content);
        doc.readFile(file_7_path, function(err, content) {
            if (err) {
                console.log('err', err);
                throw new Error(err.message);
            }
            printValue('content', content);
            _uploadFolder();
        });
    });
}
function _uploadFolder() {
    heading2('uploadFolder');
    doc.uploadFolder(path.join(__dirname, 'ittf', 'mongoDocument'), folder_3_path, function(err, result) {
        if (err) {
            console.log('err', err);
            throw new Error(err.message);
        }
        printValue('result', result);
        _renameFile();
    });
}
function _renameFile() {
    heading2('_renameFile');
    doc.isFile(file_2_path, function(err, result) {
        if (err) {
            console.log('err', err);
            throw new Error(err.message);
        }
        heading2('renameFile');
        printValue('isFile.before.rename', result);
        doc.renameFile(file_1_path, file_2_path, function(err, result) {
            if (err) {
                console.log('err', err);
                throw new Error(err.message);
            }
            printValue('rename.result', result);
            doc.isFile(file_2_path, function(err, result) {
                if (err) {
                    console.log('err', err);
                    throw new Error(err.message);
                }
                printValue('isFile.after.rename', result);
                _copyFile();
            });
        });
    });
}
function _copyFile() {
    doc.isFile(file_3_path, function(err, result) {
        if (err) {
            console.log('err', err);
            throw new Error(err.message);
        }
        heading2('copyFile');
        printValue('isFile.before.copy', result);
        doc.copyFile(file_2_path, file_3_path, function(err, result) {
            if (err) {
                console.log('err', err);
                throw new Error(err.message);
            }
            printValue('copy.result', result);
            doc.isFile(file_3_path, function(err, result) {
                if (err) {
                    console.log('err', err);
                    throw new Error(err.message);
                }
                printValue('isFile.after.copy', result);
                _copyFolder();
            });
        });
    });
}
function _copyFolder() {
    heading2('copyFolder');
    doc.copyFolder(folder_1_path, folder_2_path, function(err, result) {
        if (err) {
            console.log('err', err);
            throw new Error(err.message);
        }
        printArray('copied', result, [
            'newid'
        ]);
        _getDir();
    });
}
function _getDir() {
    doc.copyFile(file_2_path, file_4_path, function(err, result) {
        if (err) {
            console.log('err', err);
            throw new Error(err.message);
        }
        heading2('getDir');
        printValue('copied.file_4_path', result);
        doc.getDir(folder_1_path, function(err, result) {
            if (err) {
                console.log('err', err);
                throw new Error(err.message);
            }
            printArray('dir', result, [
                '_id', 
                'path', 
                'kind'
            ]);
            doc.close();
            terminate();
        });
    });
}
function terminate() {
    dump();
}
function dump() {
    printValue('fsJson.items', fsJson.items);
    printValue('fsJson.documents', fsJson.documents);
}
function heading1(text) {
    console.log('');
    console.log('********************************************************************************');
    console.log('** Example wizzi-repo.examples.jsonDocument - ' + text);
    console.log('********************************************************************************');
    console.log('');
}
function heading2(text) {
    console.log('');
    console.log('--------------------------------------------------------------------------------');
    console.log('-- Example wizzi-repo.examples.jsonDocument - ' + text);
    console.log('--------------------------------------------------------------------------------');
    console.log('');
}
function printArray(name, arr, fields) {
    console.log('* array ' + name + ' : ');
    var i, i_items=arr, i_len=arr.length, item;
    for (i=0; i<i_len; i++) {
        item = arr[i];
        console.log('  {', i);
        var keys = fields || Object.keys(item);
        var j, j_items=keys, j_len=keys.length, k;
        for (j=0; j<j_len; j++) {
            k = keys[j];
            printValue(k, item[k]);
        }
    }
}
function printValue(k, v) {
    if (verify.isNotEmpty(v)) {
        var lines = verify.splitLines(v, {
            numbered: true
        });
        if (lines.length === 1) {
            console.log('   ', k, ':', lines[0].text);
        }
        else {
            for (var i=0; i<lines.length; i++) {
                if (i === 0) {
                    console.log('   ', k, ':', lines[0].numFmt, lines[0].text);
                }
                else {
                    console.log('   ', spaces(k.length+1), ' ', lines[i].numFmt, lines[i].text);
                }
            }
        }
    }
    else {
        console.log('   ', k, ':', v);
    }
}
function spaces(len) {
    return new Array(len).join(' ');
}

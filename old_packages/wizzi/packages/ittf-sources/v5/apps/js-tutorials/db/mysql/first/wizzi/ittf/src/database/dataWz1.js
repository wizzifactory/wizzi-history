/*
    artifact generator: /index.js
    primary source IttfDocument: w:/data-wz1/data-wz1.js.ittf
    utc time: Mon, 16 Jul 2018 11:05:04 GMT
*/
'use strict';
const DataWz1 = function (sqldb) {
    const impl = {
        query: {
            category: function (id, callback) {
                var WHERE = [
                    'id=?'
                ].join(' AND ');
                var sql = "SELECT * FROM categories WHERE " + WHERE;
                var sql_values = [
                    id
                ];
                console.log('before sqldb.query', sql);
                return new Promise((resolve, fail) => {
                    sqldb.query({
                        sql: sql,
                        timeout: 5000,
                        values: sql_values
                    }, function (error, results, fields) {
                        if (error) {
                            fail(err);
                        }
                        else {
                            resolve(results);
                        }
                    });
                });
            },
            categories: function (callback) {
                var sql = "SELECT * FROM categories";
                var sql_values = [];
                console.log('before sqldb.query', sql);
                return new Promise((resolve, fail) => {
                    sqldb.query({
                        sql: sql,
                        timeout: 5000,
                        values: sql_values
                    }, function (error, results, fields) {
                        if (error) {
                            fail(err);
                        }
                        else {
                            resolve(results);
                        }
                    });
                });
            },
            categoryByName: function (name) {
                var WHERE = [
                    'name=?'
                ].join(' AND ');
                var sql = "SELECT * FROM categories WHERE " + WHERE;
                var sql_values = [
                    name
                ];
                console.log('before sqldb.query', sql);
                return new Promise((resolve, fail) => {
                    sqldb.query({
                        sql: sql,
                        timeout: 5000,
                        values: sql_values
                    }, function (error, results, fields) {
                        if (error) {
                            fail(err);
                        }
                        else {
                            resolve(results);
                        }
                    });
                });
            },
            option: function (id, callback) {
                var WHERE = [
                    'id=?'
                ].join(' AND ');
                var sql = "SELECT * FROM options WHERE " + WHERE;
                var sql_values = [
                    id
                ];
                console.log('before sqldb.query', sql);
                return new Promise((resolve, fail) => {
                    sqldb.query({
                        sql: sql,
                        timeout: 5000,
                        values: sql_values
                    }, function (error, results, fields) {
                        if (error) {
                            fail(err);
                        }
                        else {
                            resolve(results);
                        }
                    });
                });
            },
            options: function (callback) {
                var sql = "SELECT * FROM options";
                var sql_values = [];
                console.log('before sqldb.query', sql);
                return new Promise((resolve, fail) => {
                    sqldb.query({
                        sql: sql,
                        timeout: 5000,
                        values: sql_values
                    }, function (error, results, fields) {
                        if (error) {
                            fail(err);
                        }
                        else {
                            resolve(results);
                        }
                    });
                });
            },
            optionByName: function (name) {
                var WHERE = [
                    'name=?'
                ].join(' AND ');
                var sql = "SELECT * FROM options WHERE " + WHERE;
                var sql_values = [
                    name
                ];
                console.log('before sqldb.query', sql);
                return new Promise((resolve, fail) => {
                    sqldb.query({
                        sql: sql,
                        timeout: 5000,
                        values: sql_values
                    }, function (error, results, fields) {
                        if (error) {
                            fail(err);
                        }
                        else {
                            resolve(results);
                        }
                    });
                });
            },
            optionsByCategory: function (categoryId) {
                var WHERE = [
                    'categoryId=?'
                ].join(' AND ');
                var sql = "SELECT * FROM options WHERE " + WHERE;
                var sql_values = [
                    categoryId
                ];
                console.log('before sqldb.query', sql);
                return new Promise((resolve, fail) => {
                    sqldb.query({
                        sql: sql,
                        timeout: 5000,
                        values: sql_values
                    }, function (error, results, fields) {
                        if (error) {
                            fail(err);
                        }
                        else {
                            resolve(results);
                        }
                    });
                });
            }
        },
        mutation: {
            createCategory: function (name, callback) {
                var NAMES = [
                    'name'
                ];
                var VALUES = [
                    '?'
                ];
                var sql_values = [
                    name
                ];
                var sql = "INSERT INTO categories ( " + NAMES.join(", ") + " ) VALUES ( " + VALUES.join(", ") + ")";
                console.log('before sqldb.query', sql);
                return new Promise((resolve, fail) => {
                    sqldb.query({
                        sql: sql,
                        timeout: 5000,
                        values: sql_values
                    }, function (error, results, fields) {
                        if (error) {
                            fail(err);
                        }
                        else {
                            resolve(results);
                        }
                    });
                });
            },
            updateCategory: function (name, callback) {
                var SET = [
                    'name=?'
                ];
                var WHERE = [
                    'id=?'
                ].join(' AND ');
                var sql = "UPDATE categories " + SET.join(", ") + " WHERE " + WHERE;
                var sql_values = [
                    name,
                    id
                ];
                console.log('before sqldb.query', sql);
                return new Promise((resolve, fail) => {
                    sqldb.query({
                        sql: sql,
                        timeout: 5000,
                        values: sql_values
                    }, function (error, results, fields) {
                        if (error) {
                            fail(err);
                        }
                        else {
                            resolve(results);
                        }
                    });
                });
            },
            deleteCategory: function (id, callback) {
                var WHERE = [
                    'id=?'
                ].join(' AND ');
                var sql = "DELETE FROM categories WHERE " + WHERE;
                var sql_values = [
                    id
                ];
                console.log('before sqldb.query', sql);
                return new Promise((resolve, fail) => {
                    sqldb.query({
                        sql: sql,
                        timeout: 5000,
                        values: sql_values
                    }, function (error, results, fields) {
                        if (error) {
                            fail(err);
                        }
                        else {
                            resolve(results);
                        }
                    });
                });
            },
            createOption: function (name, value, type, format, categoryId, callback) {
                var NAMES = [
                    'name',
                    'value',
                    'type',
                    'format',
                    'categoryId'
                ];
                var VALUES = [
                    '?',
                    '?',
                    '?',
                    '?',
                    '?'
                ];
                var sql_values = [
                    name,
                    value,
                    type,
                    format,
                    categoryId
                ];
                var sql = "INSERT INTO options ( " + NAMES.join(", ") + " ) VALUES ( " + VALUES.join(", ") + ")";
                console.log('before sqldb.query', sql);
                return new Promise((resolve, fail) => {
                    sqldb.query({
                        sql: sql,
                        timeout: 5000,
                        values: sql_values
                    }, function (error, results, fields) {
                        if (error) {
                            fail(err);
                        }
                        else {
                            resolve(results);
                        }
                    });
                });
            },
            updateOption: function (name, value, type, format, categoryId, callback) {
                var SET = [
                    'name=?',
                    'value=?',
                    'type=?',
                    'format=?',
                    'categoryId=?'
                ];
                var WHERE = [
                    'id=?'
                ].join(' AND ');
                var sql = "UPDATE options " + SET.join(", ") + " WHERE " + WHERE;
                var sql_values = [
                    name,
                    value,
                    type,
                    format,
                    id
                ];
                console.log('before sqldb.query', sql);
                return new Promise((resolve, fail) => {
                    sqldb.query({
                        sql: sql,
                        timeout: 5000,
                        values: sql_values
                    }, function (error, results, fields) {
                        if (error) {
                            fail(err);
                        }
                        else {
                            resolve(results);
                        }
                    });
                });
            },
            deleteOption: function (id, callback) {
                var WHERE = [
                    'id=?'
                ].join(' AND ');
                var sql = "DELETE FROM options WHERE " + WHERE;
                var sql_values = [
                    id
                ];
                console.log('before sqldb.query', sql);
                return new Promise((resolve, fail) => {
                    sqldb.query({
                        sql: sql,
                        timeout: 5000,
                        values: sql_values
                    }, function (error, results, fields) {
                        if (error) {
                            fail(err);
                        }
                        else {
                            resolve(results);
                        }
                    });
                });
            }
        },
        dba: {
            createTableCategory: function (callback) {
                var COLUMNS = [
                    'id int primary key auto_increment',
                    'name varchar(255) not null'
                ].join(',');
                var sql = "CREATE TABLE IF NOT EXISTS categories (" + COLUMNS;
                var NDX_COLUMNS = [
                    'name'
                ].join(', ');
                sql += ", UNIQUE KEY (" + NDX_COLUMNS + ")";
                sql += ") ";
                const sql_values = null;
                console.log('before sqldb.query', sql);
                return new Promise((resolve, fail) => {
                    sqldb.query({
                        sql: sql,
                        timeout: 5000,
                        values: sql_values
                    }, function (error, results, fields) {
                        if (error) {
                            fail(err);
                        }
                        else {
                            resolve(results);
                        }
                    });
                });
            },
            seedCategory: function (callback) {
                const seed_len = 2;
                var count = 0;
                function exitCheck() {
                    count++;
                    if (count == seed_len) {
                        return callback(null);
                    }
                }
                impl.mutation.createCategory('UI', function (err, result) {
                    exitCheck();
                });
                impl.mutation.createCategory('Data', function (err, result) {
                    exitCheck();
                });
            },
            createTableOption: function (callback) {
                var COLUMNS = [
                    'id int primary key auto_increment',
                    'name varchar(255) not null',
                    'value varchar(255) not null',
                    'type varchar(255) not null',
                    'format varchar(255) not null',
                    'categoryId int not null'
                ].join(',');
                var sql = "CREATE TABLE IF NOT EXISTS options (" + COLUMNS;
                var NDX_COLUMNS = [
                    'name'
                ].join(', ');
                sql += ", UNIQUE KEY (" + NDX_COLUMNS + ")";
                sql += ") ";
                const sql_values = null;
                console.log('before sqldb.query', sql);
                return new Promise((resolve, fail) => {
                    sqldb.query({
                        sql: sql,
                        timeout: 5000,
                        values: sql_values
                    }, function (error, results, fields) {
                        if (error) {
                            fail(err);
                        }
                        else {
                            resolve(results);
                        }
                    });
                });
            },
            seedOption: function (callback) {
                const seed_len = 2;
                var count = 0;
                function exitCheck() {
                    count++;
                    if (count == seed_len) {
                        return callback(null);
                    }
                }
                impl.mutation.createOption('useReact', 'true', 'boolean', 'boolean', 1, function (err, result) {
                    exitCheck();
                });
                impl.mutation.createOption('useMaterial', 'true', 'boolean', 'boolean', 1, function (err, result) {
                    exitCheck();
                });
            }
        }
    };
    return impl;
};
module.exports = DataWz1;

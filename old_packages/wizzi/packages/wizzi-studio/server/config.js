/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-studio\wizzi\ittf\server\config.js.ittf
    utc time: Thu, 06 Dec 2018 17:50:06 GMT
*/
'use strict';
var path = require('path');
var randomString = require('randomstring');
var md = module.exports = {};
md.app = {
    title: 'Wizzi studio', 
    description: 'Development environment for wizzi factory productions', 
    keywords: 'software-generation software-factory model-driven-development', 
    googleAnalyticsTrackingID: (process.env.GOOGLE_ANALYTICS_TRACKING_ID || 'GOOGLE_ANALYTICS_TRACKING_ID')
};
md.port = process.env.PORT || 3014;
md.sessionCookie = {
    maxAge: 24 * (60 * 60) * 1000, 
    httpOnly: true, 
    secure: false
};
md.sessionSecret = randomString.generate();
md.sessionCollection = 'sessions';
md.sessionKey = 'sessionId';
/**
    md.logo = 'modules/core/client/img/brand/logo.png'md.favicon = 'modules/core/client/img/brand/favicon.ico'md.repoBaseUri = path.join(__dirname, 'data', 'repo')md.studioBasePath = path.join(__dirname, 'data', 'studio')*/
// set md.repoUri = 'mongodb://localhost:27017/darvin'
// set md.repoBaseFolderUri = 'c://users'
md.wizziBasePath = 'c:\\my\\wizzi';
md.wizziCurrentVersion = 'v5';
md.wizziKernelBasePath = 'c:\\my\\wizzi\\v5\\kernel';
md.getWizziKernelBasePath = function(version) {
    version = version || md.wizziCurrentVersion;
    return 'c:\\my\\wizzi\\' + version + '\\kernel';
};
md.wizziKernelBaseId = 'v5-kernel';
md.getWizziKernelBaseId = function(version) {
    version = version || md.wizziCurrentVersion;
    return version + '-kernel';
};
md.wizziPluginsBasePath = 'c:\\my\\wizzi\\v5\\plugins';
md.getWizziPluginsBasePath = function(version) {
    version = version || md.wizziCurrentVersion;
    return 'c:\\my\\wizzi\\' + version + '\\plugins';
};
md.wizziPluginsBaseId = 'v5-plugins';
md.getWizziPluginsBaseId = function(version) {
    version = version || md.wizziCurrentVersion;
    return version + '-plugins';
};
md.wizziAppsBasePath = 'c:\\my\\wizzi\\v5\\apps';
md.getWizziAppsBasePath = function(version) {
    version = version || md.wizziCurrentVersion;
    return 'c:\\my\\wizzi\\' + version + '\\apps';
};
md.wizziAppsBaseId = 'v5-apps';
md.getWizziAppsBaseId = function(version) {
    version = version || md.wizziCurrentVersion;
    return version + '-apps';
};
md.serverRootPath = __dirname;
md.repoUri = 'file://';
md.repoBaseFolderUri = path.join(__dirname, 'ittf', 'repo');
md.metaBasePath = path.join(__dirname, 'data', 'meta');
md.studioBasePath = path.join(__dirname, 'data', 'studio');
md.jobsBasePath = path.join(__dirname, 'data', 'jobs');
md.cheatsheetsBasePath = path.join(__dirname, 'data', 'models', 'cheatsheets');
md.siteMetaBasePath = path.join(__dirname, 'data', 'models', 'json');
md.jsonDataMetaBasePath = path.join(__dirname, 'data', 'models', 'sitemaps');
md.generatedPluginsOutputBasePath = 'c:\\my\\wizzi\\v5\\apps\\wizzi-studio\\node_modules';
md.defaultGeneratedPlugin = 'my-plugin';
md.storeKind = 'filesystem';
md.plugins = [
    'wizzi-core', 
    'wizzi-meta', 
    'wizzi-js', 
    'wizzi-web'
];
md.user = 'stefi';
md.role = 'admin';
md.set = function(key, value) {
    md[key] = value;
    onChange(key);
};
function onChange() {
}

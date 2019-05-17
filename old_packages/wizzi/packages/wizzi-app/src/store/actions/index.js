/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-app\wizzi\ittf\src\store\actions\index.js.ittf
    utc time: Sat, 06 Oct 2018 05:59:03 GMT
*/
'use strict';
import { HTTP_REQUEST } from '../../config/api.config';
const timers = {};
const KIND_FOLDER = 0;
const KIND_FILE = 1;
const KIND_COPYCUT = 2;
const KIND_BATCH = 3;
// load initial
export const INITIAL_LOAD = 'INITIAL_LOAD';
;
export const INITIAL_LOAD_REQUEST = 'INITIAL_LOAD_REQUEST';
;
export const INITIAL_LOAD_SUCCESS = 'INITIAL_LOAD_SUCCESS';
;
export const INITIAL_LOAD_FAILURE = 'INITIAL_LOAD_FAILURE';
;
export const initialLoad = () => {
    return {
            type: INITIAL_LOAD, 
            [HTTP_REQUEST]: {
                types: [
                    INITIAL_LOAD_REQUEST, 
                    INITIAL_LOAD_SUCCESS, 
                    INITIAL_LOAD_FAILURE
                ], 
                url: '/api/studio/commons', 
                method: 'get'
            }
        };
};
;
// User accounts are not created neither managed by the Ittf editor.
// User actions retrieve and modify user state only.
// project select
export const SELECT_PROJECT = 'SELECT_PROJECT';
;
export const SELECT_PROJECT_REQUEST = 'SELECT_PROJECT_REQUEST';
;
export const SELECT_PROJECT_SUCCESS = 'SELECT_PROJECT_SUCCESS';
;
export const SELECT_PROJECT_FAILURE = 'SELECT_PROJECT_FAILURE';
;
export const selectProject = (project) => {
    return {
            type: SELECT_PROJECT, 
            project: project, 
            [HTTP_REQUEST]: {
                types: [
                    SELECT_PROJECT_REQUEST, 
                    SELECT_PROJECT_SUCCESS, 
                    SELECT_PROJECT_FAILURE
                ], 
                url: '/api/studio/user', 
                method: 'post', 
                payload: {
                    project: project
                }
            }
        };
};
;
// projects get
export const GET_PROJECTS = 'GET_PROJECTS';
;
export const GET_PROJECTS_REQUEST = 'GET_PROJECTS_REQUEST';
;
export const GET_PROJECTS_SUCCESS = 'GET_PROJECTS_SUCCESS';
;
export const GET_PROJECTS_FAILURE = 'GET_PROJECTS_FAILURE';
;
// project create
export const CREATE_PROJECT = 'CREATE_PROJECT';
;
export const CREATE_PROJECT_REQUEST = 'CREATE_PROJECT_REQUEST';
;
export const CREATE_PROJECT_SUCCESS = 'CREATE_PROJECT_SUCCESS';
;
export const CREATE_PROJECT_FAILURE = 'CREATE_PROJECT_FAILURE';
;
export const getProjects = () => {
    return {
            type: GET_PROJECTS, 
            [HTTP_REQUEST]: {
                types: [
                    GET_PROJECTS_REQUEST, 
                    GET_PROJECTS_SUCCESS, 
                    GET_PROJECTS_FAILURE
                ], 
                url: '/api/studio/projects', 
                method: 'get', 
                queryParams: {}
            }
        };
};
;
export const createProject = (project) => {
    return {
            type: CREATE_PROJECT, 
            project: project, 
            [HTTP_REQUEST]: {
                types: [
                    CREATE_PROJECT_REQUEST, 
                    CREATE_PROJECT_SUCCESS, 
                    CREATE_PROJECT_FAILURE
                ], 
                url: '/api/studio/project', 
                method: 'post', 
                payload: {
                    project: project
                }
            }
        };
};
;
// schemas get
export const GET_SCHEMAS = 'GET_SCHEMAS';
;
export const GET_SCHEMAS_REQUEST = 'GET_SCHEMAS_REQUEST';
;
export const GET_SCHEMAS_SUCCESS = 'GET_SCHEMAS_SUCCESS';
;
export const GET_SCHEMAS_FAILURE = 'GET_SCHEMAS_FAILURE';
;
// schema get
export const GET_SCHEMA = 'GET_SCHEMA';
;
export const GET_SCHEMA_REQUEST = 'GET_SCHEMA_REQUEST';
;
export const GET_SCHEMA_SUCCESS = 'GET_SCHEMA_SUCCESS';
;
export const GET_SCHEMA_FAILURE = 'GET_SCHEMA_FAILURE';
;
// schema getJsonDoc
export const GETJSONDOC_SCHEMA = 'GETJSONDOC_SCHEMA';
;
export const GETJSONDOC_SCHEMA_REQUEST = 'GETJSONDOC_SCHEMA_REQUEST';
;
export const GETJSONDOC_SCHEMA_SUCCESS = 'GETJSONDOC_SCHEMA_SUCCESS';
;
export const GETJSONDOC_SCHEMA_FAILURE = 'GETJSONDOC_SCHEMA_FAILURE';
;
// wfschema gen
export const GEN_WFSCHEMA = 'GEN_WFSCHEMA';
;
export const GEN_WFSCHEMA_REQUEST = 'GEN_WFSCHEMA_REQUEST';
;
export const GEN_WFSCHEMA_SUCCESS = 'GEN_WFSCHEMA_SUCCESS';
;
export const GEN_WFSCHEMA_FAILURE = 'GEN_WFSCHEMA_FAILURE';
;
export const getSchemas = () => {
    return {
            type: GET_SCHEMAS, 
            [HTTP_REQUEST]: {
                types: [
                    GET_SCHEMAS_REQUEST, 
                    GET_SCHEMAS_SUCCESS, 
                    GET_SCHEMAS_FAILURE
                ], 
                url: '/api/studio/schemas', 
                method: 'get'
            }
        };
};
;
export const getSchema = (schemaUri) => {
    return {
            type: GET_SCHEMA, 
            uri: schemaUri, 
            [HTTP_REQUEST]: {
                types: [
                    GET_SCHEMA_REQUEST, 
                    GET_SCHEMA_SUCCESS, 
                    GET_SCHEMA_FAILURE
                ], 
                url: '/api/studio/schema', 
                method: 'get', 
                queryParams: {
                    uri: schemaUri
                }
            }
        };
};
;
export const getSchemaJsonDoc = (schemaUri) => {
    return {
            type: GEN_WFSCHEMA, 
            uri: schemaUri, 
            [HTTP_REQUEST]: {
                types: [
                    GETJSONDOC_SCHEMA_REQUEST, 
                    GETJSONDOC_SCHEMA_SUCCESS, 
                    GETJSONDOC_SCHEMA_FAILURE
                ], 
                url: '/api/studio/schema', 
                method: 'get', 
                queryParams: {
                    uri: schemaUri
                }
            }
        };
};
    ;
export const generateWfSchema = (hash) => {
    return {
            type: GEN_WFSCHEMA, 
            hash: hash, 
            [HTTP_REQUEST]: {
                types: [
                    GEN_WFSCHEMA_REQUEST, 
                    GEN_WFSCHEMA_SUCCESS, 
                    GEN_WFSCHEMA_FAILURE
                ], 
                url: '/api/wizzi/wfschema', 
                method: 'get', 
                queryParams: {
                    hash: hash
                }
            }
        };
};
    ;
// documents get
export const GET_DOCUMENTS = 'GET_DOCUMENTS';
;
export const GET_DOCUMENTS_REQUEST = 'GET_DOCUMENTS_REQUEST';
;
export const GET_DOCUMENTS_SUCCESS = 'GET_DOCUMENTS_SUCCESS';
;
export const GET_DOCUMENTS_FAILURE = 'GET_DOCUMENTS_FAILURE';
;
// document create
export const CREATE_DOCUMENT = 'CREATE_DOCUMENT';
;
export const CREATE_DOCUMENT_REQUEST = 'CREATE_DOCUMENT_REQUEST';
;
export const CREATE_DOCUMENT_SUCCESS = 'CREATE_DOCUMENT_SUCCESS';
;
export const CREATE_DOCUMENT_FAILURE = 'CREATE_DOCUMENT_FAILURE';
;
// document select
export const SELECT_DOCUMENT = 'SELECT_DOCUMENT';
;
export const SELECT_DOCUMENT_REQUEST = 'SELECT_DOCUMENT_REQUEST';
;
export const SELECT_DOCUMENT_SUCCESS = 'SELECT_DOCUMENT_SUCCESS';
;
export const SELECT_DOCUMENT_FAILURE = 'SELECT_DOCUMENT_FAILURE';
;
// document update
export const UPDATE_DOCUMENT = 'UPDATE_DOCUMENT';
;
export const UPDATE_DOCUMENT_REQUEST = 'UPDATE_DOCUMENT_REQUEST';
;
export const UPDATE_DOCUMENT_SUCCESS = 'UPDATE_DOCUMENT_SUCCESS';
;
export const UPDATE_DOCUMENT_FAILURE = 'UPDATE_DOCUMENT_FAILURE';
;
export const DOCUMENT_CHANGED = 'DOCUMENT_CHANGED';
;
export const getDocuments = (project) => {
    return {
            type: GET_DOCUMENTS, 
            [HTTP_REQUEST]: {
                types: [
                    GET_DOCUMENTS_REQUEST, 
                    GET_DOCUMENTS_SUCCESS, 
                    GET_DOCUMENTS_FAILURE
                ], 
                url: '/api/studio/documents', 
                method: 'get', 
                queryParams: {
                    project: project
                }
            }
        };
};
;
export const createDocument = (name, schema, folder, project) => {
    return {
            type: CREATE_DOCUMENT, 
            name: name, 
            schema: schema, 
            folder: folder, 
            project: project, 
            [HTTP_REQUEST]: {
                types: [
                    CREATE_DOCUMENT_REQUEST, 
                    CREATE_DOCUMENT_SUCCESS, 
                    CREATE_DOCUMENT_FAILURE
                ], 
                url: '/api/studio/document', 
                method: 'post', 
                payload: {
                    name: name, 
                    schema: schema, 
                    folder: folder, 
                    project: project
                }
            }
        };
};
;
export const selectDocument = (uri, schema) => {
    console.log('action.selectDocument', uri, schema);
    return {
            type: SELECT_DOCUMENT, 
            uri: uri, 
            schema: schema, 
            [HTTP_REQUEST]: {
                types: [
                    SELECT_DOCUMENT_REQUEST, 
                    SELECT_DOCUMENT_SUCCESS, 
                    SELECT_DOCUMENT_FAILURE
                ], 
                url: '/api/studio/document', 
                method: 'get', 
                queryParams: {
                    uri: uri
                }
            }
        };
};
;
export const changeDocument = (newContent) => {
    return {
            type: DOCUMENT_CHANGED, 
            newContent: newContent
        };
};
;
export const updateDocument = (uri, newIttfContent) => {
    return {
            type: UPDATE_DOCUMENT, 
            uri: uri, 
            newIttfContent: newIttfContent, 
            [HTTP_REQUEST]: {
                types: [
                    UPDATE_DOCUMENT_REQUEST, 
                    UPDATE_DOCUMENT_SUCCESS, 
                    UPDATE_DOCUMENT_FAILURE
                ], 
                url: '/api/studio/document', 
                method: 'post', 
                payload: {
                    uri: uri, 
                    newcontent: newIttfContent
                }, 
                delayId: UPDATE_DOCUMENT + uri, 
                delay: 2000
            }
        };
};
;
// fragments get
export const GET_FRAGMENTS = 'GET_FRAGMENTS';
;
export const GET_FRAGMENTS_REQUEST = 'GET_FRAGMENTS_REQUEST';
;
export const GET_FRAGMENTS_SUCCESS = 'GET_FRAGMENTS_SUCCESS';
;
export const GET_FRAGMENTS_FAILURE = 'GET_FRAGMENTS_FAILURE';
;
// fragment create
export const CREATE_FRAGMENT = 'CREATE_FRAGMENT';
;
export const CREATE_FRAGMENT_REQUEST = 'CREATE_FRAGMENT_REQUEST';
;
export const CREATE_FRAGMENT_SUCCESS = 'CREATE_FRAGMENT_SUCCESS';
;
export const CREATE_FRAGMENT_FAILURE = 'CREATE_FRAGMENT_FAILURE';
;
// fragment select
export const SELECT_FRAGMENT = 'SELECT_FRAGMENT';
;
export const SELECT_FRAGMENT_REQUEST = 'SELECT_FRAGMENT_REQUEST';
;
export const SELECT_FRAGMENT_SUCCESS = 'SELECT_FRAGMENT_SUCCESS';
;
export const SELECT_FRAGMENT_FAILURE = 'SELECT_FRAGMENT_FAILURE';
;
// fragment update
export const UPDATE_FRAGMENT = 'UPDATE_FRAGMENT';
;
export const UPDATE_FRAGMENT_REQUEST = 'UPDATE_FRAGMENT_REQUEST';
;
export const UPDATE_FRAGMENT_SUCCESS = 'UPDATE_FRAGMENT_SUCCESS';
;
export const UPDATE_FRAGMENT_FAILURE = 'UPDATE_FRAGMENT_FAILURE';
;
export const FRAGMENT_CHANGED = 'FRAGMENT_CHANGED';
;
export const getFragments = (project) => {
    return {
            type: GET_FRAGMENTS, 
            [HTTP_REQUEST]: {
                types: [
                    GET_FRAGMENTS_REQUEST, 
                    GET_FRAGMENTS_SUCCESS, 
                    GET_FRAGMENTS_FAILURE
                ], 
                url: '/api/studio/fragments', 
                method: 'get', 
                queryParams: {
                    project: project
                }
            }
        };
};
;
export const createFragment = (name, schema, folder, project) => {
    return {
            type: CREATE_FRAGMENT, 
            name: name, 
            schema: schema, 
            folder: folder, 
            project: project, 
            [HTTP_REQUEST]: {
                types: [
                    CREATE_FRAGMENT_REQUEST, 
                    CREATE_FRAGMENT_SUCCESS, 
                    CREATE_FRAGMENT_FAILURE
                ], 
                url: '/api/studio/fragment', 
                method: 'post', 
                payload: {
                    name: name, 
                    schema: schema, 
                    folder: folder, 
                    project: project
                }
            }
        };
};
;
export const selectFragment = (uri, schema) => {
    console.log('action.selectFragment', uri, schema);
    return {
            type: SELECT_FRAGMENT, 
            uri: uri, 
            schema: schema, 
            [HTTP_REQUEST]: {
                types: [
                    SELECT_FRAGMENT_REQUEST, 
                    SELECT_FRAGMENT_SUCCESS, 
                    SELECT_FRAGMENT_FAILURE
                ], 
                url: '/api/studio/fragment', 
                method: 'get', 
                queryParams: {
                    uri: uri
                }
            }
        };
};
;
export const changeFragment = (newContent) => {
    return {
            type: FRAGMENT_CHANGED, 
            newContent: newContent
        };
};
;
export const updateFragment = (uri, newIttfContent) => {
    return {
            type: UPDATE_FRAGMENT, 
            uri: uri, 
            newIttfContent: newIttfContent, 
            [HTTP_REQUEST]: {
                types: [
                    UPDATE_FRAGMENT_REQUEST, 
                    UPDATE_FRAGMENT_SUCCESS, 
                    UPDATE_FRAGMENT_FAILURE
                ], 
                url: '/api/studio/fragment', 
                method: 'post', 
                payload: {
                    uri: uri, 
                    newcontent: newIttfContent
                }, 
                delayId: UPDATE_FRAGMENT + uri, 
                delay: 2000
            }
        };
};
;
// artifact generate
export const GENERATE_ARTIFACT = 'GENERATE_ARTIFACT';
;
export const GENERATE_ARTIFACT_REQUEST = 'GENERATE_ARTIFACT_REQUEST';
;
export const GENERATE_ARTIFACT_SUCCESS = 'GENERATE_ARTIFACT_SUCCESS';
;
export const GENERATE_ARTIFACT_FAILURE = 'GENERATE_ARTIFACT_FAILURE';
;
export const generateArtifact = (documentUri, artifactName) => {
    if (artifactName == null) {
        return null;
    }
    else {
        return {
                type: GENERATE_ARTIFACT, 
                uri: documentUri, 
                artifact: artifactName, 
                [HTTP_REQUEST]: {
                    types: [
                        GENERATE_ARTIFACT_REQUEST, 
                        GENERATE_ARTIFACT_SUCCESS, 
                        GENERATE_ARTIFACT_FAILURE
                    ], 
                    url: '/api/studio/artifact', 
                    method: 'get', 
                    queryParams: {
                        uri: documentUri, 
                        artifact: artifactName
                    }
                }
            };
    }
};
;
// kernel_Packages get
export const GET_KERNEL_PACKAGES = 'GET_KERNEL_PACKAGES';
;
export const GET_KERNEL_PACKAGES_REQUEST = 'GET_KERNEL_PACKAGES_REQUEST';
;
export const GET_KERNEL_PACKAGES_SUCCESS = 'GET_KERNEL_PACKAGES_SUCCESS';
;
export const GET_KERNEL_PACKAGES_FAILURE = 'GET_KERNEL_PACKAGES_FAILURE';
;
// kernel_Package get
export const GET_KERNEL_PACKAGE = 'GET_KERNEL_PACKAGE';
;
export const GET_KERNEL_PACKAGE_REQUEST = 'GET_KERNEL_PACKAGE_REQUEST';
;
export const GET_KERNEL_PACKAGE_SUCCESS = 'GET_KERNEL_PACKAGE_SUCCESS';
;
export const GET_KERNEL_PACKAGE_FAILURE = 'GET_KERNEL_PACKAGE_FAILURE';
;
// plugins_Packages get
export const GET_PLUGINS_PACKAGES = 'GET_PLUGINS_PACKAGES';
;
export const GET_PLUGINS_PACKAGES_REQUEST = 'GET_PLUGINS_PACKAGES_REQUEST';
;
export const GET_PLUGINS_PACKAGES_SUCCESS = 'GET_PLUGINS_PACKAGES_SUCCESS';
;
export const GET_PLUGINS_PACKAGES_FAILURE = 'GET_PLUGINS_PACKAGES_FAILURE';
;
// plugin_Package get
export const GET_PLUGIN_PACKAGE = 'GET_PLUGIN_PACKAGE';
;
export const GET_PLUGIN_PACKAGE_REQUEST = 'GET_PLUGIN_PACKAGE_REQUEST';
;
export const GET_PLUGIN_PACKAGE_SUCCESS = 'GET_PLUGIN_PACKAGE_SUCCESS';
;
export const GET_PLUGIN_PACKAGE_FAILURE = 'GET_PLUGIN_PACKAGE_FAILURE';
;
// plugin_Schemas get
export const GET_PLUGIN_SCHEMAS = 'GET_PLUGIN_SCHEMAS';
;
export const GET_PLUGIN_SCHEMAS_REQUEST = 'GET_PLUGIN_SCHEMAS_REQUEST';
;
export const GET_PLUGIN_SCHEMAS_SUCCESS = 'GET_PLUGIN_SCHEMAS_SUCCESS';
;
export const GET_PLUGIN_SCHEMAS_FAILURE = 'GET_PLUGIN_SCHEMAS_FAILURE';
;
// plugin_Artifacts get
export const GET_PLUGIN_ARTIFACTS = 'GET_PLUGIN_ARTIFACTS';
;
export const GET_PLUGIN_ARTIFACTS_REQUEST = 'GET_PLUGIN_ARTIFACTS_REQUEST';
;
export const GET_PLUGIN_ARTIFACTS_SUCCESS = 'GET_PLUGIN_ARTIFACTS_SUCCESS';
;
export const GET_PLUGIN_ARTIFACTS_FAILURE = 'GET_PLUGIN_ARTIFACTS_FAILURE';
;
export const getKernelPackages = () => {
    return {
            type: GET_KERNEL_PACKAGES, 
            [HTTP_REQUEST]: {
                types: [
                    GET_KERNEL_PACKAGES_REQUEST, 
                    GET_KERNEL_PACKAGES_SUCCESS, 
                    GET_KERNEL_PACKAGES_FAILURE
                ], 
                url: '/api/wizzi/kernel/packages', 
                method: 'get'
            }
        };
};
;
export const getKernelPackage = (packageName, version) => {
    return {
            type: GET_KERNEL_PACKAGE, 
            packageName: packageName, 
            version: version, 
            [HTTP_REQUEST]: {
                types: [
                    GET_KERNEL_PACKAGE_REQUEST, 
                    GET_KERNEL_PACKAGE_SUCCESS, 
                    GET_KERNEL_PACKAGE_FAILURE
                ], 
                url: '/api/wizzi/kernel/package', 
                method: 'get', 
                queryParams: {
                    xpackage: packageName, 
                    version: version
                }
            }
        };
};
;
export const getPluginsPackages = () => {
    return {
            type: GET_PLUGINS_PACKAGES, 
            [HTTP_REQUEST]: {
                types: [
                    GET_PLUGINS_PACKAGES_REQUEST, 
                    GET_PLUGINS_PACKAGES_SUCCESS, 
                    GET_PLUGINS_PACKAGES_FAILURE
                ], 
                url: '/api/wizzi/plugins/packages', 
                method: 'get'
            }
        };
};
;
export const getPluginPackage = (packageName, version) => {
    return {
            type: GET_PLUGIN_PACKAGE, 
            packageName: packageName, 
            version: version, 
            [HTTP_REQUEST]: {
                types: [
                    GET_PLUGIN_PACKAGE_REQUEST, 
                    GET_PLUGIN_PACKAGE_SUCCESS, 
                    GET_PLUGIN_PACKAGE_FAILURE
                ], 
                url: '/api/wizzi/plugin/package', 
                method: 'get', 
                queryParams: {
                    xpackage: packageName, 
                    version: version
                }
            }
        };
};
;
export const getPluginSchemas = (packageName, version) => {
    return {
            type: GET_PLUGIN_SCHEMAS, 
            packageName: packageName, 
            version: version, 
            [HTTP_REQUEST]: {
                types: [
                    GET_PLUGIN_SCHEMAS_REQUEST, 
                    GET_PLUGIN_SCHEMAS_SUCCESS, 
                    GET_PLUGIN_SCHEMAS_FAILURE
                ], 
                url: '/api/wizzi/plugin/schemas', 
                method: 'get', 
                queryParams: {
                    xpackage: packageName, 
                    version: version
                }
            }
        };
};
;
export const getPluginArtifacts = (packageName, version) => {
    return {
            type: GET_PLUGIN_ARTIFACTS, 
            packageName: packageName, 
            version: version, 
            [HTTP_REQUEST]: {
                types: [
                    GET_PLUGIN_ARTIFACTS_REQUEST, 
                    GET_PLUGIN_ARTIFACTS_SUCCESS, 
                    GET_PLUGIN_ARTIFACTS_FAILURE
                ], 
                url: '/api/wizzi/plugin/artifacts', 
                method: 'get', 
                queryParams: {
                    xpackage: packageName, 
                    version: version
                }
            }
        };
};
;
// ittf get
export const GET_ITTF = 'GET_ITTF';
;
export const GET_ITTF_REQUEST = 'GET_ITTF_REQUEST';
;
export const GET_ITTF_SUCCESS = 'GET_ITTF_SUCCESS';
;
export const GET_ITTF_FAILURE = 'GET_ITTF_FAILURE';
;
// artifact gen_default
export const GEN_DEFAULT_ARTIFACT = 'GEN_DEFAULT_ARTIFACT';
;
export const GEN_DEFAULT_ARTIFACT_REQUEST = 'GEN_DEFAULT_ARTIFACT_REQUEST';
;
export const GEN_DEFAULT_ARTIFACT_SUCCESS = 'GEN_DEFAULT_ARTIFACT_SUCCESS';
;
export const GEN_DEFAULT_ARTIFACT_FAILURE = 'GEN_DEFAULT_ARTIFACT_FAILURE';
;
// mtree_debuginfo get
export const GET_MTREE_DEBUGINFO = 'GET_MTREE_DEBUGINFO';
;
export const GET_MTREE_DEBUGINFO_REQUEST = 'GET_MTREE_DEBUGINFO_REQUEST';
;
export const GET_MTREE_DEBUGINFO_SUCCESS = 'GET_MTREE_DEBUGINFO_SUCCESS';
;
export const GET_MTREE_DEBUGINFO_FAILURE = 'GET_MTREE_DEBUGINFO_FAILURE';
;
export const getIttfDocument = (hash) => {
    return {
            type: GET_ITTF, 
            [HTTP_REQUEST]: {
                types: [
                    GET_ITTF_REQUEST, 
                    GET_ITTF_SUCCESS, 
                    GET_ITTF_FAILURE
                ], 
                url: '/api/wizzi/ittf', 
                queryParams: {
                    hash: hash
                }, 
                method: 'get'
            }
        };
};
;
export const generateDefaultArtifact = (hash) => {
    return {
            type: GEN_DEFAULT_ARTIFACT, 
            [HTTP_REQUEST]: {
                types: [
                    GEN_DEFAULT_ARTIFACT_REQUEST, 
                    GEN_DEFAULT_ARTIFACT_SUCCESS, 
                    GEN_DEFAULT_ARTIFACT_FAILURE
                ], 
                url: '/api/wizzi/ittf/defaultartifact', 
                queryParams: {
                    hash: hash
                }, 
                method: 'get'
            }
        };
};
;
export const getMTreeDebugInfo = (hash) => {
    return {
            type: GET_MTREE_DEBUGINFO, 
            [HTTP_REQUEST]: {
                types: [
                    GET_MTREE_DEBUGINFO_REQUEST, 
                    GET_MTREE_DEBUGINFO_SUCCESS, 
                    GET_MTREE_DEBUGINFO_FAILURE
                ], 
                url: '/api/wizzi/ittf/mtreedebug', 
                queryParams: {
                    hash: hash
                }, 
                method: 'get'
            }
        };
};
;
// wizzi_system_packages get
export const GET_WIZZI_SYSTEM_PACKAGES = 'GET_WIZZI_SYSTEM_PACKAGES';
;
export const GET_WIZZI_SYSTEM_PACKAGES_REQUEST = 'GET_WIZZI_SYSTEM_PACKAGES_REQUEST';
;
export const GET_WIZZI_SYSTEM_PACKAGES_SUCCESS = 'GET_WIZZI_SYSTEM_PACKAGES_SUCCESS';
;
export const GET_WIZZI_SYSTEM_PACKAGES_FAILURE = 'GET_WIZZI_SYSTEM_PACKAGES_FAILURE';
;
export const getWizziSystemPackages = () => {
    return {
            type: GET_WIZZI_SYSTEM_PACKAGES, 
            [HTTP_REQUEST]: {
                types: [
                    GET_WIZZI_SYSTEM_PACKAGES_REQUEST, 
                    GET_WIZZI_SYSTEM_PACKAGES_SUCCESS, 
                    GET_WIZZI_SYSTEM_PACKAGES_FAILURE
                ], 
                url: '/api/wizzi/system/packages', 
                method: 'get'
            }
        };
};
;
// wfjob execute
export const EXECUTE_WFJOB = 'EXECUTE_WFJOB';
;
export const EXECUTE_WFJOB_REQUEST = 'EXECUTE_WFJOB_REQUEST';
;
export const EXECUTE_WFJOB_SUCCESS = 'EXECUTE_WFJOB_SUCCESS';
;
export const EXECUTE_WFJOB_FAILURE = 'EXECUTE_WFJOB_FAILURE';
;
// job_batches get
export const GET_JOB_BATCHES = 'GET_JOB_BATCHES';
;
export const GET_JOB_BATCHES_REQUEST = 'GET_JOB_BATCHES_REQUEST';
;
export const GET_JOB_BATCHES_SUCCESS = 'GET_JOB_BATCHES_SUCCESS';
;
export const GET_JOB_BATCHES_FAILURE = 'GET_JOB_BATCHES_FAILURE';
;
// job_batch get
export const GET_JOB_BATCH = 'GET_JOB_BATCH';
;
export const GET_JOB_BATCH_REQUEST = 'GET_JOB_BATCH_REQUEST';
;
export const GET_JOB_BATCH_SUCCESS = 'GET_JOB_BATCH_SUCCESS';
;
export const GET_JOB_BATCH_FAILURE = 'GET_JOB_BATCH_FAILURE';
;
// job_batch exec
export const EXEC_JOB_BATCH = 'EXEC_JOB_BATCH';
;
export const EXEC_JOB_BATCH_REQUEST = 'EXEC_JOB_BATCH_REQUEST';
;
export const EXEC_JOB_BATCH_SUCCESS = 'EXEC_JOB_BATCH_SUCCESS';
;
export const EXEC_JOB_BATCH_FAILURE = 'EXEC_JOB_BATCH_FAILURE';
;
// job_gists get
export const GET_JOB_GISTS = 'GET_JOB_GISTS';
;
export const GET_JOB_GISTS_REQUEST = 'GET_JOB_GISTS_REQUEST';
;
export const GET_JOB_GISTS_SUCCESS = 'GET_JOB_GISTS_SUCCESS';
;
export const GET_JOB_GISTS_FAILURE = 'GET_JOB_GISTS_FAILURE';
;
// job_gist create
export const CREATE_JOB_GIST = 'CREATE_JOB_GIST';
;
export const CREATE_JOB_GIST_REQUEST = 'CREATE_JOB_GIST_REQUEST';
;
export const CREATE_JOB_GIST_SUCCESS = 'CREATE_JOB_GIST_SUCCESS';
;
export const CREATE_JOB_GIST_FAILURE = 'CREATE_JOB_GIST_FAILURE';
;
// job_gist update
export const UPDATE_JOB_GIST = 'UPDATE_JOB_GIST';
;
export const UPDATE_JOB_GIST_REQUEST = 'UPDATE_JOB_GIST_REQUEST';
;
export const UPDATE_JOB_GIST_SUCCESS = 'UPDATE_JOB_GIST_SUCCESS';
;
export const UPDATE_JOB_GIST_FAILURE = 'UPDATE_JOB_GIST_FAILURE';
;
// job_gist delete
export const DELETE_JOB_GIST = 'DELETE_JOB_GIST';
;
export const DELETE_JOB_GIST_REQUEST = 'DELETE_JOB_GIST_REQUEST';
;
export const DELETE_JOB_GIST_SUCCESS = 'DELETE_JOB_GIST_SUCCESS';
;
export const DELETE_JOB_GIST_FAILURE = 'DELETE_JOB_GIST_FAILURE';
;
// job_gist get
export const GET_JOB_GIST = 'GET_JOB_GIST';
;
export const GET_JOB_GIST_REQUEST = 'GET_JOB_GIST_REQUEST';
;
export const GET_JOB_GIST_SUCCESS = 'GET_JOB_GIST_SUCCESS';
;
export const GET_JOB_GIST_FAILURE = 'GET_JOB_GIST_FAILURE';
;
// job_gist duplicate
export const DUPLICATE_JOB_GIST = 'DUPLICATE_JOB_GIST';
;
export const DUPLICATE_JOB_GIST_REQUEST = 'DUPLICATE_JOB_GIST_REQUEST';
;
export const DUPLICATE_JOB_GIST_SUCCESS = 'DUPLICATE_JOB_GIST_SUCCESS';
;
export const DUPLICATE_JOB_GIST_FAILURE = 'DUPLICATE_JOB_GIST_FAILURE';
;
// job_gist rename
export const RENAME_JOB_GIST = 'RENAME_JOB_GIST';
;
export const RENAME_JOB_GIST_REQUEST = 'RENAME_JOB_GIST_REQUEST';
;
export const RENAME_JOB_GIST_SUCCESS = 'RENAME_JOB_GIST_SUCCESS';
;
export const RENAME_JOB_GIST_FAILURE = 'RENAME_JOB_GIST_FAILURE';
;
// job_snippet wizzify
export const WIZZIFY_JOB_SNIPPET = 'WIZZIFY_JOB_SNIPPET';
;
export const WIZZIFY_JOB_SNIPPET_REQUEST = 'WIZZIFY_JOB_SNIPPET_REQUEST';
;
export const WIZZIFY_JOB_SNIPPET_SUCCESS = 'WIZZIFY_JOB_SNIPPET_SUCCESS';
;
export const WIZZIFY_JOB_SNIPPET_FAILURE = 'WIZZIFY_JOB_SNIPPET_FAILURE';
;
// job_navigations clear
export const CLEAR_JOB_NAVIGATIONS = 'CLEAR_JOB_NAVIGATIONS';
;
export const CLEAR_JOB_NAVIGATIONS_REQUEST = 'CLEAR_JOB_NAVIGATIONS_REQUEST';
;
export const CLEAR_JOB_NAVIGATIONS_SUCCESS = 'CLEAR_JOB_NAVIGATIONS_SUCCESS';
;
export const CLEAR_JOB_NAVIGATIONS_FAILURE = 'CLEAR_JOB_NAVIGATIONS_FAILURE';
;
export const CHANGED_JOB_GIST = 'CHANGED_JOB_GIST';
;
export const executeWfJob = (hash) => {
    return {
            type: EXECUTE_WFJOB, 
            [HTTP_REQUEST]: {
                types: [
                    EXECUTE_WFJOB_REQUEST, 
                    EXECUTE_WFJOB_SUCCESS, 
                    EXECUTE_WFJOB_FAILURE
                ], 
                url: '/api/wizzi/wfjob', 
                queryParams: {
                    hash: hash
                }, 
                method: 'get'
            }
        };
};
;
export const getJobBatches = () => {
    return {
            type: GET_JOB_BATCHES, 
            [HTTP_REQUEST]: {
                types: [
                    GET_JOB_BATCHES_REQUEST, 
                    GET_JOB_BATCHES_SUCCESS, 
                    GET_JOB_BATCHES_FAILURE
                ], 
                url: '/api/jobs/batches', 
                queryParams: {}, 
                method: 'get'
            }
        };
};
;
export const getJobBatch = (hash, version, xpackage) => {
    return {
            type: GET_JOB_BATCH, 
            [HTTP_REQUEST]: {
                types: [
                    GET_JOB_BATCH_REQUEST, 
                    GET_JOB_BATCH_SUCCESS, 
                    GET_JOB_BATCH_FAILURE
                ], 
                url: '/api/jobs/batch', 
                queryParams: {
                    hash: hash, 
                    version: version, 
                    xpackage: xpackage
                }, 
                method: 'get'
            }
        };
};
;
export const executeJobBatch = (hash) => {
    return {
            type: EXEC_JOB_BATCH, 
            [HTTP_REQUEST]: {
                types: [
                    EXEC_JOB_BATCH_REQUEST, 
                    EXEC_JOB_BATCH_SUCCESS, 
                    EXEC_JOB_BATCH_FAILURE
                ], 
                url: '/api/jobs/batch', 
                payload: {
                    hash: hash
                }, 
                method: 'post'
            }
        };
};
;
export const getJobGists = (kind) => {
    return {
            type: GET_JOB_GISTS, 
            [HTTP_REQUEST]: {
                types: [
                    GET_JOB_GISTS_REQUEST, 
                    GET_JOB_GISTS_SUCCESS, 
                    GET_JOB_GISTS_FAILURE
                ], 
                url: '/api/jobs/gists', 
                queryParams: {
                    kind: kind
                }, 
                method: 'get'
            }
        };
};
;
export const getJobGist = (hash) => {
    return {
            type: GET_JOB_GIST, 
            [HTTP_REQUEST]: {
                types: [
                    GET_JOB_GIST_REQUEST, 
                    GET_JOB_GIST_SUCCESS, 
                    GET_JOB_GIST_FAILURE
                ], 
                url: '/api/jobs/gist', 
                queryParams: {
                    hash: hash
                }, 
                method: 'get'
            }
        };
};
;
export const changedJobGist = (content) => {
    return {
            type: CHANGED_JOB_GIST, 
            content: content
        };
};
;
export const createJobGist = (kind, name, schema, content) => {
    return {
            type: CREATE_JOB_GIST, 
            [HTTP_REQUEST]: {
                types: [
                    CREATE_JOB_GIST_REQUEST, 
                    CREATE_JOB_GIST_SUCCESS, 
                    CREATE_JOB_GIST_FAILURE
                ], 
                url: '/api/jobs/gist', 
                payload: {
                    name: name, 
                    schema: schema, 
                    kind: kind, 
                    content: content
                }, 
                method: 'post'
            }
        };
};
;
export const updateJobGist = (hash, content) => {
    return {
            type: UPDATE_JOB_GIST, 
            [HTTP_REQUEST]: {
                types: [
                    UPDATE_JOB_GIST_REQUEST, 
                    UPDATE_JOB_GIST_SUCCESS, 
                    UPDATE_JOB_GIST_FAILURE
                ], 
                url: '/api/jobs/gist', 
                payload: {
                    hash: hash, 
                    content: content
                }, 
                method: 'put', 
                delayId: UPDATE_JOB_GIST + hash, 
                delay: 4000
            }
        };
};
;
export const duplicateJobGist = (hash, newname) => {
    return {
            type: DUPLICATE_JOB_GIST, 
            [HTTP_REQUEST]: {
                types: [
                    DUPLICATE_JOB_GIST_REQUEST, 
                    DUPLICATE_JOB_GIST_SUCCESS, 
                    DUPLICATE_JOB_GIST_FAILURE
                ], 
                url: '/api/jobs/gist/duplicate', 
                payload: {
                    hash: hash, 
                    newname: newname
                }, 
                method: 'post'
            }
        };
};
;
export const renameJobGist = (hash, newname) => {
    return {
            type: RENAME_JOB_GIST, 
            [HTTP_REQUEST]: {
                types: [
                    RENAME_JOB_GIST_REQUEST, 
                    RENAME_JOB_GIST_SUCCESS, 
                    RENAME_JOB_GIST_FAILURE
                ], 
                url: '/api/jobs/gist/rename', 
                payload: {
                    hash: hash, 
                    newname: newname
                }, 
                method: 'post'
            }
        };
};
;
export const deleteJobGist = (hash) => {
    return {
            type: DELETE_JOB_GIST, 
            [HTTP_REQUEST]: {
                types: [
                    DELETE_JOB_GIST_REQUEST, 
                    DELETE_JOB_GIST_SUCCESS, 
                    DELETE_JOB_GIST_FAILURE
                ], 
                url: '/api/jobs/gist', 
                payload: {
                    hash: hash
                }, 
                method: 'delete'
            }
        };
};
;
export const clearJobNavigations = () => {
    return {
            type: CLEAR_JOB_NAVIGATIONS
        };
};
;
export const wizzifySnippet = (hash) => {
    return {
            type: WIZZIFY_JOB_SNIPPET, 
            hash: hash, 
            [HTTP_REQUEST]: {
                types: [
                    WIZZIFY_JOB_SNIPPET_REQUEST, 
                    WIZZIFY_JOB_SNIPPET_SUCCESS, 
                    WIZZIFY_JOB_SNIPPET_FAILURE
                ], 
                url: '/api/jobs/wizzify', 
                queryParams: {
                    hash: hash
                }, 
                method: 'get'
            }
        };
};
;
// snippet transpile
export const TRANSPILE_SNIPPET = 'TRANSPILE_SNIPPET';
;
export const TRANSPILE_SNIPPET_REQUEST = 'TRANSPILE_SNIPPET_REQUEST';
;
export const TRANSPILE_SNIPPET_SUCCESS = 'TRANSPILE_SNIPPET_SUCCESS';
;
export const TRANSPILE_SNIPPET_FAILURE = 'TRANSPILE_SNIPPET_FAILURE';
;
// snippet_ast get
export const GET_SNIPPET_AST = 'GET_SNIPPET_AST';
;
export const GET_SNIPPET_AST_REQUEST = 'GET_SNIPPET_AST_REQUEST';
;
export const GET_SNIPPET_AST_SUCCESS = 'GET_SNIPPET_AST_SUCCESS';
;
export const GET_SNIPPET_AST_FAILURE = 'GET_SNIPPET_AST_FAILURE';
;
// snippet flow
export const FLOW_SNIPPET = 'FLOW_SNIPPET';
;
export const FLOW_SNIPPET_REQUEST = 'FLOW_SNIPPET_REQUEST';
;
export const FLOW_SNIPPET_SUCCESS = 'FLOW_SNIPPET_SUCCESS';
;
export const FLOW_SNIPPET_FAILURE = 'FLOW_SNIPPET_FAILURE';
;
// snippet lint
export const LINT_SNIPPET = 'LINT_SNIPPET';
;
export const LINT_SNIPPET_REQUEST = 'LINT_SNIPPET_REQUEST';
;
export const LINT_SNIPPET_SUCCESS = 'LINT_SNIPPET_SUCCESS';
;
export const LINT_SNIPPET_FAILURE = 'LINT_SNIPPET_FAILURE';
;
// snippet prettier
export const PRETTIER_SNIPPET = 'PRETTIER_SNIPPET';
;
export const PRETTIER_SNIPPET_REQUEST = 'PRETTIER_SNIPPET_REQUEST';
;
export const PRETTIER_SNIPPET_SUCCESS = 'PRETTIER_SNIPPET_SUCCESS';
;
export const PRETTIER_SNIPPET_FAILURE = 'PRETTIER_SNIPPET_FAILURE';
;
export const transpileSnippet = (hash) => {
    return {
            type: TRANSPILE_SNIPPET, 
            [HTTP_REQUEST]: {
                types: [
                    TRANSPILE_SNIPPET_REQUEST, 
                    TRANSPILE_SNIPPET_SUCCESS, 
                    TRANSPILE_SNIPPET_FAILURE
                ], 
                url: '/api/build/transpile', 
                queryParams: {
                    hash: hash
                }, 
                method: 'get'
            }
        };
};
;
export const getSnippetAst = (hash) => {
    return {
            type: GET_SNIPPET_AST, 
            [HTTP_REQUEST]: {
                types: [
                    GET_SNIPPET_AST_REQUEST, 
                    GET_SNIPPET_AST_SUCCESS, 
                    GET_SNIPPET_AST_FAILURE
                ], 
                url: '/api/build/ast', 
                queryParams: {
                    hash: hash
                }, 
                method: 'get'
            }
        };
};
;
export const flowSnippet = (hash) => {
    return {
            type: FLOW_SNIPPET, 
            [HTTP_REQUEST]: {
                types: [
                    FLOW_SNIPPET_REQUEST, 
                    FLOW_SNIPPET_SUCCESS, 
                    FLOW_SNIPPET_FAILURE
                ], 
                url: '/api/build/flow', 
                queryParams: {
                    hash: hash
                }, 
                method: 'get'
            }
        };
};
;
export const lintSnippet = (hash) => {
    return {
            type: LINT_SNIPPET, 
            [HTTP_REQUEST]: {
                types: [
                    LINT_SNIPPET_REQUEST, 
                    LINT_SNIPPET_SUCCESS, 
                    LINT_SNIPPET_FAILURE
                ], 
                url: '/api/build/lint', 
                queryParams: {
                    hash: hash
                }, 
                method: 'get'
            }
        };
};
;
export const prettierSnippet = (hash) => {
    return {
            type: PRETTIER_SNIPPET, 
            [HTTP_REQUEST]: {
                types: [
                    PRETTIER_SNIPPET_REQUEST, 
                    PRETTIER_SNIPPET_SUCCESS, 
                    PRETTIER_SNIPPET_FAILURE
                ], 
                url: '/api/build/prettier', 
                queryParams: {
                    hash: hash
                }, 
                method: 'get'
            }
        };
};
;
// repo_user get
export const GET_REPO_USER = 'GET_REPO_USER';
;
export const GET_REPO_USER_REQUEST = 'GET_REPO_USER_REQUEST';
;
export const GET_REPO_USER_SUCCESS = 'GET_REPO_USER_SUCCESS';
;
export const GET_REPO_USER_FAILURE = 'GET_REPO_USER_FAILURE';
;
// repo_project get
export const GET_REPO_PROJECT = 'GET_REPO_PROJECT';
;
export const GET_REPO_PROJECT_REQUEST = 'GET_REPO_PROJECT_REQUEST';
;
export const GET_REPO_PROJECT_SUCCESS = 'GET_REPO_PROJECT_SUCCESS';
;
export const GET_REPO_PROJECT_FAILURE = 'GET_REPO_PROJECT_FAILURE';
;
// repo_project create
export const CREATE_REPO_PROJECT = 'CREATE_REPO_PROJECT';
;
export const CREATE_REPO_PROJECT_REQUEST = 'CREATE_REPO_PROJECT_REQUEST';
;
export const CREATE_REPO_PROJECT_SUCCESS = 'CREATE_REPO_PROJECT_SUCCESS';
;
export const CREATE_REPO_PROJECT_FAILURE = 'CREATE_REPO_PROJECT_FAILURE';
;
// repo_folder get
export const GET_REPO_FOLDER = 'GET_REPO_FOLDER';
;
export const GET_REPO_FOLDER_REQUEST = 'GET_REPO_FOLDER_REQUEST';
;
export const GET_REPO_FOLDER_SUCCESS = 'GET_REPO_FOLDER_SUCCESS';
;
export const GET_REPO_FOLDER_FAILURE = 'GET_REPO_FOLDER_FAILURE';
;
// repo_folder create
export const CREATE_REPO_FOLDER = 'CREATE_REPO_FOLDER';
;
export const CREATE_REPO_FOLDER_REQUEST = 'CREATE_REPO_FOLDER_REQUEST';
;
export const CREATE_REPO_FOLDER_SUCCESS = 'CREATE_REPO_FOLDER_SUCCESS';
;
export const CREATE_REPO_FOLDER_FAILURE = 'CREATE_REPO_FOLDER_FAILURE';
;
// repo_folder delete
export const DELETE_REPO_FOLDER = 'DELETE_REPO_FOLDER';
;
export const DELETE_REPO_FOLDER_REQUEST = 'DELETE_REPO_FOLDER_REQUEST';
;
export const DELETE_REPO_FOLDER_SUCCESS = 'DELETE_REPO_FOLDER_SUCCESS';
;
export const DELETE_REPO_FOLDER_FAILURE = 'DELETE_REPO_FOLDER_FAILURE';
;
// repo_document get
export const GET_REPO_DOCUMENT = 'GET_REPO_DOCUMENT';
;
export const GET_REPO_DOCUMENT_REQUEST = 'GET_REPO_DOCUMENT_REQUEST';
;
export const GET_REPO_DOCUMENT_SUCCESS = 'GET_REPO_DOCUMENT_SUCCESS';
;
export const GET_REPO_DOCUMENT_FAILURE = 'GET_REPO_DOCUMENT_FAILURE';
;
// repo_document create
export const CREATE_REPO_DOCUMENT = 'CREATE_REPO_DOCUMENT';
;
export const CREATE_REPO_DOCUMENT_REQUEST = 'CREATE_REPO_DOCUMENT_REQUEST';
;
export const CREATE_REPO_DOCUMENT_SUCCESS = 'CREATE_REPO_DOCUMENT_SUCCESS';
;
export const CREATE_REPO_DOCUMENT_FAILURE = 'CREATE_REPO_DOCUMENT_FAILURE';
;
// repo_document update
export const UPDATE_REPO_DOCUMENT = 'UPDATE_REPO_DOCUMENT';
;
export const UPDATE_REPO_DOCUMENT_REQUEST = 'UPDATE_REPO_DOCUMENT_REQUEST';
;
export const UPDATE_REPO_DOCUMENT_SUCCESS = 'UPDATE_REPO_DOCUMENT_SUCCESS';
;
export const UPDATE_REPO_DOCUMENT_FAILURE = 'UPDATE_REPO_DOCUMENT_FAILURE';
;
// repo_document delete
export const DELETE_REPO_DOCUMENT = 'DELETE_REPO_DOCUMENT';
;
export const DELETE_REPO_DOCUMENT_REQUEST = 'DELETE_REPO_DOCUMENT_REQUEST';
;
export const DELETE_REPO_DOCUMENT_SUCCESS = 'DELETE_REPO_DOCUMENT_SUCCESS';
;
export const DELETE_REPO_DOCUMENT_FAILURE = 'DELETE_REPO_DOCUMENT_FAILURE';
;
// repo_fsitem duplicate
export const DUPLICATE_REPO_FSITEM = 'DUPLICATE_REPO_FSITEM';
;
export const DUPLICATE_REPO_FSITEM_REQUEST = 'DUPLICATE_REPO_FSITEM_REQUEST';
;
export const DUPLICATE_REPO_FSITEM_SUCCESS = 'DUPLICATE_REPO_FSITEM_SUCCESS';
;
export const DUPLICATE_REPO_FSITEM_FAILURE = 'DUPLICATE_REPO_FSITEM_FAILURE';
;
// repo_fsitem rename
export const RENAME_REPO_FSITEM = 'RENAME_REPO_FSITEM';
;
export const RENAME_REPO_FSITEM_REQUEST = 'RENAME_REPO_FSITEM_REQUEST';
;
export const RENAME_REPO_FSITEM_SUCCESS = 'RENAME_REPO_FSITEM_SUCCESS';
;
export const RENAME_REPO_FSITEM_FAILURE = 'RENAME_REPO_FSITEM_FAILURE';
;
export const getRepoUser = (userId) => {
    return {
            type: GET_REPO_USER, 
            [HTTP_REQUEST]: {
                types: [
                    GET_REPO_USER_REQUEST, 
                    GET_REPO_USER_SUCCESS, 
                    GET_REPO_USER_FAILURE
                ], 
                url: '/repo/' + userId, 
                method: 'get', 
                queryParams: {}
            }
        };
};
;
export const getRepoProject = (userId, projectId) => {
    return {
            type: GET_REPO_PROJECT, 
            [HTTP_REQUEST]: {
                types: [
                    GET_REPO_PROJECT_REQUEST, 
                    GET_REPO_PROJECT_SUCCESS, 
                    GET_REPO_PROJECT_FAILURE
                ], 
                url: '/repo/' + userId + '/' + projectId, 
                method: 'get', 
                queryParams: {}
            }
        };
};
;
export const getRepoFolder = (userId, projectId, folderPath) => {
    console.log('actions.repo.getRepoFolder.url', '/repo/' + userId + '/' + projectId + '/' + folderPath);
    return {
            type: GET_REPO_PROJECT, 
            [HTTP_REQUEST]: {
                types: [
                    GET_REPO_PROJECT_REQUEST, 
                    GET_REPO_PROJECT_SUCCESS, 
                    GET_REPO_PROJECT_FAILURE
                ], 
                url: '/repo/' + userId + '/' + projectId + '/' + folderPath, 
                method: 'get', 
                queryParams: {}
            }
        };
};
;
export const getRepoDocument = (userId, projectId, documentPath) => {
    return {
            type: GET_REPO_DOCUMENT, 
            [HTTP_REQUEST]: {
                types: [
                    GET_REPO_DOCUMENT_REQUEST, 
                    GET_REPO_DOCUMENT_SUCCESS, 
                    GET_REPO_DOCUMENT_FAILURE
                ], 
                url: '/repo/' + userId + '/' + projectId + '/' + documentPath, 
                method: 'get', 
                queryParams: {}
            }
        };
};
;
export const createRepoProject = (userId, projectId, pjtmpl, options) => {
    return {
            type: CREATE_REPO_PROJECT, 
            [HTTP_REQUEST]: {
                types: [
                    CREATE_REPO_PROJECT_REQUEST, 
                    CREATE_REPO_PROJECT_SUCCESS, 
                    CREATE_REPO_PROJECT_FAILURE
                ], 
                url: '/repo/' + userId + '/' + projectId, 
                method: 'post', 
                payload: {
                    pjtmpl: pjtmpl, 
                    options: options
                }
            }
        };
};
;
export const createRepoFolder = (userId, projectId, folderPath) => {
    console.log('actions.repo.createRepoFolder.url', '/repo/' + userId + '/' + projectId + '/' + folderPath);
    return {
            type: CREATE_REPO_FOLDER, 
            [HTTP_REQUEST]: {
                types: [
                    CREATE_REPO_FOLDER_REQUEST, 
                    CREATE_REPO_FOLDER_SUCCESS, 
                    CREATE_REPO_FOLDER_FAILURE
                ], 
                url: '/repo/' + userId + '/' + projectId + '/' + folderPath, 
                method: 'post', 
                payload: {
                    kind: KIND_FOLDER
                }
            }
        };
};
;
export const deleteRepoFolder = (userId, projectId, folderPath) => {
    console.log('actions.repo.deleteRepoFolder.url', '/repo/' + userId + '/' + projectId + '/' + folderPath);
    return {
            type: DELETE_REPO_FOLDER, 
            [HTTP_REQUEST]: {
                types: [
                    DELETE_REPO_FOLDER_REQUEST, 
                    DELETE_REPO_FOLDER_SUCCESS, 
                    DELETE_REPO_FOLDER_FAILURE
                ], 
                url: '/repo/' + userId + '/' + projectId + '/' + folderPath, 
                method: 'delete', 
                payload: {
                    kind: KIND_FOLDER
                }
            }
        };
};
;
export const createRepoDocument = (userId, projectId, documentPath, content) => {
    return {
            type: CREATE_REPO_DOCUMENT, 
            [HTTP_REQUEST]: {
                types: [
                    CREATE_REPO_DOCUMENT_REQUEST, 
                    CREATE_REPO_DOCUMENT_SUCCESS, 
                    CREATE_REPO_DOCUMENT_FAILURE
                ], 
                url: '/repo/' + userId + '/' + projectId + '/' + documentPath, 
                method: 'post', 
                payload: {
                    kind: KIND_FILE, 
                    content: content
                }
            }
        };
};
;
export const updateRepoDocument = (userId, projectId, documentPath, content) => {
    return {
            type: UPDATE_REPO_DOCUMENT, 
            [HTTP_REQUEST]: {
                types: [
                    UPDATE_REPO_DOCUMENT_REQUEST, 
                    UPDATE_REPO_DOCUMENT_SUCCESS, 
                    UPDATE_REPO_DOCUMENT_FAILURE
                ], 
                url: '/repo/' + userId + '/' + projectId + '/' + documentPath, 
                method: 'put', 
                payload: {
                    kind: KIND_FILE, 
                    content: content
                }, 
                delayId: UPDATE_REPO_DOCUMENT + userId + projectId + documentPath, 
                delay: 2000
            }
        };
};
;
export const deleteRepoDocument = (userId, projectId, documentPath) => {
    console.log('actions.repo.deleteRepoDocument.url', '/repo/' + userId + '/' + projectId + '/' + documentPath);
    return {
            type: DELETE_REPO_DOCUMENT, 
            [HTTP_REQUEST]: {
                types: [
                    DELETE_REPO_DOCUMENT_REQUEST, 
                    DELETE_REPO_DOCUMENT_SUCCESS, 
                    DELETE_REPO_DOCUMENT_FAILURE
                ], 
                url: '/repo/' + userId + '/' + projectId + '/' + documentPath, 
                method: 'delete', 
                payload: {
                    kind: KIND_FILE
                }
            }
        };
};
;
export const duplicateFsItem = (kind, fullPath, newName) => {
    console.log('actions.repo.duplicateFsItem.url', '/repo/' + fullPath);
    return {
            type: DUPLICATE_REPO_FSITEM, 
            [HTTP_REQUEST]: {
                types: [
                    DUPLICATE_REPO_FSITEM_REQUEST, 
                    DUPLICATE_REPO_FSITEM_SUCCESS, 
                    DUPLICATE_REPO_FSITEM_FAILURE
                ], 
                url: '/repo/' + fullPath, 
                method: 'post', 
                payload: {
                    kind: kind, 
                    action: 'duplicate', 
                    newname: newName
                }
            }
        };
};
;
export const renameFsItem = (kind, fullPath, newName) => {
    console.log('actions.repo.renameFsItem.url', '/repo/' + fullPath);
    return {
            type: RENAME_REPO_FSITEM, 
            [HTTP_REQUEST]: {
                types: [
                    RENAME_REPO_FSITEM_REQUEST, 
                    RENAME_REPO_FSITEM_SUCCESS, 
                    RENAME_REPO_FSITEM_FAILURE
                ], 
                url: '/repo/' + fullPath, 
                method: 'post', 
                payload: {
                    kind: kind, 
                    action: 'rename', 
                    newname: newName
                }
            }
        };
};
;
// repo_fsitems paste
export const PASTE_REPO_FSITEMS = 'PASTE_REPO_FSITEMS';
;
export const PASTE_REPO_FSITEMS_REQUEST = 'PASTE_REPO_FSITEMS_REQUEST';
;
export const PASTE_REPO_FSITEMS_SUCCESS = 'PASTE_REPO_FSITEMS_SUCCESS';
;
export const PASTE_REPO_FSITEMS_FAILURE = 'PASTE_REPO_FSITEMS_FAILURE';
;
export const COPY_CUT_REPO_FSITEMS = 'COPY_CUT_REPO_FSITEMS';
;
export const copyCutRepoFsItems = (copyCut, sourcePath, selectedItems) => {
    return {
            type: COPY_CUT_REPO_FSITEMS, 
            copyCut: copyCut, 
            sourcePath: sourcePath, 
            selectedItems: selectedItems
        };
};
;
export const pasteRepoFsItems = (copyCut, userId, projectId, folderPath, selectedItems) => {
    return {
            type: PASTE_REPO_FSITEMS, 
            [HTTP_REQUEST]: {
                types: [
                    PASTE_REPO_FSITEMS_REQUEST, 
                    PASTE_REPO_FSITEMS_SUCCESS, 
                    PASTE_REPO_FSITEMS_FAILURE
                ], 
                url: '/repo/' + userId + '/' + projectId + '/' + folderPath, 
                method: 'put', 
                payload: {
                    kind: KIND_COPYCUT, 
                    copyCut: copyCut, 
                    fsitems: selectedItems
                }
            }
        };
};
;
// repo_batch delete
export const DELETE_REPO_BATCH = 'DELETE_REPO_BATCH';
;
export const DELETE_REPO_BATCH_REQUEST = 'DELETE_REPO_BATCH_REQUEST';
;
export const DELETE_REPO_BATCH_SUCCESS = 'DELETE_REPO_BATCH_SUCCESS';
;
export const DELETE_REPO_BATCH_FAILURE = 'DELETE_REPO_BATCH_FAILURE';
;
export const deleteRepoBatch = (currentUserId, currentProjectId, currentItemPath, selectedItems) => {
    return {
            type: DELETE_REPO_BATCH, 
            [HTTP_REQUEST]: {
                types: [
                    DELETE_REPO_BATCH_REQUEST, 
                    DELETE_REPO_BATCH_SUCCESS, 
                    DELETE_REPO_BATCH_FAILURE
                ], 
                url: '/repo/batch', 
                method: 'delete', 
                payload: {
                    kind: KIND_BATCH, 
                    currentPath: {
                        userId: currentUserId, 
                        projectId: currentProjectId, 
                        itemPath: currentItemPath
                    }, 
                    fsitems: selectedItems
                }
            }
        };
};
;

/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-studio\src\ittf\webpacks\ittfeditor\ittf\webpacks\ittfeditor\src\store\actions\index.js.ittf
    utc time: Thu, 24 May 2018 09:14:50 GMT
*/
'use strict';
import { HTTP_REQUEST } from '../../middleware/config';



// load
const INITIAL_LOAD = 'INITIAL_LOAD';
const INITIAL_LOAD_REQUEST = 'INITIAL_LOAD_REQUEST';
const INITIAL_LOAD_SUCCESS = 'INITIAL_LOAD_SUCCESS';
const INITIAL_LOAD_FAILURE = 'INITIAL_LOAD_FAILURE';

const initialLoad = () => {
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


// User accounts are not created neither managed by the Ittf editor.
// User actions retrieve and modify user state only.


// project
const SELECT_PROJECT = 'SELECT_PROJECT';
const SELECT_PROJECT_REQUEST = 'SELECT_PROJECT_REQUEST';
const SELECT_PROJECT_SUCCESS = 'SELECT_PROJECT_SUCCESS';
const SELECT_PROJECT_FAILURE = 'SELECT_PROJECT_FAILURE';

const selectProject = (project) => {
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

// schemas
const GET_SCHEMAS = 'GET_SCHEMAS';
const GET_SCHEMAS_REQUEST = 'GET_SCHEMAS_REQUEST';
const GET_SCHEMAS_SUCCESS = 'GET_SCHEMAS_SUCCESS';
const GET_SCHEMAS_FAILURE = 'GET_SCHEMAS_FAILURE';
const getSchemas = () => {
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


// schema
const GET_SCHEMA = 'GET_SCHEMA';
const GET_SCHEMA_REQUEST = 'GET_SCHEMA_REQUEST';
const GET_SCHEMA_SUCCESS = 'GET_SCHEMA_SUCCESS';
const GET_SCHEMA_FAILURE = 'GET_SCHEMA_FAILURE';
const GETJSONDOC_SCHEMA = 'GETJSONDOC_SCHEMA';
const GETJSONDOC_SCHEMA_REQUEST = 'GETJSONDOC_SCHEMA_REQUEST';
const GETJSONDOC_SCHEMA_SUCCESS = 'GETJSONDOC_SCHEMA_SUCCESS';
const GETJSONDOC_SCHEMA_FAILURE = 'GETJSONDOC_SCHEMA_FAILURE';

const getSchema = (schemaUri) => {
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

const getSchemaJsonDoc = (schemaUri) => {
    return {
            type: GETJSONDOC_SCHEMA, 
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



// projects
const GET_PROJECTS = 'GET_PROJECTS';
const GET_PROJECTS_REQUEST = 'GET_PROJECTS_REQUEST';
const GET_PROJECTS_SUCCESS = 'GET_PROJECTS_SUCCESS';
const GET_PROJECTS_FAILURE = 'GET_PROJECTS_FAILURE';

const getProjects = () => {
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
                queryParams: {
                    project: project
                }
            }
        };
};


// project
const CREATE_PROJECT = 'CREATE_PROJECT';
const CREATE_PROJECT_REQUEST = 'CREATE_PROJECT_REQUEST';
const CREATE_PROJECT_SUCCESS = 'CREATE_PROJECT_SUCCESS';
const CREATE_PROJECT_FAILURE = 'CREATE_PROJECT_FAILURE';

const createProject = (project) => {
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


// documents
const GET_DOCUMENTS = 'GET_DOCUMENTS';
const GET_DOCUMENTS_REQUEST = 'GET_DOCUMENTS_REQUEST';
const GET_DOCUMENTS_SUCCESS = 'GET_DOCUMENTS_SUCCESS';
const GET_DOCUMENTS_FAILURE = 'GET_DOCUMENTS_FAILURE';

const getDocuments = (project) => {
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


// document
const CREATE_DOCUMENT = 'CREATE_DOCUMENT';
const CREATE_DOCUMENT_REQUEST = 'CREATE_DOCUMENT_REQUEST';
const CREATE_DOCUMENT_SUCCESS = 'CREATE_DOCUMENT_SUCCESS';
const CREATE_DOCUMENT_FAILURE = 'CREATE_DOCUMENT_FAILURE';
const SELECT_DOCUMENT = 'SELECT_DOCUMENT';
const SELECT_DOCUMENT_REQUEST = 'SELECT_DOCUMENT_REQUEST';
const SELECT_DOCUMENT_SUCCESS = 'SELECT_DOCUMENT_SUCCESS';
const SELECT_DOCUMENT_FAILURE = 'SELECT_DOCUMENT_FAILURE';
const UPDATE_DOCUMENT = 'UPDATE_DOCUMENT';
const UPDATE_DOCUMENT_REQUEST = 'UPDATE_DOCUMENT_REQUEST';
const UPDATE_DOCUMENT_SUCCESS = 'UPDATE_DOCUMENT_SUCCESS';
const UPDATE_DOCUMENT_FAILURE = 'UPDATE_DOCUMENT_FAILURE';

const createDocument = (name, schema, folder, project) => {
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

const selectDocument = (uri, schema) => {
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

const DOCUMENT_CHANGED = 'DOCUMENT_CHANGED';

const changeDocument = (newContent) => {
    return {
            type: DOCUMENT_CHANGED, 
            newContent: newContent
        };
};

const updateDocument = (uri, newIttfContent) => {
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


// fragments
const GET_FRAGMENTS = 'GET_FRAGMENTS';
const GET_FRAGMENTS_REQUEST = 'GET_FRAGMENTS_REQUEST';
const GET_FRAGMENTS_SUCCESS = 'GET_FRAGMENTS_SUCCESS';
const GET_FRAGMENTS_FAILURE = 'GET_FRAGMENTS_FAILURE';

const getFragments = (project) => {
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


// fragment
const CREATE_FRAGMENT = 'CREATE_FRAGMENT';
const CREATE_FRAGMENT_REQUEST = 'CREATE_FRAGMENT_REQUEST';
const CREATE_FRAGMENT_SUCCESS = 'CREATE_FRAGMENT_SUCCESS';
const CREATE_FRAGMENT_FAILURE = 'CREATE_FRAGMENT_FAILURE';
const SELECT_FRAGMENT = 'SELECT_FRAGMENT';
const SELECT_FRAGMENT_REQUEST = 'SELECT_FRAGMENT_REQUEST';
const SELECT_FRAGMENT_SUCCESS = 'SELECT_FRAGMENT_SUCCESS';
const SELECT_FRAGMENT_FAILURE = 'SELECT_FRAGMENT_FAILURE';
const UPDATE_FRAGMENT = 'UPDATE_FRAGMENT';
const UPDATE_FRAGMENT_REQUEST = 'UPDATE_FRAGMENT_REQUEST';
const UPDATE_FRAGMENT_SUCCESS = 'UPDATE_FRAGMENT_SUCCESS';
const UPDATE_FRAGMENT_FAILURE = 'UPDATE_FRAGMENT_FAILURE';

const createFragment = (name, schema, folder, project) => {
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

const selectFragment = (uri, schema) => {
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

const FRAGMENT_CHANGED = 'FRAGMENT_CHANGED';

const changeFragment = (newContent) => {
    return {
            type: FRAGMENT_CHANGED, 
            newContent: newContent
        };
};

const updateFragment = (uri, newIttfContent) => {
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


// artifact
const GENERATE_ARTIFACT = 'GENERATE_ARTIFACT';
const GENERATE_ARTIFACT_REQUEST = 'GENERATE_ARTIFACT_REQUEST';
const GENERATE_ARTIFACT_SUCCESS = 'GENERATE_ARTIFACT_SUCCESS';
const GENERATE_ARTIFACT_FAILURE = 'GENERATE_ARTIFACT_FAILURE';

const generateArtifact = (documentUri, artifactName) => {
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


const TOGGLE_THEME_SHADE = 'TOGGLE_THEME_SHADE';

module.exports = {
    INITIAL_LOAD: INITIAL_LOAD,
    INITIAL_LOAD_REQUEST: INITIAL_LOAD_REQUEST,
    INITIAL_LOAD_SUCCESS: INITIAL_LOAD_SUCCESS,
    INITIAL_LOAD_FAILURE: INITIAL_LOAD_FAILURE,
    initialLoad: initialLoad,
    SELECT_PROJECT: SELECT_PROJECT,
    SELECT_PROJECT_REQUEST: SELECT_PROJECT_REQUEST,
    SELECT_PROJECT_SUCCESS: SELECT_PROJECT_SUCCESS,
    SELECT_PROJECT_FAILURE: SELECT_PROJECT_FAILURE,
    selectProject: selectProject,
    GET_SCHEMAS: GET_SCHEMAS,
    GET_SCHEMAS_REQUEST: GET_SCHEMAS_REQUEST,
    GET_SCHEMAS_SUCCESS: GET_SCHEMAS_SUCCESS,
    GET_SCHEMAS_FAILURE: GET_SCHEMAS_FAILURE,
    getSchemas: getSchemas,
    GET_SCHEMA: GET_SCHEMA,
    GET_SCHEMA_REQUEST: GET_SCHEMA_REQUEST,
    GET_SCHEMA_SUCCESS: GET_SCHEMA_SUCCESS,
    GET_SCHEMA_FAILURE: GET_SCHEMA_FAILURE,
    GETJSONDOC_SCHEMA: GETJSONDOC_SCHEMA,
    GETJSONDOC_SCHEMA_REQUEST: GETJSONDOC_SCHEMA_REQUEST,
    GETJSONDOC_SCHEMA_SUCCESS: GETJSONDOC_SCHEMA_SUCCESS,
    GETJSONDOC_SCHEMA_FAILURE: GETJSONDOC_SCHEMA_FAILURE,
    getSchema: getSchema,
    getSchemaJsonDoc: getSchemaJsonDoc,
    GET_PROJECTS: GET_PROJECTS,
    GET_PROJECTS_REQUEST: GET_PROJECTS_REQUEST,
    GET_PROJECTS_SUCCESS: GET_PROJECTS_SUCCESS,
    GET_PROJECTS_FAILURE: GET_PROJECTS_FAILURE,
    getProjects: getProjects,
    CREATE_PROJECT: CREATE_PROJECT,
    CREATE_PROJECT_REQUEST: CREATE_PROJECT_REQUEST,
    CREATE_PROJECT_SUCCESS: CREATE_PROJECT_SUCCESS,
    CREATE_PROJECT_FAILURE: CREATE_PROJECT_FAILURE,
    createProject: createProject,
    GET_DOCUMENTS: GET_DOCUMENTS,
    GET_DOCUMENTS_REQUEST: GET_DOCUMENTS_REQUEST,
    GET_DOCUMENTS_SUCCESS: GET_DOCUMENTS_SUCCESS,
    GET_DOCUMENTS_FAILURE: GET_DOCUMENTS_FAILURE,
    getDocuments: getDocuments,
    CREATE_DOCUMENT: CREATE_DOCUMENT,
    CREATE_DOCUMENT_REQUEST: CREATE_DOCUMENT_REQUEST,
    CREATE_DOCUMENT_SUCCESS: CREATE_DOCUMENT_SUCCESS,
    CREATE_DOCUMENT_FAILURE: CREATE_DOCUMENT_FAILURE,
    SELECT_DOCUMENT: SELECT_DOCUMENT,
    SELECT_DOCUMENT_REQUEST: SELECT_DOCUMENT_REQUEST,
    SELECT_DOCUMENT_SUCCESS: SELECT_DOCUMENT_SUCCESS,
    SELECT_DOCUMENT_FAILURE: SELECT_DOCUMENT_FAILURE,
    UPDATE_DOCUMENT: UPDATE_DOCUMENT,
    UPDATE_DOCUMENT_REQUEST: UPDATE_DOCUMENT_REQUEST,
    UPDATE_DOCUMENT_SUCCESS: UPDATE_DOCUMENT_SUCCESS,
    UPDATE_DOCUMENT_FAILURE: UPDATE_DOCUMENT_FAILURE,
    createDocument: createDocument,
    selectDocument: selectDocument,
    DOCUMENT_CHANGED: DOCUMENT_CHANGED,
    changeDocument: changeDocument,
    updateDocument: updateDocument,
    GET_FRAGMENTS: GET_FRAGMENTS,
    GET_FRAGMENTS_REQUEST: GET_FRAGMENTS_REQUEST,
    GET_FRAGMENTS_SUCCESS: GET_FRAGMENTS_SUCCESS,
    GET_FRAGMENTS_FAILURE: GET_FRAGMENTS_FAILURE,
    getFragments: getFragments,
    CREATE_FRAGMENT: CREATE_FRAGMENT,
    CREATE_FRAGMENT_REQUEST: CREATE_FRAGMENT_REQUEST,
    CREATE_FRAGMENT_SUCCESS: CREATE_FRAGMENT_SUCCESS,
    CREATE_FRAGMENT_FAILURE: CREATE_FRAGMENT_FAILURE,
    SELECT_FRAGMENT: SELECT_FRAGMENT,
    SELECT_FRAGMENT_REQUEST: SELECT_FRAGMENT_REQUEST,
    SELECT_FRAGMENT_SUCCESS: SELECT_FRAGMENT_SUCCESS,
    SELECT_FRAGMENT_FAILURE: SELECT_FRAGMENT_FAILURE,
    UPDATE_FRAGMENT: UPDATE_FRAGMENT,
    UPDATE_FRAGMENT_REQUEST: UPDATE_FRAGMENT_REQUEST,
    UPDATE_FRAGMENT_SUCCESS: UPDATE_FRAGMENT_SUCCESS,
    UPDATE_FRAGMENT_FAILURE: UPDATE_FRAGMENT_FAILURE,
    createFragment: createFragment,
    selectFragment: selectFragment,
    FRAGMENT_CHANGED: FRAGMENT_CHANGED,
    changeFragment: changeFragment,
    updateFragment: updateFragment,
    GENERATE_ARTIFACT: GENERATE_ARTIFACT,
    GENERATE_ARTIFACT_REQUEST: GENERATE_ARTIFACT_REQUEST,
    GENERATE_ARTIFACT_SUCCESS: GENERATE_ARTIFACT_SUCCESS,
    GENERATE_ARTIFACT_FAILURE: GENERATE_ARTIFACT_FAILURE,
    generateArtifact: generateArtifact,
    TOGGLE_THEME_SHADE: TOGGLE_THEME_SHADE
};

/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-app\wizzi\ittf\src\store\reducers\wizzipackagesreducer.js.ittf
    utc time: Sat, 06 Oct 2018 05:59:03 GMT
*/
'use strict';
import { GET_KERNEL_PACKAGES, GET_KERNEL_PACKAGES_REQUEST, GET_KERNEL_PACKAGES_SUCCESS, GET_KERNEL_PACKAGES_FAILURE } from '../actions';
import { GET_KERNEL_PACKAGE, GET_KERNEL_PACKAGE_REQUEST, GET_KERNEL_PACKAGE_SUCCESS, GET_KERNEL_PACKAGE_FAILURE } from '../actions';
import { GET_PLUGINS_PACKAGES, GET_PLUGINS_PACKAGES_REQUEST, GET_PLUGINS_PACKAGES_SUCCESS, GET_PLUGINS_PACKAGES_FAILURE } from '../actions';
import { GET_PLUGIN_PACKAGE, GET_PLUGIN_PACKAGE_REQUEST, GET_PLUGIN_PACKAGE_SUCCESS, GET_PLUGIN_PACKAGE_FAILURE } from '../actions';
import { GET_PLUGIN_SCHEMAS, GET_PLUGIN_SCHEMAS_REQUEST, GET_PLUGIN_SCHEMAS_SUCCESS, GET_PLUGIN_SCHEMAS_FAILURE } from '../actions';
import { GET_PLUGIN_ARTIFACTS, GET_PLUGIN_ARTIFACTS_REQUEST, GET_PLUGIN_ARTIFACTS_SUCCESS, GET_PLUGIN_ARTIFACTS_FAILURE } from '../actions';
const wizziPackagesInitialState = {
    kernelPackages: [], 
    pluginsPackages: [], 
    pluginSchemas: {}, 
    schemasTIttfDocuments: [], 
    libTIttfDocuments: [], 
    packageTIttfDocuments: [], 
    pluginArtifacts: {}, 
    selectedPackage: null, 
    rootIttfDocuments: [], 
    libIttfDocuments: [], 
    metaIttfDocuments: [], 
    tIttfDocuments: [], 
    loadingError: null
};
function wizziPackagesReducer(state, action) {
    // log wizziPackagesReducer, state, action
    if (typeof state === 'undefined') {
        return wizziPackagesInitialState;
    }
    switch (action.type) {
        case GET_KERNEL_PACKAGES_SUCCESS: {
            console.log('GET_KERNEL_PACKAGES_SUCCESS', 'initial state:', state, 'action', action);
            var temp = {
                ...state, 
                kernelPackages: action.payload.packages, 
                loadingError: null
            };
            console.log('GET_KERNEL_PACKAGES_SUCCESS', 'final state:', temp);
            return temp;
        }
        case GET_KERNEL_PACKAGES_FAILURE: {
            console.log('GET_KERNEL_PACKAGES_FAILURE', 'initial state:', state, 'action', action);
            var temp = {
                ...state, 
                kernelPackages: [], 
                loadingError: action.payload.error
            };
            console.log('GET_KERNEL_PACKAGES_FAILURE', 'final state:', temp);
            return temp;
        }
        case GET_KERNEL_PACKAGE_SUCCESS: {
            console.log('GET_KERNEL_PACKAGE_SUCCESS', 'initial state:', state, 'action', action);
            var temp = {
                ...state, 
                generatePath: action.payload.generatePath, 
                generateWfJobPath: action.payload.generateWfJobPath, 
                rootIttfDocuments: action.payload.rootIttfDocuments, 
                libIttfDocuments: action.payload.libIttfDocuments, 
                metaIttfDocuments: action.payload.metaIttfDocuments, 
                tIttfDocuments: action.payload.tIttfDocuments, 
                selectedPackage: action.packageName, 
                loadingError: null
            };
            console.log('GET_KERNEL_PACKAGE_SUCCESS', 'final state:', temp);
            return temp;
        }
        case GET_KERNEL_PACKAGE_FAILURE: {
            console.log('GET_KERNEL_PACKAGE_FAILURE', 'initial state:', state, 'action', action);
            var temp = {
                ...state, 
                kernelPackages: [], 
                loadingError: action.payload.error
            };
            console.log('GET_KERNEL_PACKAGE_FAILURE', 'final state:', temp);
            return temp;
        }
        case GET_PLUGINS_PACKAGES_SUCCESS: {
            console.log('GET_PLUGINS_PACKAGES_SUCCESS', 'initial state:', state, 'action', action);
            var temp = {
                ...state, 
                pluginsPackages: action.payload.packages, 
                loadingError: null
            };
            console.log('GET_PLUGINS_PACKAGES_SUCCESS', 'final state:', temp);
            return temp;
        }
        case GET_PLUGINS_PACKAGES_FAILURE: {
            console.log('GET_PLUGINS_PACKAGES_FAILURE', 'initial state:', state, 'action', action);
            var temp = {
                ...state, 
                pluginsPackages: [], 
                loadingError: action.payload.error
            };
            console.log('GET_PLUGINS_PACKAGES_FAILURE', 'final state:', temp);
            return temp;
        }
        case GET_PLUGIN_PACKAGE_SUCCESS: {
            console.log('GET_PLUGIN_PACKAGE_SUCCESS', 'initial state:', state, 'action', action);
            var temp = {
                ...state, 
                generatePath: action.payload.generatePath, 
                generateWfJobPath: action.payload.generateWfJobPath, 
                rootIttfDocuments: action.payload.rootIttfDocuments, 
                libIttfDocuments: action.payload.libIttfDocuments, 
                metaIttfDocuments: action.payload.metaIttfDocuments, 
                tIttfDocuments: action.payload.tIttfDocuments, 
                selectedPackage: action.packageName, 
                loadingError: null
            };
            console.log('GET_PLUGIN_PACKAGE_SUCCESS', 'final state:', temp);
            return temp;
        }
        case GET_PLUGIN_PACKAGE_FAILURE: {
            console.log('GET_PLUGIN_PACKAGE_FAILURE', 'initial state:', state, 'action', action);
            var temp = {
                ...state, 
                kernelPackages: [], 
                loadingError: action.payload.error
            };
            console.log('GET_PLUGIN_PACKAGE_FAILURE', 'final state:', temp);
            return temp;
        }
        case GET_PLUGIN_SCHEMAS_SUCCESS: {
            console.log('GET_PLUGIN_SCHEMAS_SUCCESS', 'initial state:', state, 'action', action);
            var temp = {
                ...state, 
                pluginSchemas: action.payload.schemas, 
                schemasTIttfDocuments: action.payload.schemasTIttfDocuments, 
                packageTIttfDocuments: action.payload.packageTIttfDocuments, 
                libIttfDocuments: action.payload.libIttfDocuments, 
                libTIttfDocuments: action.payload.libTIttfDocuments, 
                selectedPackage: action.packageName, 
                loadingError: null
            };
            console.log('GET_PLUGIN_SCHEMAS_SUCCESS', 'final state:', temp);
            return temp;
        }
        case GET_PLUGIN_SCHEMAS_FAILURE: {
            console.log('GET_PLUGIN_SCHEMAS_FAILURE', 'initial state:', state, 'action', action);
            var temp = {
                ...state, 
                pluginSchemas: {}, 
                loadingError: action.payload.error
            };
            console.log('GET_PLUGIN_SCHEMAS_FAILURE', 'final state:', temp);
            return temp;
        }
        case GET_PLUGIN_ARTIFACTS_SUCCESS: {
            console.log('GET_PLUGIN_ARTIFACTS_SUCCESS', 'initial state:', state, 'action', action);
            var temp = {
                ...state, 
                pluginArtifacts: action.payload.artifacts, 
                artifactsTIttfDocuments: action.payload.artifactsTIttfDocuments, 
                packageTIttfDocuments: action.payload.packageTIttfDocuments, 
                selectedPackage: action.packageName, 
                loadingError: null
            };
            console.log('GET_PLUGIN_ARTIFACTS_SUCCESS', 'final state:', temp);
            return temp;
        }
        case GET_PLUGIN_ARTIFACTS_FAILURE: {
            console.log('GET_PLUGIN_ARTIFACTS_FAILURE', 'initial state:', state, 'action', action);
            var temp = {
                ...state, 
                pluginArtifacts: {}, 
                loadingError: action.payload.error
            };
            console.log('GET_PLUGIN_ARTIFACTS_FAILURE', 'final state:', temp);
            return temp;
        }
        default: {
            return state;
        }
    }
}
export default wizziPackagesReducer;

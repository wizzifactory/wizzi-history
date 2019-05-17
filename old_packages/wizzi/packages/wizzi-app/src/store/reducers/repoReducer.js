/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-app\wizzi\ittf\src\store\reducers\reporeducer.js.ittf
    utc time: Sat, 06 Oct 2018 05:59:03 GMT
*/
'use strict';
import { GET_REPO_USER, GET_REPO_USER_REQUEST, GET_REPO_USER_SUCCESS, GET_REPO_USER_FAILURE } from '../actions';
import { GET_REPO_PROJECT, GET_REPO_PROJECT_REQUEST, GET_REPO_PROJECT_SUCCESS, GET_REPO_PROJECT_FAILURE } from '../actions';
import { GET_REPO_FOLDER, GET_REPO_FOLDER_REQUEST, GET_REPO_FOLDER_SUCCESS, GET_REPO_FOLDER_FAILURE } from '../actions';
import { GET_REPO_DOCUMENT, GET_REPO_DOCUMENT_REQUEST, GET_REPO_DOCUMENT_SUCCESS, GET_REPO_DOCUMENT_FAILURE } from '../actions';
import { CREATE_REPO_PROJECT, CREATE_REPO_PROJECT_REQUEST, CREATE_REPO_PROJECT_SUCCESS, CREATE_REPO_PROJECT_FAILURE } from '../actions';
import { CREATE_REPO_FOLDER, CREATE_REPO_FOLDER_REQUEST, CREATE_REPO_FOLDER_SUCCESS, CREATE_REPO_FOLDER_FAILURE } from '../actions';
import { CREATE_REPO_DOCUMENT, CREATE_REPO_DOCUMENT_REQUEST, CREATE_REPO_DOCUMENT_SUCCESS, CREATE_REPO_DOCUMENT_FAILURE } from '../actions';
import { UPDATE_REPO_DOCUMENT, UPDATE_REPO_DOCUMENT_REQUEST, UPDATE_REPO_DOCUMENT_SUCCESS, UPDATE_REPO_DOCUMENT_FAILURE } from '../actions';
import { DELETE_REPO_FOLDER, DELETE_REPO_FOLDER_REQUEST, DELETE_REPO_FOLDER_SUCCESS, DELETE_REPO_FOLDER_FAILURE } from '../actions';
import { DELETE_REPO_DOCUMENT, DELETE_REPO_DOCUMENT_REQUEST, DELETE_REPO_DOCUMENT_SUCCESS, DELETE_REPO_DOCUMENT_FAILURE } from '../actions';
import { DELETE_REPO_BATCH, DELETE_REPO_BATCH_REQUEST, DELETE_REPO_BATCH_SUCCESS, DELETE_REPO_BATCH_FAILURE } from '../actions';
import { PASTE_REPO_FSITEMS, PASTE_REPO_FSITEMS_REQUEST, PASTE_REPO_FSITEMS_SUCCESS, PASTE_REPO_FSITEMS_FAILURE } from '../actions';
import { DUPLICATE_REPO_FSITEM, DUPLICATE_REPO_FSITEM_REQUEST, DUPLICATE_REPO_FSITEM_SUCCESS, DUPLICATE_REPO_FSITEM_FAILURE } from '../actions';
import { RENAME_REPO_FSITEM, RENAME_REPO_FSITEM_REQUEST, RENAME_REPO_FSITEM_SUCCESS, RENAME_REPO_FSITEM_FAILURE } from '../actions';
import { COPY_CUT_REPO_FSITEMS } from '../actions';
const repoInitialState = {
    userId: null, 
    projectId: null, 
    folderPath: null, 
    items: null, 
    document: null, 
    isLoading: false, 
    loadError: null, 
    isExecutingDeleteBatch: false, 
    deleteBatchResult: null, 
    deleteBatchError: null, 
    isExecutingRepoIO: false, 
    repoIOError: null, 
    copyCutType: '', 
    copyCutPending: false, 
    copyCutSourcePath: '', 
    copyCutSelectedItems: [], 
    pasteResult: null, 
    isExecutingPaste: false, 
    pasteError: null
};
function repoReducer(state, action) {
    // log repoReducer, state, action
    if (typeof state === 'undefined') {
        return repoInitialState;
    }
    switch (action.type) {
        case GET_REPO_USER_REQUEST: {
            console.log('GET_REPO_USER_REQUEST', 'initial state:', state, 'action', action);
            var temp = {
                ...state, 
                isLoading: true
            };
            console.log('GET_REPO_USER_REQUEST', 'final state:', temp);
            return temp;
        }
        case GET_REPO_USER_SUCCESS: {
            console.log('GET_REPO_USER_SUCCESS', 'initial state:', state, 'action', action);
            var temp = {
                ...state, 
                userId: action.payload.userId, 
                projectId: null, 
                folderPath: null, 
                items: action.payload.items, 
                document: null, 
                isLoading: false, 
                loadError: null
            };
            console.log('GET_REPO_USER_SUCCESS', 'final state:', temp);
            return temp;
        }
        case GET_REPO_USER_FAILURE: {
            console.log('GET_REPO_USER_FAILURE', 'initial state:', state, 'action', action);
            var temp = {
                ...state, 
                userId: null, 
                projectId: null, 
                folderPath: null, 
                items: null, 
                document: null, 
                isLoading: false, 
                loadError: action.payload.error
            };
            console.log('GET_REPO_USER_FAILURE', 'final state:', temp);
            return temp;
        }
        case GET_REPO_PROJECT_REQUEST: {
            console.log('GET_REPO_PROJECT_REQUEST', 'initial state:', state, 'action', action);
            var temp = {
                ...state, 
                isLoading: true
            };
            console.log('GET_REPO_PROJECT_REQUEST', 'final state:', temp);
            return temp;
        }
        case GET_REPO_PROJECT_SUCCESS: {
            console.log('GET_REPO_PROJECT_SUCCESS', 'initial state:', state, 'action', action);
            var temp = {
                ...state, 
                projectId: action.payload.projectId, 
                folderPath: action.payload.folderPath, 
                items: action.payload.items, 
                document: null, 
                isLoading: false, 
                loadError: null
            };
            console.log('GET_REPO_PROJECT_SUCCESS', 'final state:', temp);
            return temp;
        }
        case GET_REPO_PROJECT_FAILURE: {
            console.log('GET_REPO_PROJECT_FAILURE', 'initial state:', state, 'action', action);
            var temp = {
                ...state, 
                projectId: null, 
                folderPath: null, 
                items: null, 
                document: null, 
                isLoading: false, 
                loadError: action.payload.error
            };
            console.log('GET_REPO_PROJECT_FAILURE', 'final state:', temp);
            return temp;
        }
        case GET_REPO_FOLDER_REQUEST: {
            console.log('GET_REPO_FOLDER_REQUEST', 'initial state:', state, 'action', action);
            var temp = {
                ...state, 
                isLoading: true
            };
            console.log('GET_REPO_FOLDER_REQUEST', 'final state:', temp);
            return temp;
        }
        case GET_REPO_FOLDER_SUCCESS: {
            console.log('GET_REPO_FOLDER_SUCCESS', 'initial state:', state, 'action', action);
            var temp = {
                ...state, 
                folderPath: action.payload.folderPath, 
                items: action.payload.items, 
                document: null, 
                isLoading: false, 
                loadError: null
            };
            console.log('GET_REPO_FOLDER_SUCCESS', 'final state:', temp);
            return temp;
        }
        case GET_REPO_FOLDER_FAILURE: {
            console.log('GET_REPO_FOLDER_FAILURE', 'initial state:', state, 'action', action);
            var temp = {
                ...state, 
                folderPath: null, 
                items: null, 
                document: null, 
                isLoading: false, 
                loadError: action.payload.error
            };
            console.log('GET_REPO_FOLDER_FAILURE', 'final state:', temp);
            return temp;
        }
        case GET_REPO_DOCUMENT_REQUEST: {
            console.log('GET_REPO_DOCUMENT_REQUEST', 'initial state:', state, 'action', action);
            var temp = {
                ...state, 
                isLoading: true
            };
            console.log('GET_REPO_DOCUMENT_REQUEST', 'final state:', temp);
            return temp;
        }
        case GET_REPO_DOCUMENT_SUCCESS: {
            console.log('GET_REPO_DOCUMENT_SUCCESS', 'initial state:', state, 'action', action);
            var temp = {
                ...state, 
                folderPath: action.payload.folderPath, 
                document: action.payload, 
                isLoading: false, 
                loadError: null
            };
            console.log('GET_REPO_DOCUMENT_SUCCESS', 'final state:', temp);
            return temp;
        }
        case GET_REPO_DOCUMENT_FAILURE: {
            console.log('GET_REPO_DOCUMENT_FAILURE', 'initial state:', state, 'action', action);
            var temp = {
                ...state, 
                document: null, 
                isLoading: false, 
                loadError: action.payload.error
            };
            console.log('GET_REPO_DOCUMENT_FAILURE', 'final state:', temp);
            return temp;
        }
        case CREATE_REPO_PROJECT_SUCCESS: {
            console.log('CREATE_REPO_PROJECT', 'initial state:', state, 'action', action);
            var temp = {
                ...state, 
                projectCreateNotification: action.payload, 
                projectCreateError: null
            };
            console.log('CREATE_REPO_PROJECT', 'final state:', temp);
            return temp;
        }
        case CREATE_REPO_PROJECT_FAILURE: {
            console.log('CREATE_REPO_PROJECT', 'initial state:', state, 'action', action);
            var temp = {
                ...state, 
                projectCreateNotification: null, 
                projectCreateError: action.payload.error
            };
            console.log('CREATE_REPO_PROJECT', 'final state:', temp);
            return temp;
        }
        case CREATE_REPO_FOLDER_SUCCESS: {
            console.log('CREATE_REPO_FOLDER', 'initial state:', state, 'action', action);
            var temp = {
                ...state, 
                folderCreateNotification: action.payload, 
                folderCreateError: null, 
                items: action.payload.folderRefresh.items
            };
            console.log('CREATE_REPO_FOLDER', 'final state:', temp);
            return temp;
        }
        case CREATE_REPO_FOLDER_FAILURE: {
            console.log('CREATE_REPO_FOLDER', 'initial state:', state, 'action', action);
            var temp = {
                ...state, 
                folderCreateNotification: null, 
                folderCreateError: action.payload.error
            };
            console.log('CREATE_REPO_FOLDER', 'final state:', temp);
            return temp;
        }
        case DELETE_REPO_FOLDER_SUCCESS: {
            console.log('DELETE_REPO_FOLDER', 'initial state:', state, 'action', action);
            var temp = {
                ...state, 
                folderDeleteNotification: action.payload, 
                folderDeleteError: null, 
                items: action.payload.folderRefresh.items
            };
            console.log('DELETE_REPO_FOLDER', 'final state:', temp);
            return temp;
        }
        case DELETE_REPO_FOLDER_FAILURE: {
            console.log('DELETE_REPO_FOLDER', 'initial state:', state, 'action', action);
            var temp = {
                ...state, 
                folderDeleteNotification: null, 
                folderDeleteError: action.payload.error
            };
            console.log('DELETE_REPO_FOLDER', 'final state:', temp);
            return temp;
        }
        case CREATE_REPO_DOCUMENT_SUCCESS: {
            console.log('CREATE_REPO_DOCUMENT', 'initial state:', state, 'action', action);
            var temp = {
                ...state, 
                documentCreateNotification: action.payload, 
                documentCreateError: null, 
                items: action.payload.folderRefresh.items
            };
            console.log('CREATE_REPO_DOCUMENT', 'final state:', temp);
            return temp;
        }
        case CREATE_REPO_DOCUMENT_FAILURE: {
            console.log('CREATE_REPO_DOCUMENT', 'initial state:', state, 'action', action);
            var temp = {
                ...state, 
                documentCreateNotification: null, 
                documentCreateError: action.payload.error
            };
            console.log('CREATE_REPO_DOCUMENT', 'final state:', temp);
            return temp;
        }
        case UPDATE_REPO_DOCUMENT_SUCCESS: {
            console.log('UPDATE_REPO_DOCUMENT', 'initial state:', state, 'action', action);
            var temp = {
                ...state, 
                documentUpdateNotification: action.payload, 
                documentUpdateError: null
            };
            console.log('UPDATE_REPO_DOCUMENT', 'final state:', temp);
            return temp;
        }
        case UPDATE_REPO_DOCUMENT_FAILURE: {
            console.log('UPDATE_REPO_DOCUMENT', 'initial state:', state, 'action', action);
            var temp = {
                ...state, 
                documentUpdateNotification: null, 
                documentUpdateError: action.payload.error
            };
            console.log('UPDATE_REPO_DOCUMENT', 'final state:', temp);
            return temp;
        }
        case DELETE_REPO_DOCUMENT_SUCCESS: {
            console.log('DELETE_REPO_DOCUMENT', 'initial state:', state, 'action', action);
            var temp = {
                ...state, 
                documentDeleteNotification: action.payload, 
                documentDeleteError: null, 
                items: action.payload.folderRefresh.items
            };
            console.log('DELETE_REPO_DOCUMENT', 'final state:', temp);
            return temp;
        }
        case DELETE_REPO_DOCUMENT_FAILURE: {
            console.log('DELETE_REPO_DOCUMENT', 'initial state:', state, 'action', action);
            var temp = {
                ...state, 
                documentDeleteNotification: null, 
                documentDeleteError: action.payload.error
            };
            console.log('DELETE_REPO_DOCUMENT', 'final state:', temp);
            return temp;
        }
        case DELETE_REPO_BATCH_REQUEST: {
            console.log('DELETE_REPO_BATCH_REQUEST', 'initial state:', state, 'action', action);
            var temp = {
                ...state, 
                isExecutingDeleteBatch: true
            };
            console.log('DELETE_REPO_BATCH_REQUEST', 'final state:', temp);
            return temp;
        }
        case DELETE_REPO_BATCH_FAILURE: {
            console.log('DELETE_REPO_BATCH_FAILURE', 'initial state:', state, 'action', action);
            var temp = {
                ...state, 
                isExecutingDeleteBatch: false, 
                deleteBatchError: action.payload.error
            };
            console.log('DELETE_REPO_BATCH_FAILURE', 'final state:', temp);
            return temp;
        }
        case DELETE_REPO_BATCH_SUCCESS: {
            console.log('DELETE_REPO_BATCH_SUCCESS', 'initial state:', state, 'action', action);
            var temp = {
                ...state, 
                items: action.payload.folderRefresh.items, 
                deleteBatchResult: action.payload.result, 
                isExecutingDeleteBatch: false, 
                deleteBatchError: null
            };
            console.log('DELETE_REPO_BATCH_SUCCESS', 'final state:', temp);
            return temp;
        }
        case RENAME_REPO_FSITEM_SUCCESS: {
            console.log('RENAME_REPO_FSITEM_SUCCESS', 'initial state:', state, 'action', action);
            var temp = {
                ...state, 
                items: action.payload.folderRefresh.items, 
                isExecutingRepoIO: false, 
                repoIOError: null
            };
            console.log('RENAME_REPO_FSITEM_SUCCESS', 'final state:', temp);
            return temp;
        }
        case RENAME_REPO_FSITEM_FAILURE: {
            console.log('RENAME_REPO_FSITEM_FAILURE', 'initial state:', state, 'action', action);
            var temp = {
                ...state, 
                isExecutingRepoIO: false, 
                repoIOError: action.payload.error
            };
            console.log('RENAME_REPO_FSITEM_FAILURE', 'final state:', temp);
            return temp;
        }
        case DUPLICATE_REPO_FSITEM_SUCCESS: {
            console.log('DUPLICATE_REPO_FSITEM_SUCCESS', 'initial state:', state, 'action', action);
            var temp = {
                ...state, 
                items: action.payload.folderRefresh.items, 
                isExecutingRepoIO: false, 
                repoIOError: null
            };
            console.log('DUPLICATE_REPO_FSITEM_SUCCESS', 'final state:', temp);
            return temp;
        }
        case DUPLICATE_REPO_FSITEM_FAILURE: {
            console.log('DUPLICATE_REPO_FSITEM_FAILURE', 'initial state:', state, 'action', action);
            var temp = {
                ...state, 
                isExecutingRepoIO: false, 
                repoIOError: action.payload.error
            };
            console.log('DUPLICATE_REPO_FSITEM_FAILURE', 'final state:', temp);
            return temp;
        }
        case COPY_CUT_REPO_FSITEMS: {
            console.log('COPY_CUT_REPO_FSITEMS', 'initial state:', state, 'action', action);
            var temp = {
                ...state, 
                copyCutType: action.copyCut, 
                copyCutPending: action.copyCut && action.copyCut.length > 0, 
                copyCutSourcePath: action.sourcePath, 
                copyCutSelectedItems: action.selectedItems
            };
            console.log('COPY_CUT_REPO_FSITEMS', 'final state:', temp);
            return temp;
        }
        case PASTE_REPO_FSITEMS_REQUEST: {
            console.log('PASTE_REPO_FSITEMS_REQUEST', 'initial state:', state, 'action', action);
            var temp = {
                ...state, 
                isExecutingPaste: true
            };
            console.log('PASTE_REPO_FSITEMS_REQUEST', 'final state:', temp);
            return temp;
        }
        case PASTE_REPO_FSITEMS_FAILURE: {
            console.log('PASTE_REPO_FSITEMS_FAILURE', 'initial state:', state, 'action', action);
            var temp = {
                ...state, 
                isExecutingPaste: false, 
                pasteError: action.payload.error
            };
            console.log('PASTE_REPO_FSITEMS_FAILURE', 'final state:', temp);
            return temp;
        }
        case PASTE_REPO_FSITEMS_SUCCESS: {
            console.log('PASTE_REPO_FSITEMS_SUCCESS', 'initial state:', state, 'action', action);
            var temp = {
                ...state, 
                items: action.payload.folderRefresh.items, 
                pasteResult: action.payload.result, 
                isExecutingPaste: false, 
                pasteError: null, 
                copyCutType: '', 
                copyCutPending: false, 
                copyCutSourcePath: '', 
                copyCutSelectedItems: []
            };
            console.log('PASTE_REPO_FSITEMS_SUCCESS', 'final state:', temp);
            return temp;
        }
        default: {
            return state;
        }
    }
}
export default repoReducer;

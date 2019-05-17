/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-play\wizzi\ittf\src\store\configurestore.prod.js.ittf
    utc time: Thu, 31 Jan 2019 10:21:44 GMT
*/
'use strict';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// in the api middleware we can store global objects
// that give problems when stored in the redux state
// see https://stackoverflow.com/questions/37221872/storing-global-object-outside-of-redux-store-in-react-redux-app
// and https://github.com/reduxjs/redux-thunk
import extraArguments from '../middleware/extraArguments';
import rootReducer from './reducers';
const configureStore = (preloadedState) =>
    createStore(rootReducer, preloadedState, applyMiddleware(thunk, thunk.withExtraArgument(extraArguments)));
export default configureStore;

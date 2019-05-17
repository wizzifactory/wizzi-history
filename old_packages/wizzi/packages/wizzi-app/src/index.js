/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-app\wizzi\ittf\src\index.js.ittf
    utc time: Sat, 06 Oct 2018 05:59:03 GMT
*/
'use strict';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { render } from 'react-dom';
import MuiThemeContainer from './containers/MuiThemeContainer';
import registerServiceWorker from './registerServiceWorker';
// preloadedState param not used
// export const store = configureStore(preloadedState)
export const store = configureStore();
const rootEl = document.querySelector('#app');
render(
    <Provider store={store}>
        <MuiThemeContainer>
        </MuiThemeContainer>
    
    </Provider>
, rootEl);
registerServiceWorker();
/**
    import React from 'react';
    import ReactDOM from 'react-dom';
    import './index.css';
    import App from './App';
    import registerServiceWorker from './registerServiceWorker';
    ReactDOM.render(
        <App>
        </App>
    , document.getElementById('root'))registerServiceWorker()*/

/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-studio\wizzi\ittf\server\webpacks\material-ui-docs\src\index.js.ittf
    utc time: Thu, 06 Dec 2018 17:50:06 GMT
*/
'use strict';
import { AppContainer } from 'react-hot-loader';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import React from 'react';
import ReactPerf from 'react-addons-perf';
import { render } from 'react-dom';
import App from './components/App';
/**
    Warns about potential accessibility issues with your React elements.
    import a11y from 'react-a11y';
    if (process.env.NODE_ENV !== 'production') {
        a11y(React, {
            includeSrcNode: true, 
            ReactDOM
        });
    }
*/
window.Perf = ReactPerf;
const docs = (state = { dark: false }, action) => {
    if (action.type === 'TOGGLE_THEME_SHADE') {
        return {
                ...state, 
                dark: !state.dark
            };
    }
    return state;
};
export const store = createStore(docs);
const rootEl = document.querySelector('#app');
render(
    <AppContainer errorReporter={({ error }) => {
        throw error;
    }}>
        <Provider store={store}>
            <App>
            </App>
        
        </Provider>
    
    </AppContainer>
, rootEl);
if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./components/App', () => {
        const NextApp = require('./components/App').default;
        render(
            <AppContainer errorReporter={({ error }) => {
                throw error;
            }}>
                <Provider store={store}>
                    <NextApp>
                    </NextApp>
                
                </Provider>
            
            </AppContainer>
        , rootEl);
    });
}

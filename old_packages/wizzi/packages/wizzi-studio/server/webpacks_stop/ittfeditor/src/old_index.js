/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-studio\src\ittf\webpacks\ittfeditor\ittf\webpacks\ittfeditor\src\old_index.js.ittf
    utc time: Thu, 24 May 2018 09:14:50 GMT
*/
'use strict';
import React from 'react';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { initialLoad } from './store/actions';
import ReactPerf from 'react-addons-perf';
import { render } from 'react-dom';
import App from './containers/App';
window.Perf = ReactPerf;
export const store = configureStore();
store.dispatch(initialLoad());
const rootEl = document.querySelector('#root');
render(
    <Provider store={store}>
        <App>
        </App>
    
    </Provider>
, rootEl);
if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./containers/App', () => {
        const NextApp = require('./containers/App').default;
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

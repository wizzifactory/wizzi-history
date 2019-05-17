/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: c:\my\wizzi\v3\next\sources\webpacks\cssstyle\ittf\webpacks\cssstyle\src\_old_index.js.ittf
    utc time: Wed, 19 Jul 2017 08:08:01 GMT
*/
'use strict';
import React from 'react';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { initialLoad } from './store/actions';
import ReactPerf from 'react-addons-perf';
import { render } from 'react-dom';
import MuiApp from './containers/MuiApp';
window.Perf = ReactPerf;
export const store = configureStore();
/**
    store.dispatch(initialLoad())
*/
const rootEl = document.querySelector('#root');
render(
    <Provider store={store}>
        <MuiApp>
        </MuiApp>
    
    </Provider>
, rootEl);
if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./containers/MuiApp', () => {
        const NextApp = require('./containers/MuiApp').default;
        render(
            <AppContainer errorReporter={({ error }) => {
                throw error;
            }}>
                <Provider store={store}>
                    <NextApp>
                    </NextApp>
                
                </Provider>
            
            </AppContainer>
        , rootEl)
    });
}

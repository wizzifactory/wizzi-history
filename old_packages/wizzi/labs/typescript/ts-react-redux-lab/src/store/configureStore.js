import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import { createRootReducer } from './reducers';
import { createRootSaga } from './sagas';
export var history = createBrowserHistory();
export default function configureStore(preloadedState) {
    var composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    var sagaMiddleware = createSagaMiddleware();
    var store = createStore(createRootReducer(history), preloadedState, composeEnhancer(applyMiddleware(routerMiddleware(history), sagaMiddleware)));
    var sagaTask = sagaMiddleware.run(createRootSaga());
    if (module.hot) {
        module.hot.accept('./reducers', function () {
            store.replaceReducer(createRootReducer(history));
        });
        module.hot.accept('./sagas', function () {
            var newCreateRootSaga = require('./sagas');
            sagaTask.cancel();
            sagaTask = sagaMiddleware.run(newCreateRootSaga());
        });
    }
    return store;
}
//# sourceMappingURL=configureStore.js.map
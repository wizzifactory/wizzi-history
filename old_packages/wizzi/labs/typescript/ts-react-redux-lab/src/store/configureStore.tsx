import { createBrowserHistory } from 'history';
import { Store, applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import { AppState, createRootReducer } from './reducers';
import { createRootSaga } from './sagas';

export const history = createBrowserHistory();

export default function configureStore(preloadedState?: AppState): Store<AppState> {
  const composeEnhancer: typeof compose = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    createRootReducer(history),
    preloadedState,
    composeEnhancer(
      applyMiddleware(
        routerMiddleware(history),
        sagaMiddleware
      ),
    ),
  );
  let sagaTask = sagaMiddleware.run(createRootSaga());
  // Hot reloading
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      store.replaceReducer(createRootReducer(history));
    });
    // Enable Webpack hot module replacement for sagas
    module.hot.accept('./sagas', () => {
      const newCreateRootSaga = require('./sagas');
      sagaTask.cancel();
      // FIXME https://github.com/GuillaumeCisco/redux-sagas-injector/blob/master/src/redux-sagas-injector.js
      sagaTask = sagaMiddleware.run(newCreateRootSaga());
    });
  }
  return store;
}

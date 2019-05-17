import { all, fork } from 'redux-saga/effects';
import teamsSagas from '../features/teams/sagas';

// Here we use `redux-saga` to trigger actions asynchronously. `redux-saga` uses something called a
// "generator function", which you can read about here:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*
export const createRootSaga = () => {
    return function* rootSaga() {
        yield all([fork(teamsSagas)]);
    };
};

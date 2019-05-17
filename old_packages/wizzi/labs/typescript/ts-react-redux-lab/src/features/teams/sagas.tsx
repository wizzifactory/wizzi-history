import { all, call, fork, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';
import * as teamsActions from './actions';
import { callApi } from '../../utils/api';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || 'https://api.opendota.com';

function* handleFetch() {
  try {
    // To call async functions, use redux-saga's `call()`.
    const res = yield call(callApi, 'get', API_ENDPOINT, 'teams');
    if (res.error) {
      yield put(teamsActions.fetchError(res.error));
    } else {
      yield put(teamsActions.fetchSuccess({teams: res}));
    }
  } catch (err) {
    if (err instanceof Error) {
      yield put(teamsActions.fetchError(err.stack!));
    } else {
      yield put(teamsActions.fetchError('An unknown error occured.'));
    }
  }
}

function* handleSelect(action: ReturnType<typeof teamsActions.selectTeam>) {
  try {
    const detail = yield call(callApi, 'get', API_ENDPOINT, `teams/${action.payload}`);
    const players = yield call(callApi, 'get', API_ENDPOINT, `teams/${action.payload}/players`);

    if (detail.error || players.error) {
      yield put(teamsActions.fetchError(detail.error || players.error));
    } else {
      yield put(teamsActions.teamSelected({ detail, players }));
    }
  } catch (err) {
    if (err instanceof Error) {
      yield put(teamsActions.fetchError(err.stack!));
    } else {
      yield put(teamsActions.fetchError('An unknown error occured.'));
    }
  }
}

function* watchFetchRequest() {
  yield takeEvery(getType(teamsActions.fetchRequest), handleFetch);
}

function* watchSelectTeam() {
  yield takeLatest(getType(teamsActions.selectTeam), handleSelect);
}

// We can also use `fork()` here to split our saga into multiple watchers.
function* teamsSaga() {
  yield all([fork(watchFetchRequest), fork(watchSelectTeam)]);
}

export default teamsSaga;

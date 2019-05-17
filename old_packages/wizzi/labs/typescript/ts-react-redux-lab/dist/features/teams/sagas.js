import * as tslib_1 from "tslib";
import { all, call, fork, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';
import * as teamsActions from './actions';
import { callApi } from '../../utils/api';
var API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || 'https://api.opendota.com';
function handleFetch() {
    var res, err_1;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 11]);
                return [4, call(callApi, 'get', API_ENDPOINT, '/teams')];
            case 1:
                res = _a.sent();
                if (!res.error) return [3, 3];
                return [4, put(teamsActions.fetchError(res.error))];
            case 2:
                _a.sent();
                return [3, 5];
            case 3: return [4, put(teamsActions.fetchSuccess(res))];
            case 4:
                _a.sent();
                _a.label = 5;
            case 5: return [3, 11];
            case 6:
                err_1 = _a.sent();
                if (!(err_1 instanceof Error)) return [3, 8];
                return [4, put(teamsActions.fetchError(err_1.stack))];
            case 7:
                _a.sent();
                return [3, 10];
            case 8: return [4, put(teamsActions.fetchError('An unknown error occured.'))];
            case 9:
                _a.sent();
                _a.label = 10;
            case 10: return [3, 11];
            case 11: return [2];
        }
    });
}
function handleSelect(action) {
    var detail, players, err_2;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 7, , 12]);
                return [4, call(callApi, 'get', API_ENDPOINT, "/teams/" + action.payload)];
            case 1:
                detail = _a.sent();
                return [4, call(callApi, 'get', API_ENDPOINT, "/teams/" + action.payload + "/players")];
            case 2:
                players = _a.sent();
                if (!(detail.error || players.error)) return [3, 4];
                return [4, put(teamsActions.fetchError(detail.error || players.error))];
            case 3:
                _a.sent();
                return [3, 6];
            case 4: return [4, put(teamsActions.teamSelected({ detail: detail, players: players }))];
            case 5:
                _a.sent();
                _a.label = 6;
            case 6: return [3, 12];
            case 7:
                err_2 = _a.sent();
                if (!(err_2 instanceof Error)) return [3, 9];
                return [4, put(teamsActions.fetchError(err_2.stack))];
            case 8:
                _a.sent();
                return [3, 11];
            case 9: return [4, put(teamsActions.fetchError('An unknown error occured.'))];
            case 10:
                _a.sent();
                _a.label = 11;
            case 11: return [3, 12];
            case 12: return [2];
        }
    });
}
function watchFetchRequest() {
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, takeEvery(getType(teamsActions.fetchRequest), handleFetch)];
            case 1:
                _a.sent();
                return [2];
        }
    });
}
function watchSelectTeam() {
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, takeLatest(getType(teamsActions.selectTeam), handleSelect)];
            case 1:
                _a.sent();
                return [2];
        }
    });
}
function teamsSaga() {
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, all([fork(watchFetchRequest), fork(watchSelectTeam)])];
            case 1:
                _a.sent();
                return [2];
        }
    });
}
export default teamsSaga;
//# sourceMappingURL=sagas.js.map
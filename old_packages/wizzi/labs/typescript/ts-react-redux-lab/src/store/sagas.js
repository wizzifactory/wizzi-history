import * as tslib_1 from "tslib";
import { all, fork } from 'redux-saga/effects';
import teamsSagas from '../features/teams/sagas';
export var createRootSaga = function () {
    return function rootSaga() {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, all([fork(teamsSagas)])];
                case 1:
                    _a.sent();
                    return [2];
            }
        });
    };
};
//# sourceMappingURL=sagas.js.map
import { combineReducers } from 'redux';
import { getType } from 'typesafe-actions';
import * as counterActions from './actions';
var initialCount = 0;
export default combineReducers({
    count: function (state, action) {
        if (state === void 0) { state = initialCount; }
        switch (action.type) {
            case getType(counterActions.increment):
                return state + 1;
            case getType(counterActions.decrement):
                return state - 1;
            default:
                return state;
        }
    },
});
//# sourceMappingURL=reducer.js.map
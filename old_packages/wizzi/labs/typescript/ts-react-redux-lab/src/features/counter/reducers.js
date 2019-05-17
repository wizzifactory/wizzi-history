import { INCREMENT, DECREMENT } from './constants';
var counterReducer = function (state, action) {
    if (state === void 0) { state = 0; }
    switch (action.type) {
        case INCREMENT:
            return state + 1;
        case DECREMENT:
            return state - 1;
        default:
            return state;
    }
};
export default counterReducer;
//# sourceMappingURL=reducers.js.map
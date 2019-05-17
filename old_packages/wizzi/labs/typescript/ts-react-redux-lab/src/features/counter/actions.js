import { createStandardAction } from 'typesafe-actions';
var INCREMENT = '@counter/INCREMENT';
var DECREMENT = '@counter/DECREMENT';
export var increment = createStandardAction(INCREMENT)();
export var decrement = createStandardAction(DECREMENT)();
//# sourceMappingURL=actions.js.map
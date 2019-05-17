import { combineReducers } from 'redux';
import { ActionType, getType } from 'typesafe-actions';
import * as counterActions from './actions';

export type CounterState = {
  readonly count: number;
};

const initialCount = 0;

export type CounterAction = ActionType<typeof counterActions>;

export default combineReducers<CounterState, CounterAction>({
  count: (state = initialCount, action) => {
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

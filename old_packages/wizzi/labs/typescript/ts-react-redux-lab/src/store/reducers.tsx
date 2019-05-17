import { combineReducers } from 'redux';
import { History } from 'history';
import { RouterState, connectRouter } from 'connected-react-router';

import counterReducer, { CounterState } from '../features/counter/reducer';
import todosReducer, { TodosState } from '../features/todos/reducer';
import teamsReducer, { TeamsState } from '../features/teams/reducer';

export interface AppState {
  router: RouterState;
  counter: CounterState;
  todos: TodosState;
  teams: TeamsState;
}

export const createRootReducer = (history: History) => combineReducers<AppState>({
  router: connectRouter(history),
  counter: counterReducer,
  todos: todosReducer,
  teams: teamsReducer,
});

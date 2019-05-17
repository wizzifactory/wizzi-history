import cuid from 'cuid';
import { combineReducers } from 'redux';
import { ActionType, getType } from 'typesafe-actions';

import { Todo, TodosFilter } from './models';
import * as todosActions from './actions';

export type TodosState = {
  readonly todos: Todo[];
  readonly todosFilter: TodosFilter;
};

const initialTodos: Todo[] = [
  {
    id: cuid(),
    title : 'first to do',
    completed: false,
  },
];

const initialTodosFilter: TodosFilter = TodosFilter.All;

export type TodosAction = ActionType<typeof todosActions>;

export default combineReducers<TodosState, TodosAction>({
  todos: (state = initialTodos, action) => {
    switch (action.type) {
      case getType(todosActions.add):
        return [...state, action.payload];
      case getType(todosActions.toggle):
        return state.map(item => (item.id === action.payload.id ? { ...item, completed: !item.completed } : item));
      default:
        return state;
    }
  },
  todosFilter: (state = initialTodosFilter, action) => {
    switch (action.type) {
      case getType(todosActions.changeFilter):
        return action.payload;
      default:
        return state;
    }
  },
});

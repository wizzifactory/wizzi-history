import cuid from 'cuid';
import { createStandardAction } from 'typesafe-actions';

import { TodosFilter, Todo } from './models';

const ADD = '@todos/ADD';
const TOGGLE = '@todos/TOGGLE';
const CHANGE_FILTER = '@todos/CHANGE_FILTER';

export type TodoAddPayload = {
  title: string;
};
export type TodoTogglePayload = {
  id: string;
};
export type TodosChangeFilterPayload = TodosFilter;

export const add = createStandardAction(ADD).map(
  (payload: TodoAddPayload) => ({
    payload: {
      ...payload,
      id: cuid(),
      completed: false,
    } as Todo,
  })
);

export const toggle = createStandardAction(TOGGLE)<TodoTogglePayload>();

export const changeFilter = createStandardAction(CHANGE_FILTER)<TodosChangeFilterPayload>();

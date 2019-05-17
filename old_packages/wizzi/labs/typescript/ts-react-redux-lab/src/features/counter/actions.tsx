import { createStandardAction } from 'typesafe-actions';

const INCREMENT = '@counter/INCREMENT';
const DECREMENT = '@counter/DECREMENT';

export const increment = createStandardAction(INCREMENT)();
export const decrement = createStandardAction(DECREMENT)();

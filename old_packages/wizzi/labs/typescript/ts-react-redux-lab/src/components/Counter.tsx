import React from 'react';

interface Props {
  count: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

export default (props: Props) => (
  <div style={{padding: '100px 100px'}}>
    <h1>Counter</h1>
    Counter: {props.count}
    &nbsp;
    <button onClick={props.onIncrement}>+</button>
    &nbsp;
    <button onClick={props.onDecrement}>-</button>
  </div>
);

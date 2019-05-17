import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { increment, decrement } from '../../features/counter/actions';
import { AppState } from '../../store/reducers';
import CounterComp from '../../components/Counter';

interface StateProps {
  count: number;
}

interface DispatchProps {
  increment: () => void;
  decrement: () => void;
}

const mapStateToProps = (state: AppState) => ({
  count: state.counter.count,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  increment: () => dispatch(increment()),
  decrement: () => dispatch(decrement()),
});

const Counter = (props: RouteComponentProps<any> & StateProps & DispatchProps) => (
  <div>
    <CounterComp
      count={props.count}
      onIncrement={props.increment}
      onDecrement={props.decrement}
    />
  </div>
);

export default connect<StateProps, DispatchProps, RouteComponentProps<any>>(
  mapStateToProps, mapDispatchToProps
)(Counter);

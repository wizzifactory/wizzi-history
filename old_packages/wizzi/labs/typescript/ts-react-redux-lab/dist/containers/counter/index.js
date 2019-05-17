import React from 'react';
import { connect } from 'react-redux';
import { increment, decrement } from '../../features/counter/actions';
import CounterComp from '../../components/Counter';
var mapStateToProps = function (state) { return ({
    count: state.counter.count,
}); };
var mapDispatchToProps = function (dispatch) { return ({
    increment: function () { return dispatch(increment()); },
    decrement: function () { return dispatch(decrement()); },
}); };
var Counter = function (props) { return (React.createElement("div", null,
    React.createElement(CounterComp, { count: props.count, onIncrement: props.increment, onDecrement: props.decrement }))); };
export default connect(mapStateToProps, mapDispatchToProps)(Counter);
//# sourceMappingURL=index.js.map
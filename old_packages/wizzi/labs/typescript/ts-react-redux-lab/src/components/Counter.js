import React from 'react';
export default (function (props) { return (React.createElement("div", { style: { padding: '100px 100px' } },
    React.createElement("h1", null, "Counter"),
    "Counter: ",
    props.count,
    "\u00A0",
    React.createElement("button", { onClick: props.onIncrement }, "+"),
    "\u00A0",
    React.createElement("button", { onClick: props.onDecrement }, "-"))); });
//# sourceMappingURL=Counter.js.map
import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import routes from './routes';
var App = function (_a) {
    var history = _a.history;
    return (React.createElement(ConnectedRouter, { history: history }, routes));
};
export default App;
//# sourceMappingURL=App.js.map
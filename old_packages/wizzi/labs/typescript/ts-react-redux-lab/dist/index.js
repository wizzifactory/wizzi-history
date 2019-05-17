import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import configureStore, { history } from './store/configureStore';
var store = configureStore();
var render = function () {
    ReactDOM.render(React.createElement(AppContainer, null,
        React.createElement(Provider, { store: store },
            React.createElement(App, { history: history }))), document.getElementById('react-root'));
};
render();
if (module.hot) {
    module.hot.accept('./App', function () {
        render();
    });
}
//# sourceMappingURL=index.js.map
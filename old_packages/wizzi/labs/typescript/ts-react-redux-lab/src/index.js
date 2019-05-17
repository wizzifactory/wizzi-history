import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { ApolloProvider } from 'react-apollo';
import App from './App';
import configureStore, { history } from './store/configureStore';
import apolloClient from './store/apollo';
var store = configureStore();
var render = function () {
    ReactDOM.render(React.createElement(AppContainer, null,
        React.createElement(Provider, { store: store },
            React.createElement(ApolloProvider, { client: apolloClient },
                React.createElement(App, { history: history })))), document.getElementById('react-root'));
};
render();
if (module.hot) {
    module.hot.accept('./App', function () {
        render();
    });
}
//# sourceMappingURL=index.js.map
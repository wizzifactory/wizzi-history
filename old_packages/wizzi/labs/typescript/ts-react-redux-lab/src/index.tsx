import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { ApolloProvider } from 'react-apollo';
import App from './App';
import configureStore, { history } from './store/configureStore';
import apolloClient from './store/apollo';

const store = configureStore();
const render = () => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <ApolloProvider client={apolloClient}>
          <App history={history} />
        </ApolloProvider>
      </Provider>
    </AppContainer>,
    
    document.getElementById('react-root')
  );
};

render();

// Hot reloading
if (module.hot) {
  // Reload components
  module.hot.accept('./App', () => {
    render();
  });
}

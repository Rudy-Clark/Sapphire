import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import configureStore, { history } from './configureStore';
import themeProvider from './themeProvider';
import Header from './Components/Header';
import Pages from './Components/Pages';
import Preloader from './Containers/Preloader';

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Header />
        <Pages />
        <Preloader />
      </ConnectedRouter>
    </Provider>
  );
}

export default themeProvider(App);

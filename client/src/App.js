import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import configureStore, { history, sagaMiddleware } from './configureStore';
import themeProvider from './themeProvider';
import Header from './Components/Header';
import Pages from './Containers/Pages';
import Preloader from './Containers/Preloader';
import rootSaga from './sagas';

export const store = configureStore();
console.log(store.getState());
sagaMiddleware.run(rootSaga);

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

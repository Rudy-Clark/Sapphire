import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter } from 'react-router-dom';

import reducers from './reducers';
import themeProvider from './themeProvider';
import Header from './Components/Header';
import Pages from './Components/Pages';

const store = createStore(reducers);

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Pages />
      </BrowserRouter>
    </Provider>
  );
}

export default themeProvider(App);

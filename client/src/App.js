import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import reducers from './reducers';
import themeProvider from './themeProvider';
import Modal from './Containers/Modal';
import Header from './Components/Header';

const store = createStore(reducers);

function App() {
  return (
    <Provider store={store}>
      <Header />
      <Modal />
    </Provider>
  );
}

export default themeProvider(App);

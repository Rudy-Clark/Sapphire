import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import reducers from './reducers';
import themeProvider from './themeProvider';
import Modal from './Containers/Modal';
import Buttons from './Containers/Buttons';

const store = createStore(reducers);

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Buttons />
        <Modal />
      </div>
    </Provider>
  );
}

export default themeProvider(App);

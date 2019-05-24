import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import reducers from './reducers';
import themeProvider from './themeProvider';

const store = createStore(reducers);

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <ul>
          <h1>Hello world</h1>
      </ul>
      </div>
    </Provider>
  );
}

export default themeProvider(App);

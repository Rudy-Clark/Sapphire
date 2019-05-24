import React, { useEffect, useState } from 'react';
import axios from 'axios';

import themeProvider from './themeProvider';

function App() {
  return (
    <div className="App">
      <ul>
        <h1>Hello world</h1>
      </ul>
    </div>
  );
}

export default themeProvider(App);

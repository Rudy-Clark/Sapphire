import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import createRootReducer from './reducers';

export const history = createBrowserHistory();

export default preloadState => {
  const composeEnhancer =
    // eslint-disable-next-line no-underscore-dangle
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    createRootReducer(history),
    preloadState,
    composeEnhancer(applyMiddleware(routerMiddleware(history))),
  );

  // Hot reloading
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      store.replaceReducer(createRootReducer(history));
    });
  }
  return store;
};

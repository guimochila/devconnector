import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import configureStore from './store';

const store = configureStore();

function Root(): JSX.Element {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

render(<Root />, document.getElementById('app'));

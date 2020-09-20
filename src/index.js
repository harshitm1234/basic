import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const component = () => <App />
const Container = connect()(component);
ReactDOM.render(
  <Provider>
    <Container />
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import configureStore from './store';
import {Provider} from 'react-redux';

const store = configureStore();
const render = () => {
  const app = (
    <Provider store={store}>
      <App />
    </Provider>
  );
  ReactDOM.render(app, document.getElementById('root'));
};

render();

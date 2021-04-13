import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { App } from './App';
import reportWebVitals from './reportWebVitals';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

import { todoReducer, tagReducer, optionReducer } from './reducers';

const reducers = (state = {}, action) => {
  return {
    todos: todoReducer(state.todos, action),
    tags: tagReducer(state.tags, action),
    options: optionReducer(state.options, action),
  };
};

const store = createStore(reducers, {} + window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

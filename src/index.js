import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import App from './App';
import './index.css';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import {BrowserRouter as Router} from "react-router-dom";

import {  browserHistory } from 'react-router'
import * as reducers from './store/reducers';


const store = createStore(combineReducers(reducers), applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
      <Router>
    <App />
      </Router>
  </Provider>,
  document.getElementById('root')
);

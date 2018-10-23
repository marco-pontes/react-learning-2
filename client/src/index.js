import App from "./js/components/container/App";
import ReactDOM from "react-dom";
import React from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import {timeline} from './js/reducers/timeline';
import {header} from "./js/reducers/header";
import './css/reset.css';
import './css/login.css';
import './css/timeline.css';


const reducers = combineReducers({timeline, header});
const store = createStore(reducers, applyMiddleware(thunkMiddleware));
const wrapper = document.getElementById("root");

wrapper ? ReactDOM.render(
    (<Provider store={store}>
        <App />
    </Provider>)
    , wrapper) : false;

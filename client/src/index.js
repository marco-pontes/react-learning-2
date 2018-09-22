import App from "./js/components/container/App";
import ReactDOM from "react-dom";
import React from "react";
import './css/reset.css';
import './css/login.css';
import './css/timeline.css';

const wrapper = document.getElementById("root");
wrapper ? ReactDOM.render(<App />, wrapper) : false;

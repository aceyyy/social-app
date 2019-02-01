import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import "antd/dist/antd.css";

// Components
import { BrowserRouter as Router, Route } from "react-router-dom";
import Main from './components/layout/Main';

ReactDOM.render(
<Provider store={store}>
  <Router>
    <div>
      <Route path="/" exact component={App}/>
      <Route path="/home" component={App}/>
      <Route path="/login" component={Main}/>
    </div>
  </Router>
</Provider>,
document.getElementById('root'));

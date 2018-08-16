import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './store';

import Navbar from './components/layout/Navbar';
import Dashboard from './components/layout/Dashboard';
import AddClient from './components/clients/AddClient';
import EditClient from './components/clients/EditClient';
import ClientDetails from './components/clients/ClientDetails';

import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar/>
            <div className="container">
              <Switch>
                <Route exact path="/" component={Dashboard}/>
                <Route path="/client/add" component={AddClient}/>
                <Route path="/client/edit/:id" component={EditClient}/>
                <Route path="/client/:id" component={ClientDetails}/>
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;

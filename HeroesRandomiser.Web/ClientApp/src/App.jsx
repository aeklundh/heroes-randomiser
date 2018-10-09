import React, { Component } from 'react';
import { Provider } from 'react-redux';

import configureStore from './store/configureStore';
import Layout from './containers/Layout';

import './App.css';

const store = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Layout />
      </Provider>
    );
  }
}

export default App;

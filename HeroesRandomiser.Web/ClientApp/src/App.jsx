import React, { Component } from 'react';
import { Provider } from 'react-redux';
import 'normalize.css';

import configureStore from './store/configureStore';
import Layout from './containers/Layout';

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

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import 'normalize.css';
import { ThemeProvider } from 'styled-components';
import theme from './style/_theme';

import configureStore from './store/configureStore';
import Layout from './containers/Layout';

const store = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Layout />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    );
  }
}

export default App;

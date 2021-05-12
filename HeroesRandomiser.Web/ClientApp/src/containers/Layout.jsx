import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import { Viewport, MainBodyWrapper } from '../style/pageLayout';
import Header from '../components/Header'
import Footer from '../components/Footer'

import StartPage from './StartPage';
import AboutPage from './AboutPage';

class Layout extends Component {
    render() {
        return (
            <Viewport>
                <Header />
                <MainBodyWrapper>
                    <Route exact path="/" component={StartPage} />
                    <Route path="/about" component={AboutPage} />
                </MainBodyWrapper>
                <Footer />
            </Viewport>
        );
    }
}

export default Layout;

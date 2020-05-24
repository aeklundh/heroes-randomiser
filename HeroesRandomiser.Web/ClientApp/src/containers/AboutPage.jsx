import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { shouldFetchPage } from '../utilities/pageUtilities';
import { linkResolver, richTextRender } from '../utilities/prismicUtilities';
import { fetchAboutPage } from '../store/pages/actions';

//Style
import { MainBodyInner } from '../style/pageLayout';
import Spinner from '../components/Spinner';

class AboutPage extends Component {
    componentDidMount = () => {
        document.title = "Heroes Randomiser | About";

        if (shouldFetchPage(this.props.aboutPage, this.props.isLoading, this.props.isFailed)) {
            this.props.fetchAboutPage();
        }
    }

    render() {
        if (this.props.isLoading) {
            return (
                <MainBodyInner>
                    <Spinner />
                </MainBodyInner>
            );
        }

        if (this.props.isFailed) {
            return (
                <MainBodyInner>
                    <p>Could not fetch about page</p>
                </MainBodyInner>
            );
        }
        
        return (
            <MainBodyInner>
                {richTextRender(this.props.aboutPage.body, linkResolver)}
            </MainBodyInner>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoading: state.pages.about.isLoading,
        inGameCategories: state.pages.about.isLoading,
        aboutPage: state.pages.about.page
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchAboutPage: bindActionCreators(fetchAboutPage, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AboutPage);

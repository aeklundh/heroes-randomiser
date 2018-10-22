import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { shouldFetchPage } from '../utilities/pageUtilities';
import { linkResolver, richTextRender } from '../utilities/prismicUtilities';
import { fetchAboutPage } from '../store/pages/actions';

//Style
import { MainBodySection } from '../style/pageLayout';
import Spinner from '../style/Spinner';

class AboutPage extends Component {
    componentDidMount = () => {
        if (shouldFetchPage(this.props.aboutPage, this.props.isLoading, this.props.isFailed)) {
            this.props.fetchAboutPage();
        }
    }

    render() {
        if (this.props.isLoading) {
            return (
                <MainBodySection>
                    <Spinner />
                </MainBodySection>
            );
        }

        if (this.props.isFailed) {
            return (
                <MainBodySection>
                    <p>Could not fetch hero data</p>
                </MainBodySection>
            );
        }
        
        return (
            <MainBodySection>
                {richTextRender(this.props.aboutPage.body, linkResolver)}
            </MainBodySection>
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

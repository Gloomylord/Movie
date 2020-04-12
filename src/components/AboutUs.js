import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    withRouter,
} from "react-router-dom";
import {routerReducer} from 'react-router-redux';
import cn from 'classnames';
import './styleFiles/AboutUS.css'
import * as Selectors from "../store/MoviesInfo/reducer";


class AboutUs extends Component {

    render() {
        return (
            <div className='about-us-style'>
                <div className={cn({'text-color-main-dark':this.props.isDark,
                'text-color-main-white':!this.props.isDark})}>
                    Сервис был написан на JavaScript, с использованием React и Redux.
                </div>
                <div className={cn({'text-color-main-dark':this.props.isDark,
                    'text-color-main-white':!this.props.isDark})}>
                    Спасибо, что интересуетесь нами, мы очень старались.
                    <br/>Вот котик для настроения, вы супер.
                </div>
                <div className='img-border'>
                    <img className='about-us-img' src='/img/cat.jpg'/>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        routing: routerReducer,
        isAdmin: Selectors.checkIsAdmin(state),
        isDark: Selectors.checkIsDark(state),
    };
}

export default withRouter(connect(mapStateToProps)(AboutUs));






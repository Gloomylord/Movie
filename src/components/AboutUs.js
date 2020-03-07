import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    withRouter,
} from "react-router-dom";
import {routerReducer} from 'react-router-redux';

import '../iconmonstr-iconic-font-1.3.0/css/iconmonstr-iconic-font.css';
import '../iconmonstr-iconic-font-1.3.0/css/iconmonstr-iconic-font.min.css';
import './styleFiles/AboutUS.css'

class AboutUs extends Component {

    render() {
        return (
            <div className='about-us-style'>
                <div className='text-color-main '>
                    Сервис был написан на JavaScript, с использованием React и Redux.
                </div>
                <div className='text-color-main '>
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
    };
}

export default withRouter(connect(mapStateToProps)(AboutUs));






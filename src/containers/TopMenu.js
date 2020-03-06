import React, {Component} from 'react';
import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import * as Selectors from '../store/MoviesInfo/reducer';
import * as Actions from "../store/MoviesInfo/actions";
import Search from "../components/Search";

import './styleFiles/TopMenu.css';
import '../iconmonstr-iconic-font-1.3.0/css/iconmonstr-iconic-font.css';
import '../iconmonstr-iconic-font-1.3.0/css/iconmonstr-iconic-font.min.css';
import {NavLink} from "react-router-dom";

class TopMenu extends Component {

    render() {
        return (
            <div className="top-menu">
                <div className='top-menu-pos center'>
                    <NavLink className='nav' to="/">
                        <div className='center pointer top-button'>Главная</div>
                    </NavLink>
                    <NavLink className='nav' to="/timetable">
                        <div className='center pointer top-button'>Расписание</div>
                    </NavLink>
                    <div className='center pointer top-button about-as'>О сервисе</div>
                </div>
                <Search/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const some = Selectors.getSome(state);
    return {
        some,
        showMsg: state.movieInfo.showMsg
    };
}

export default connect(mapStateToProps)(TopMenu);

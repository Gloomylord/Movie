import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as Selectors from '../store/MoviesInfo/reducer';
import * as Actions from "../store/MoviesInfo/actions";
import Search from "../components/Search";

import './styleFiles/TopMenu.css';
import {NavLink} from "react-router-dom";

class TopMenu extends Component {

    render() {
        return (
            <div className="top-menu">
                <div className='top-menu-pos center'>
                    <div className='position-div'>
                        <NavLink className='nav' to="/">
                            <div className='center pointer top-button'>Главная</div>
                        </NavLink>
                        <NavLink className='nav' to="/timetable">
                            <div className='center pointer top-button'>Расписание</div>
                        </NavLink>
                        <div className='center pointer top-button'
                             onClick={()=>this.props.dispatch(Actions.changeAdmin())}
                        >Редактировать</div>
                    </div>
                    <Search/>
                </div>
                <NavLink className='nav about-us' to="/about_us">
                    <div className='center pointer top-button '>О сервисе</div>
                </NavLink>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const some = Selectors.getSome(state);
    return {
        some,
        isAdmin: Selectors.checkIsAdmin(state),
        showMsg: state.movieInfo.showMsg,
    };
}

export default connect(mapStateToProps)(TopMenu);

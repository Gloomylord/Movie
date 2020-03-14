import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as Selectors from '../store/MoviesInfo/reducer';
import * as Actions from "../store/MoviesInfo/actions";
import Search from "../components/Search";
import cn from 'classnames';
import './styleFiles/TopMenu.css';
import {NavLink} from "react-router-dom";

class TopMenu extends Component {

    render() {
        let isDark = this.props.isDark;
        return (
            <div className={cn({'top-menu-dark': isDark, 'top-menu-white': !isDark})}>
                <div className='top-menu-pos center'>
                    <div className='position-div'>
                        <NavLink className='nav' to="/">
                            <div className={cn('center pointer', {
                                'top-button-dark': isDark,
                                'top-button-white': !isDark
                            })}>Главная
                            </div>
                        </NavLink>
                        <NavLink className='nav' to="/timetable">
                            <div className={cn('center pointer', {
                                'top-button-dark': isDark,
                                'top-button-white': !isDark
                            })}>Расписание
                            </div>
                        </NavLink>
                        <div className={cn('center pointer', {'top-button-dark': isDark, 'top-button-white': !isDark})}
                             onClick={() => this.props.dispatch(Actions.changeAdmin())}
                        >{!this.props.isAdmin ? 'Редактировать' : 'Закончить редактирование'}</div>
                    </div>
                    <Search/>
                </div>
                <div className={cn('change-dark ')}>
                    <div className={cn('circle', {
                        'dark-true': isDark,
                        'dark-false': !isDark
                    })} onClick={() => this.props.dispatch(Actions.changeDark())}/>
                </div>
                <NavLink className='nav about-us' to="/about_us">
                    <div className={cn('center pointer', {'top-button-dark': isDark, 'top-button-white': !isDark})}>О
                        сервисе
                    </div>
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
        isDark: Selectors.checkIsDark(state),
    };
}

export default connect(mapStateToProps)(TopMenu);

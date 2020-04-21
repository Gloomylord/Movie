import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as Selectors from '../store/MoviesInfo/reducer';
import * as Actions from "../store/MoviesInfo/actions";
import cn from 'classnames';
import './styleFiles/TopMenu.css';
import {NavLink} from "react-router-dom";

class TopMenu extends Component {

    closeAddMovie = () => {
        if (this.props.addMovie) {
            this.props.dispatch(Actions.changeShowAddMovie());
        }
    };

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
                            })}
                                 onClick={this.closeAddMovie}>Главная
                            </div>
                        </NavLink>
                        <NavLink className='nav' to="/timetable">
                            <div className={cn('center pointer', {
                                'top-button-dark': isDark,
                                'top-button-white': !isDark
                            })}
                                 onClick={this.closeAddMovie}>Расписание
                            </div>
                        </NavLink>
                        <div className={cn('center pointer', {'top-button-dark': isDark, 'top-button-white': !isDark})}
                             onClick={() => {this.props.dispatch(Actions.changeAdmin()); this.closeAddMovie();}}
                        >{!this.props.isAdmin ? 'Редактировать' : 'Закончить редактирование'}</div>
                    </div>

                </div>
                <div className='change-dark circle-wr'
                     title={cn({'светлая тема': this.props.isDark, 'темная тема': !this.props.isDark})}
                     onClick={() => this.props.dispatch(Actions.changeDark())}>
                    <div className={cn('circle', {
                        'dark-true': isDark,
                        'dark-false': !isDark
                    })}/>
                </div>
                <NavLink className='nav about-us' to="/about_us">
                    <div className={cn('center pointer', {
                        'top-button-dark': isDark,
                        'top-button-white': !isDark})}
                         onClick={this.closeAddMovie}
                    >О сервисе
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
        addMovie: Selectors.checkAddMovie(state),
    };
}

export default connect(mapStateToProps)(TopMenu);

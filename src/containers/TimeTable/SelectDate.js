import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as Selectors from '../../store/MoviesInfo/reducer';
import * as Actions from '../../store/MoviesInfo/actions'
import {
    withRouter,
} from "react-router-dom";
import {routerReducer} from 'react-router-redux';
import cn from "classnames";
import DateButton from "./DateButton";

class SelectDate extends Component {

    addMovie = () => {
        this.props.dispatch(Actions.changeShowAddMovie());
    };

    createDate = (year, month, day) => {
        let obj = {};
        let date = new Date(year, month, day, 0, 0, 0);
        let monthName = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
        let days = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];
        obj.month = monthName[date.getMonth() - 1];
        obj.day = days[date.getDay()];
        let corMonth;
        if ((date.getMonth() + 1) < 10) {
            corMonth = '0' + (date.getMonth() + 1);
        } else {
            corMonth = (date.getMonth() + 1);
        }
        let corDay;
        if (date.getDate() < 10) {
            corDay = '0' + date.getDate();
        } else {
            corDay = date.getDate();
        }

        obj.date = date.getFullYear() + '-' + corMonth + '-' + corDay;
        return obj;
    };

    selectDates = () => {
        let nowDate = new Date();
        let year = nowDate.getFullYear();
        let month = nowDate.getMonth();
        let day = nowDate.getDate();
        let mass = [];
        for (let i = 0; i < 15; i++) {
            mass.push(this.createDate(year, month, day + i + this.props.addDay));
        }
        return mass
    };

    addDay = () => {
        this.props.dispatch(Actions.addDayPlus());
    };

    subtractDay = () => {
        if (!(this.props.addDay === 0)) {
            this.props.dispatch(Actions.addDayMinus());
        }
    };


    render() {
        return <div className='select-date-main'>
            <i className={cn("im im-angle-left btn-scroll pointer ", {
                'btn-scroll-dark': this.props.isDark,
                'btn-scroll-white': !this.props.isDark
            })}
               onClick={this.addDay}
            />
            <div className={cn('select-date', {
                'select-date-dark': this.props.isDark,
                'select-date-white': !this.props.isDark
            })}>
                {
                    this.selectDates().map(value =>
                        <DateButton
                            key={"date" + value.date}
                            date={value.date}
                            day={value.day}
                        />
                    )
                }
            </div>
            <i className={cn("im im-angle-right btn-scroll pointer", {
                'btn-scroll-dark': this.props.isDark,
                'btn-scroll-white': !this.props.isDark,
            })}
               onClick={this.subtractDay}
            />
        </div>

    }
}

function mapStateToProps(state) {
    return {
        datetimes: Selectors.getTimes(state),
        movieInfo: Selectors.getMovieInfo(state),
        routing: routerReducer,
        showMsg: state.movieInfo.showMsg,
        isAdmin: Selectors.checkIsAdmin(state),
        movies: Selectors.getMovies(state),
        editingTime: Selectors.checkEditingTime(state),
        isDark: Selectors.checkIsDark(state),
        addDay: Selectors.getAddDay(state),
    };
}

export default withRouter(connect(mapStateToProps)(SelectDate));






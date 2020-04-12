import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as Selectors from '../store/MoviesInfo/reducer';
import './styleFiles/TimeTable.css'
import {
    NavLink,
    withRouter,
} from "react-router-dom";
import {routerReducer} from 'react-router-redux';
import cn from "classnames"

import '../iconmonstr-iconic-font-1.3.0/css/iconmonstr-iconic-font.min.css';
import '../iconmonstr-iconic-font-1.3.0/css/iconmonstr-iconic-font.css';
import * as Actions from "../store/MoviesInfo/actions";


class TimeTable extends Component {

    selectTimeTable = () => {
        let movieNames = new Set();
        this.props.times.forEach((time) => movieNames.add(time.movieName));
        let movies = Array.from(movieNames);
        return movies.map((movie) => {
            let times = [];
            let url, id;
            this.props.times.forEach((value) => {
                if (value.movieName === movie) {
                    times.push(value.time);
                }
            });
            this.props.movies.forEach(value => {
                if (value.name === movie) {
                    url = value.url;
                    id = value.id;
                }
            });
            return {movieName: movie, times: times, url: url, id: id}
        });
    };

    render() {
        let movies = this.selectTimeTable();
        let timeList = movies.map((value) => <div key={value.id} className={cn('one-movie-time-tables',{
            'border-for-dark':this.props.isDark,
            'border-for-white':!this.props.isDark})}>
            <div className='margin-auto'>
                <img className='img-style-time-table'
                     src={value.url}
                />
            </div>
            <div className={cn('tile-list',{
                'text-color-main-dark':this.props.isDark,
                'text-color-main-white':!this.props.isDark,
            })} key={'key' + value.times[0]}>
                {value.movieName}
            </div>
            <div className='btn-time-table'>
                {value.times.map((time) =>
                    !this.props.isAdmin ?
                        <NavLink to={'/movie/reservation/' + value.id + '/' + time} key={time}>
                            <button className={cn({'btn-time-dark':this.props.isDark,
                                'btn-time-white':!this.props.isDark,
                            })} key={time + '1'}>{time}</button>
                        </NavLink> :
                        <button className={cn({
                            'btn-time-dark-admin': this.props.isDark,
                            'btn-time-white-admin': !this.props.isDark,
                        })}
                                key={time + '1'}>
                            {time}
                            <i className="im im-x-mark btn-delete-time"
                               onClick={() => this.props.dispatch(Actions.deleteTime(time))}/>
                        </button>)}

            </div>
        </div>);

        return (
            <div className='time-tables'>
                {timeList}
                {this.props.isAdmin ? <div className={cn('one-movie-time-tables add-movie-time-table',{
                    'border-for-dark':this.props.isDark,
                    'border-for-white':!this.props.isDark})}>
                    <i className={cn("im im-plus plus",{
                        'text-color-main-dark':this.props.isDark,
                        'text-color-main-white':!this.props.isDark,
                    })}/>
                    <div className={cn({
                        'text-color-main-dark':this.props.isDark,
                        'text-color-main-white':!this.props.isDark,
                    })}> Добавить фильм</div>
                </div> : ''}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        times: Selectors.getTimes(state),
        movieInfo: Selectors.getMovieInfo(state),
        routing: routerReducer,
        showMsg: state.movieInfo.showMsg,
        isAdmin: Selectors.checkIsAdmin(state),
        movies: Selectors.getMovies(state),
        editingTime: Selectors.checkEditingTime(state),
        isDark: Selectors.checkIsDark(state),
    };
}

export default withRouter(connect(mapStateToProps)(TimeTable));






import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as Selectors from '../store/MoviesInfo/reducer';
import './styleFiles/TimeTable.css'
import {
    NavLink,
    withRouter,
} from "react-router-dom";
import {routerReducer} from 'react-router-redux';


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
        let timeList = movies.map((value) => <div className='one-movie-time-tables'>
            <div className='margin-auto'>
                <img className='img-style-time-table'
                     src={value.url}
                />
            </div>
            <div className='text-color-main tile-list' key={'key' + value.times[0]}>
                {value.movieName}
            </div>
            <div className='btn-time-table'>
                {value.times.map((time) => <NavLink to={'/movie/reservation/' + value.id + '/' + time} key={time}>
                    <button className='btn-time '
                            key={time + '1'}
                    >{time}</button>
                </NavLink>)}
            </div>
        </div>);

        return (
            <div className='time-tables'>
                {timeList}
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
    };
}

export default withRouter(connect(mapStateToProps)(TimeTable));






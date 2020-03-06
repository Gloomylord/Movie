import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import * as Selectors from '../store/MoviesInfo/reducer';
import * as Actions from "../store/MoviesInfo/actions";

import '../iconmonstr-iconic-font-1.3.0/css/iconmonstr-iconic-font.css';
import '../iconmonstr-iconic-font-1.3.0/css/iconmonstr-iconic-font.min.css';
import './styleFiles/TimeTable.css'

import {
    Link,
    withRouter,
} from "react-router-dom";
import {routerReducer} from 'react-router-redux';


class TimeTable extends Component {

    selectTimeTable = () => {
        let movieNames = new Set();
        this.props.times.forEach((time) => movieNames.add({movieName: time.movieName, times: []}));
        let movies = Array.from(movieNames);
        this.props.times.forEach((time) => {
            movies.forEach((value) => {
                if (value.movieName === time.movieName) {
                    value.times.push(time.time);
                }
            })
        });
        return movies;
    };

    render() {
        let movies = this.selectTimeTable();
        let timeList = movies.map((value) => <div>
            <div className='text-color-main tile-list'>
                {'Фильм: ' + value.movieName}
            </div>
            {value.times.map((time) => <Link to={'reservation/'}>
                <button className='btn-time'
                        key={time.time}
                >{time}</button>
            </Link>)}
        </div>);

        return (
            <div className='time-table'>
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
        showMsg: state.movieInfo.showMsg
    };
}

export default withRouter(connect(mapStateToProps)(TimeTable));






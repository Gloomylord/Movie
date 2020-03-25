import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as Selectors from '../../store/MoviesInfo/reducer';
import * as Actions from '../../store/MoviesInfo/actions'
import './TimeTable.css'
import {
    withRouter,
} from "react-router-dom";
import {routerReducer} from 'react-router-redux';
import cn from "classnames"
import '../../iconmonstr-iconic-font-1.3.0/css/iconmonstr-iconic-font.min.css';
import '../../iconmonstr-iconic-font-1.3.0/css/iconmonstr-iconic-font.css';
import MovieContainer from "./MovieContainer";
import SelectDate from "./SelectDate";


class TimeTable extends Component {

    addMovie = () => {
        this.props.dispatch(Actions.changeShowAddMovie());
    };

    componentDidMount() {
        let date = new Date();
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
        date = date.getFullYear() + '-' + corMonth + '-' + corDay;
        console.log('date',date);
        this.props.dispatch(Actions.fetchMovies());
        this.props.dispatch(Actions.fetchAllSessions());
        this.props.dispatch(Actions.changeDate(date));
    }

    selectMovie = () => {
        let movieId = new Set();
        let movies = [];
        console.log('movies: ' ,this.props.movies,'date:',this.props.selectDate,'time',this.props.dateTimes);
        if (!(this.props.movies === null) && !(this.props.selectDate === null) && !(this.props.dateTimes === null)) {
            this.props.dateTimes.forEach(value => {
                if (this.props.selectDate === value.date) {
                    movieId.add(value.movieId);
                }
            });
            console.log('here');
            movieId.forEach(value => {
                this.props.movies.forEach(movie => {
                    if (movie.id === value) {
                        movies.push(movie);
                    }
                })
            });
            return movies;
        } else {
            return null
        }
    };

    render() {
        let movies = this.selectMovie();
        return (
            <div className='select-sessions'>
                <SelectDate/>
                <div className={cn('time-tables',{
                    'timetable-row':!(movies === null)&&!(movies.length === 0),
                    'timetable-column':(movies === null)||(movies.length === 0),
                })}>
                    {movies === null ?
                        <div className={cn('title', {
                            'text-color-main-dark': this.props.isDark,
                            'text-color-main-white': !this.props.isDark
                        })}>Подождите немного
                        </div>
                        : (movies.length === 0) ?
                            <div className={cn('title', {
                                'text-color-main-dark': this.props.isDark,
                                'text-color-main-white': !this.props.isDark
                            })}>В этот день нет сеансов
                            </div>
                            : movies.map((value) => <MovieContainer info={value} key={value.id} />)
                    }
                    {this.props.isAdmin && <div onClick={this.addMovie}
                                                className={cn('one-movie-time-tables add-movie-time-table', {
                                                    'border-for-dark': this.props.isDark,
                                                    'border-for-white': !this.props.isDark,
                                                    'center': (movies === null)||(movies.length === 0),
                                                })}>
                        <div className='img-pos'>
                            <i className={cn("im im-plus plus", {
                                'text-color-main-dark': this.props.isDark,
                                'text-color-main-white': !this.props.isDark,
                            })}/>
                            <div className={cn({
                                'text-color-main-dark': this.props.isDark,
                                'text-color-main-white': !this.props.isDark,
                            })}> Добавить фильм
                            </div>
                        </div>
                    </div>
                    }
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        dateTimes: Selectors.getTimes(state),
        movieInfo: Selectors.getMovieInfo(state),
        routing: routerReducer,
        showMsg: state.movieInfo.showMsg,
        isAdmin: Selectors.checkIsAdmin(state),
        movies: Selectors.getMovies(state),
        editingTime: Selectors.checkEditingTime(state),
        isDark: Selectors.checkIsDark(state),
        selectDate: Selectors.selectDate(state),
    };
}

export default withRouter(connect(mapStateToProps)(TimeTable));






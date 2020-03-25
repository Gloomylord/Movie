import * as types from './actionTypes';
import * as movieInfoSelectors from './reducer';

export function changeSome() {
    return ({type: types.SOME});
}

export function fetchMovies() {
    return async (dispatch) => {
        let movies;
        try {
            let response = await fetch('/api/movies', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({list: 'get All'})
            });
            let start = await response.json();
            if (start.movies) {
                movies = start.movies;
            }
        } catch (e) {
            console.log('error: ', e);
        }
        dispatch({type: types.DESCRIPTION, movies});
    };
}

export function fetchSessions(id) {
    return async (dispatch) => {
        let timesForOneMovie;
        try {
            let response = await fetch('/api/sessions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({id: id})
            });
            let res = await response.json();
            if (res.sessions) {
                timesForOneMovie = res.sessions;
            }
        } catch (e) {
            console.log('error: ', e);
        }
        dispatch({type: types.CHANGE_TIME_ONE_MOVIE, timesForOneMovie});
    };
}

export function fetchAllSessions() {
    return async (dispatch) => {
        let times;
        try {
            let response = await fetch('/api/allsessions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({message: 'top'})
            });
            let res = await response.json();
            if (res.sessions) {
                times = res.sessions;
            }
        } catch (e) {
            console.log('error: ', e);
        }
        dispatch({type: types.CHANGE_TIME, times});
    };
}

export function changeEditingDescription() {
    return ({type: types.EDITING_DESCRIPTION});
}

export function changeDate(selectDate) {
    console.log('date', selectDate);
    return ({type: types.CHANGE_DATE, selectDate});
}

export function changeEditingImg() {
    return ({type: types.EDITING_IMG});
}

export function changeDark() {
    return ({type: types.CHANGE_DARK});
}

export const changeShowAddMovie = () => ({type: types.ADD_MOVIE});

export function changeEditingTime() {
    return ({type: types.EDITING_TIME});
}

export function addDayPlus() {
    return (dispatch, getState) => {
        movieInfoSelectors.getTimesOneMovie(getState());
        dispatch({type: types.ADD_DAY, addDay: 1 + movieInfoSelectors.getAddDay(getState())});
    }
}

export function addDayMinus() {
    return (dispatch, getState) => {
        movieInfoSelectors.getTimesOneMovie(getState());
        dispatch({type: types.ADD_DAY, addDay: movieInfoSelectors.getAddDay(getState()) - 1});
    }
}

export function changeMovie(id) {
    return async (dispatch) => {
        let someMovie;
        try {
            let response = await fetch('/api/movies', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({id: id})
            });
            let res = await response.json();
            if (res.movie[0]) {
                someMovie = res.movie[0];
            } else {
                someMovie = null;
            }
        } catch (e) {
            console.log('error: ', e);
        }
        dispatch({type: types.SOME_MOVIE, someMovie});
    };
}

export function addDateTimeOneMovie(time, date) {
    return (dispatch, getState) => {
        console.log('time: ', time, 'date: ', date);
        let timesForOneMovie, start = true;
        let newTimes = movieInfoSelectors.getTimesOneMovie(getState());
        if (newTimes) {
            timesForOneMovie = newTimes.map((value) => {
                if (value.time === null && value.date === date) {
                    start = false;
                    return {time: time, date: date}
                } else {
                    return value
                }
            });
            if (start) {
                timesForOneMovie = movieInfoSelectors.getTimesOneMovie(getState()).concat([{time: time, date: date}]);
            }
        } else {
            timesForOneMovie = [{time: time, date: date}];
        }
        dispatch({type: types.CHANGE_TIME_ONE_MOVIE, timesForOneMovie});
    }
}

export function deleteDateTimeOneMovie(time, date) {
    return (dispatch, getState) => {
        let timesForOneMovie = [];
        movieInfoSelectors.getTimesOneMovie(getState()).forEach((value) => {
            if (!(value.time === time && value.date === date)) {
                timesForOneMovie.push(value);
            }
        });
        dispatch({type: types.CHANGE_TIME_ONE_MOVIE, timesForOneMovie});
    }
}


export function deleteTime(time, date, movieId) {
    let newTimes = [];
    return (dispatch, getState) => {
        movieInfoSelectors.getTimes(getState()).forEach((some) => {
            if (!(some.time === time && some.date === date && some.movieId === movieId)) {
                newTimes.push(some);
            }
        });
        dispatch({type: types.CHANGE_TIME, times: newTimes});
    };
}


export function changeAdmin() {
    return ({type: types.CHANGE_IS_ADMIN});
}





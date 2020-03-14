import * as types from './actionTypes';
import * as movieInfoSelectors from './reducer';

export function changeSome() {
    return ({type: types.SOME});
}

export function changeEditingDescription() {
    return ({type: types.EDITING_DESCRIPTION});
}

export function changeEditingImg() {
    return ({type: types.EDITING_IMG});
}

export function changeDark() {
    return ({type: types.CHANGE_DARK});
}


export function changeShowAddMovie() {
    return ({type: types.ADD_MOVIE});
}

export function changeDescription(id,description) {
    return (dispatch, getState) => {
        let movies = movieInfoSelectors.getMovies(getState()).map((some) => {
            if (some.id === id) {
                return {id: some.id , name: some.name, url: some.url, description: description }
            } else {
                return some;
            }
        });
        dispatch({type: types.DESCRIPTION, movies});
    };
}

export function changeEditingTime() {
    return ({type: types.EDITING_TIME});
}

export function changeMovie(id) {
    if (id) {
        return (dispatch, getState) => {
            const movies = movieInfoSelectors.getMovies(getState());
            let someMovie;
            movies.forEach((some) => {
                if (some.id === id) {
                    someMovie = some;
                }
            });
            dispatch({type: types.SOME_MOVIE, someMovie});

        };
    } else {
        return (dispatch, getState) => {
            let p = null;
            dispatch({type: types.SOME_MOVIE, p});

        };
    }

}

export function addTime(time,movieName) {
    return (dispatch,getState) => {
        let newTimes = movieInfoSelectors.getTimes(getState()).concat([{time: time, movieName: movieName}]);
        console.log(newTimes);
         dispatch({type: types.CHANGE_TIME, times: newTimes});
    }
}

export function deleteTime(time) {
    let newTimes=[];
    return (dispatch, getState) => {
        movieInfoSelectors.getTimes(getState()).forEach((some) => {
            if (some.time !== time) {
                newTimes.push(some);
            }
        });
        dispatch({type: types.CHANGE_TIME, times:newTimes});
    };
}


export function changeAdmin() {
    return ({type: types.CHANGE_IS_ADMIN});
}





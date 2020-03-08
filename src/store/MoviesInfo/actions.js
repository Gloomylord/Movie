import * as types from './actionTypes';
import * as movieInfoSelectors from './reducer';


export function changeSome() {
    return ({type: types.SOME});
}

export function changeEditingDescription() {
    return ({type: types.EDITING_DESCRIPTION});
}

export function changeDescription(id,description) {
    return (dispatch, getState) => {
        let movies = movieInfoSelectors.getMovies(getState());
        movies.forEach((some) => {
            if (some.id === id) {
                some.description = description;
            }
        });
        dispatch(({type: types.DESCRIPTION,movies}));

    };
}

export function changeTimeChose(time) {
    return ({type: types.TOGGLE_IS_CHOSE_TIME, time});
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
            console.log('it work');
            dispatch({type: types.SOME_MOVIE, p});

        };
    }

}

export function addTime(time, getState) {
    let last = movieInfoSelectors.getMovies(getState());
    last.push(time);
    return ({type: types.ADD_TIME, last});
}

export function changeAdmin() {
    return ({type: types.CHANGE_IS_ADMIN});
}





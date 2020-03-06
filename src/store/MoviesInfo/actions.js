import * as types from './actionTypes';
import * as movieInfoSelectors from './reducer';


export function changeSome() {
    return ({type: types.SOME});
}

export function changeTimeChose() {
    return ({type: types.TOGGLE_ISCHOSETIME});
}

export function changeMovie(id) {
    if(id) {
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

export function toggleMsg() {
    return ({type: types.TOGGLE_MSG});
}






import * as types from './actionTypes';
import Immutable from 'seamless-immutable';
import some from "./some";
import times from "./times";
import places from "./Places";

const initialState = Immutable({
    some: false,
    showMsg: true,
    someMovie: null,
    movies: some,
    times: times,
    isChoseTime: false,
    places: places,
    isAdmin: false,
    editingDescription: false,

});

export default function reduce(state = initialState, action = {}) {
    switch (action.type) {
        case types.TOGGLE_IS_CHOSE_TIME:
            return state.merge({
                isChoseTime: action.time
            });
        case types.CHANGE_IS_ADMIN:
            return state.merge({
                isAdmin: !state.isAdmin
            });
        case types.SOME:
            return state.merge({
                some: !state.some
            });
        case types.TOGGLE_MSG:
            return state.merge({
                showMsg: !state.showMsg
            });
        case types.SOME_MOVIE:
            return state.merge({
                someMovie: action.someMovie
            });
        case types.ADD_TIME:
            return state.merge({
                times: action.times
            });
        case types.EDITING_DESCRIPTION:
            return state.merge({
                editingDescription: !state.editingDescription
            });
        case types.DESCRIPTION:
            return state.merge({
                movies: action.movies
            });
        default:
            return state;
    }
}

function forSort(time1,time2) {
    let hour1 = time1.slice(0,2);
    let hour2 = time2.slice(0,2);
    let min1 = time1.slice(3);
    let min2 = time2.search(3);
    if(+hour1 > +hour2){
        return 1
    } else if(+hour1 < +hour2){
        return -1
    } else if(+hour1 === +hour2){
        if(+hour1 > +hour2){
            return 1
        } else if(+min1 < +min2){
            return -1
        } else if(+min1 === +min2){
            return 0
        }
    }
}

// selectors

export function getSome(state) {
    return state.movieInfo.some;
}

export function checkEditingDescription(state) {
    return state.movieInfo.editingDescription;
}

export function checkIsAdmin(state) {
    return state.movieInfo.isAdmin;
}

export function checkChoseTime(state) {
    return state.movieInfo.isChoseTime;
}

export function getPlaces(state) {
    return state.movieInfo.places;
}

export function getTimes(state) {
    //let time = [state.movieInfo.times.sort(forSort)];
    return state.movieInfo.times;
}

export function getMovieInfo(state) {
    return state.movieInfo.someMovie;
}

export function getMovies(state) {
    return state.movieInfo.movies;
}


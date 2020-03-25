import * as types from './actionTypes';
import Immutable from 'seamless-immutable';
import places from "./Places";

const initialState = Immutable({
    some: false,
    showMsg: true,
    someMovie: null,
    movies: null,
    times: null,
    places: places,
    isAdmin: false,
    editingDescription: false,
    editingImg: false,
    editingTime: false,
    addMovie: false,
    isDark: true,
    timesForOneMovie: null,
    selectDate: null,
    addDay: 0,
});

export default function reduce(state = initialState, action = {}) {
    switch (action.type) {
        case types.ADD_DAY:
            return state.merge({
                addDay: action.addDay
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
        case types.CHANGE_TIME:
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
        case types.EDITING_IMG:
            return state.merge({
                editingImg: !state.editingImg
            });
        case types.EDITING_TIME:
            return state.merge({
                editingTime: !state.editingTime
            });
        case types.ADD_MOVIE:
            return state.merge({
                addMovie: !state.addMovie
            });
        case types.CHANGE_DARK:
            return state.merge({
                isDark: !state.isDark
            });
        case types.CHANGE_TIME_ONE_MOVIE:
            return state.merge({
                timesForOneMovie: action.timesForOneMovie
            });
        case types.CHANGE_DATE:
            return state.merge({
                selectDate: action.selectDate
            });
        default:
            return state;
    }
}


// selectors

export function getSome(state) {
    return state.movieInfo.some;
}

export function selectDate(state) {
    return state.movieInfo.selectDate;
}

export function getAddDay(state) {
    return state.movieInfo.addDay;
}

export function checkIsDark(state) {
    return state.movieInfo.isDark;
}

export function getTimesOneMovie(state) {
    return state.movieInfo.timesForOneMovie;
}

export function checkAddMovie(state) {
    return state.movieInfo.addMovie;
}

export function checkEditingTime(state) {
    return state.movieInfo.editingTime;
}

export function checkEditingImg(state) {
    return state.movieInfo.editingImg;
}

export function checkEditingDescription(state) {
    return state.movieInfo.editingDescription;
}

export function checkIsAdmin(state) {
    return state.movieInfo.isAdmin;
}

export function getPlaces(state) {
    return state.movieInfo.places;
}

export function getTimes(state) {
    return state.movieInfo.times;
}

export function getMovieInfo(state) {
    return state.movieInfo.someMovie;
}

export function getMovies(state) {
    return state.movieInfo.movies;
}


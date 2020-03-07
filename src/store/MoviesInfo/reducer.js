import * as types from './actionTypes';
import Immutable from 'seamless-immutable';
import some from "./some";
import times from "./times";
import places from "./Places";

const initialState = Immutable({
    some: false,
    topicsByUrl: undefined,
    selectedTopicUrls: [],
    selectionFinalized: false,
    showMsg: true,
    someMovie: null,
    movies: some,
    times: times,
    isChoseTime: false,
    places: places,
});

export default function reduce(state = initialState, action = {}) {
    switch (action.type) {
        case types.TOGGLE_ISCHOSETIME:
            return state.merge({
                isChoseTime: action.time
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
        default:
            return state;
    }
}

// selectors

export function getSome(state) {
    return state.movieInfo.some;
}

export function checkChoseTime(state) {
    return state.movieInfo.isChoseTime;
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


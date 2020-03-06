import React, {Component, Fragment} from 'react';
import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import * as Selectors from '../store/MoviesInfo/reducer';
import * as Actions from "../store/MoviesInfo/actions";

import '../iconmonstr-iconic-font-1.3.0/css/iconmonstr-iconic-font.css';
import '../iconmonstr-iconic-font-1.3.0/css/iconmonstr-iconic-font.min.css';
import './styleFiles/GetMovie.css'

import Movie from "../containers/Movie";

class GetMovie extends Component {

    render() {
        let list = this.props.movies.map(some => <Movie some={some}/>);
        return (
            <Fragment>
                <div className='text-color-main title'>Скоро в кино</div>
                <div className="movie-list-style">
                    {list}
                </div>
            </Fragment>
        );
    }
}

function mapStateToProps(state) {
    const some = Selectors.getSome(state);
    return {
        some,
        movies: Selectors.getMovies(state),
        showMsg: state.movieInfo.showMsg
    };
}

export default connect(mapStateToProps)(GetMovie);

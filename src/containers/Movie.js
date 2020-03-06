import React, {Component} from 'react';
import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import * as Selectors from '../store/MoviesInfo/reducer';
import * as Actions from "../store/MoviesInfo/actions";

import '../iconmonstr-iconic-font-1.3.0/css/iconmonstr-iconic-font.css';
import '../iconmonstr-iconic-font-1.3.0/css/iconmonstr-iconic-font.min.css';
import './styleFiles/Movie.css'
import {Link} from "react-router-dom";

class Movie extends Component {
    state = {
        movieInfo: this.props.some
    };

    render() {
        return (
            <div key={this.state.movieInfo.id} className='movie-img-style' onClick={this.changeMovie}>
                <Link to={'/movie/' + this.state.movieInfo.id}>
                    <img className='pointer img-style'
                         src={this.state.movieInfo.url}
                    />
                </Link>
                <div className='text-color-main'>{this.state.movieInfo.name}</div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const movies = Selectors.getMovies(state);
    return {
        movies,
        showMsg: state.movieInfo.showMsg
    };
}

export default connect(mapStateToProps)(Movie);






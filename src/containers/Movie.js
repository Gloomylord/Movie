import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as Selectors from '../store/MoviesInfo/reducer';
import './styleFiles/Movie.css'
import {Link} from "react-router-dom";
import cn from "classnames";

class Movie extends Component {
    state = {
        movieInfo: this.props.some
    };

    render() {
        return (
            <div key={this.state.movieInfo.id} className='movie-img-style-white' onClick={this.changeMovie}>
                <Link to={'/movie/' + this.state.movieInfo.id}>
                    <img className={cn('pointer img-style',{
                        'img-style-dark': this.props.isDark,
                        'img-style-white': !this.props.isDark,
                    })}
                         src={this.state.movieInfo.url}
                    />
                </Link>
                <div className={cn({
                    'text-color-main-dark':this.props.isDark,
                    'text-color-main-white':!this.props.isDark
                })}>{this.state.movieInfo.name}</div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const movies = Selectors.getMovies(state);
    return {
        movies,
        isAdmin: Selectors.checkIsAdmin(state),
        showMsg: state.movieInfo.showMsg,
        isDark: Selectors.checkIsDark(state),

    };
}

export default connect(mapStateToProps)(Movie);






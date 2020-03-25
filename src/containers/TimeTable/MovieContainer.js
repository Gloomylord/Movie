import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as Selectors from '../../store/MoviesInfo/reducer';
import * as Actions from '../../store/MoviesInfo/actions'
import {
    withRouter,
} from "react-router-dom";
import {routerReducer} from 'react-router-redux';
import cn from "classnames";
import '../../iconmonstr-iconic-font-1.3.0/css/iconmonstr-iconic-font.min.css';
import '../../iconmonstr-iconic-font-1.3.0/css/iconmonstr-iconic-font.css';
import Sessions from "./Sessions";


class MovieContainer extends Component {

    addMovie = () => {
        console.log('addMovie');
        this.props.dispatch(Actions.changeShowAddMovie());
    };

    render() {
        let movieInfo = this.props.info;
        return (
            <div key={movieInfo.id} className={cn('one-movie-time-tables', {
                'border-for-dark': this.props.isDark,
                'border-for-white': !this.props.isDark
            })}>
                <div className='img-pos'>
                    <div>
                        <img className='img-style-time-table'
                             src={movieInfo.url}
                        />
                    </div>
                    <div className={cn('tile-list', {
                        'text-color-main-dark': this.props.isDark,
                        'text-color-main-white': !this.props.isDark,
                    })}>
                        {movieInfo.name}
                    </div>
                </div>
                {this.props.selectDate ?
                    <div className='btn-time-table-1'>
                        <Sessions date={this.props.selectDate} id={movieInfo.id}/>
                    </div> : <div className={cn('tile-list', {
                        'text-color-main-dark': this.props.isDark,
                        'text-color-main-white': !this.props.isDark,
                    })}>Подождите немного</div>
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        datetimes: Selectors.getTimes(state),
        movieInfo: Selectors.getMovieInfo(state),
        routing: routerReducer,
        showMsg: state.movieInfo.showMsg,
        isAdmin: Selectors.checkIsAdmin(state),
        movies: Selectors.getMovies(state),
        editingTime: Selectors.checkEditingTime(state),
        isDark: Selectors.checkIsDark(state),
        selectDate: Selectors.selectDate(state),
    };
}

export default withRouter(connect(mapStateToProps)(MovieContainer));






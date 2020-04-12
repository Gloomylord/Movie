import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as Selectors from '../store/MoviesInfo/reducer';
import * as Actions from '../store/MoviesInfo/actions'
import './styleFiles/GetMovie.css'
import Movie from "../containers/Movie";
import '../iconmonstr-iconic-font-1.3.0/css/iconmonstr-iconic-font.min.css';
import '../iconmonstr-iconic-font-1.3.0/css/iconmonstr-iconic-font.css';
import cn from "classnames";

class GetMovie extends Component {

    addMovie = () =>{
        this.props.dispatch(Actions.changeShowAddMovie());
    };

    render() {
        let list = this.props.movies.map(some => <Movie key={some.id} some={some}/>);
        return (
            <>
                <div className={cn('title',{'text-color-main-dark':this.props.isDark,
                    'text-color-main-white':!this.props.isDark})}>Скоро в кино</div>
                <div className="movie-list-style">
                    {list}
                    {this.props.isAdmin ? <div  className='movie-img-style add-movie pointer'
                                                onClick={this.addMovie}>
                        <i className={cn("im im-plus plus",
                            'text-color-main-dark')}/>
                        <div className='text-color-main-dark'> Добавить фильм </div>
                    </div> : null}
                </div>
            </>
        );
    }
}

function mapStateToProps(state) {
    const some = Selectors.getSome(state);
    return {
        some,
        movies: Selectors.getMovies(state),
        isAdmin: Selectors.checkIsAdmin(state),
        showMsg: state.movieInfo.showMsg,
        isDark: Selectors.checkIsDark(state),
    };
}

export default connect(mapStateToProps)(GetMovie);

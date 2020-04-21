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

    addMovie = () => {
        this.props.changeShowAddMovie();
        // this.props.dispatch(Actions.changeShowAddMovie());
    };

    componentDidMount() {
        this.props.fetchMovies();
    }

    render() {
        let list;
        if (this.props.movies) {
            list = this.props.movies.map(some => <Movie key={some.id} some={some}/>);
        } else {
            list = <div className={cn('title center', {
                'text-color-main-dark': this.props.isDark,
                'text-color-main-white': !this.props.isDark
            })}>Подождите немного</div>
        }
        return (
            <>
                <div className={cn('title', {
                    'text-color-main-dark': this.props.isDark,
                    'text-color-main-white': !this.props.isDark
                })}>Скоро в кино
                </div>
                <div className="movie-list-style">
                    {list}
                    {this.props.isAdmin ? <div className={cn('one-movie-time-tables add-movie-time-table', {
                        'border-for-dark': this.props.isDark,
                        'border-for-white': !this.props.isDark
                    })} onClick={this.addMovie}>
                        <div className='img-pos'>
                            <i className={cn("im im-plus plus", {
                                'text-color-main-dark': this.props.isDark,
                                'text-color-main-white': !this.props.isDark,
                            })}/>
                            <div className={cn({
                                'text-color-main-dark': this.props.isDark,
                                'text-color-main-white': !this.props.isDark,
                            })}> Добавить фильм
                            </div>
                        </div>
                    </div> : null}
                </div>
            </>
        );
    }
}


const mapDispatchToProps = {
    changeShowAddMovie: Actions.changeShowAddMovie,
    fetchMovies: Actions.fetchMovies,
};

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

export default connect(mapStateToProps, mapDispatchToProps)(GetMovie);

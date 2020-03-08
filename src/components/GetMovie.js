import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import * as Selectors from '../store/MoviesInfo/reducer';
import './styleFiles/GetMovie.css'
import Movie from "../containers/Movie";
import '../iconmonstr-iconic-font-1.3.0/css/iconmonstr-iconic-font.min.css';
import '../iconmonstr-iconic-font-1.3.0/css/iconmonstr-iconic-font.css';

class GetMovie extends Component {

    render() {
        console.log(this.props.isAdmin);
        let list = this.props.movies.map(some => <Movie key={some.id} some={some}/>);
        return (
            <Fragment>
                <div className='text-color-main title'>Скоро в кино</div>
                <div className="movie-list-style">
                    {list}
                    {this.props.isAdmin ? <div  className='movie-img-style add-movie'>
                        <i className="im im-plus text-color-main plus"/>
                        <div className='text-color-main'> Добавить фильм </div>
                    </div> : ''}
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
        isAdmin: Selectors.checkIsAdmin(state),
        showMsg: state.movieInfo.showMsg
    };
}

export default connect(mapStateToProps)(GetMovie);

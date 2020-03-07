import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import * as Selectors from '../store/MoviesInfo/reducer';
import * as Actions from "../store/MoviesInfo/actions";

import '../iconmonstr-iconic-font-1.3.0/css/iconmonstr-iconic-font.css';
import '../iconmonstr-iconic-font-1.3.0/css/iconmonstr-iconic-font.min.css';
import './styleFiles/MovieInfo.css'
import ChoseTimes from "./ChoseTimes";
import {
    withRouter,
} from "react-router-dom";
import {routerReducer} from 'react-router-redux';


class MovieInfo extends Component {
    state = {
        movieInfo: null
    };

    componentDidMount() {
        this.props.dispatch(Actions.changeMovie(this.props.match.params.topicId));

    }
    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.movieInfo !== this.props.movieInfo || nextProps.movieInfo !== this.state.movieInfo ){
            this.setState({
                movieInfo: nextProps.movieInfo
            })
        }
    }

    render() {
        return (
            <Fragment>
                {(this.state.movieInfo) ?
                        <div key={this.state.movieInfo.id} className='movie-style ' onClick={this.changeMovie}>
                            <div>
                                <img className='img-style-info img'
                                     src={this.state.movieInfo.url}
                                />
                            </div>
                            <div className='some-info'>
                                <div className='text-color-main movie-name'>{this.state.movieInfo.name}</div>
                                <div
                                    className='text-color-main description'>{this.state.movieInfo.description}</div>
                                <div className='text-color-main'>Когда планируем смотреть?</div>
                                <ChoseTimes movieInfo={this.state.movieInfo}/>
                            </div>
                        </div>
                    : (this.state.movieInfo === null) ?
                        <div className='text-color-main'>Подождите немного</div>
                        : <div className='text-color-main'>Такой страницы нет</div>}
            </Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        isChoseTime: Selectors.checkChoseTime(state),
        movieInfo: Selectors.getMovieInfo(state),
        routing: routerReducer,
        showMsg: state.movieInfo.showMsg,
    };
}

export default withRouter(connect(mapStateToProps)(MovieInfo));






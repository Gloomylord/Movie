import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import * as Selectors from '../store/MoviesInfo/reducer';
import * as Actions from "../store/MoviesInfo/actions";
import './styleFiles/MovieInfo.css'
import ChoseTimes from "./ChoseTimes";
import {
    withRouter,
} from "react-router-dom";
import {routerReducer} from 'react-router-redux';
import cn from 'classnames';


class MovieInfo extends Component {
    refDescription = React.createRef();
    refTextArea = React.createRef();

    state = {
        movieInfo: null,
        description: null,
    };

    changeEditingDescription = () => {
        this.props.dispatch(Actions.changeEditingDescription());
        if (this.props.editingDescription && this.state.movieInfo) {
            this.setState({
                description: this.refTextArea.current.value
            });
            this.props.dispatch(Actions.changeDescription(this.state.movieInfo.id, this.refTextArea.current.value));
        }
    };

    componentDidMount() {
        this.props.dispatch(Actions.changeMovie(this.props.match.params.topicId));
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.movieInfo !== this.props.movieInfo || nextProps.movieInfo !== this.state.movieInfo) {
            this.setState({
                movieInfo: nextProps.movieInfo
            });
        }

    }

    render() {
        return (
            <Fragment>
                {(this.state.movieInfo) ?
                    <div key={this.state.movieInfo.id} className='movie-style ' onClick={this.changeMovie}>
                        <div className='img-background'>
                            <img className='img-style-info img'
                                 src={this.state.movieInfo.url}
                            />
                            {this.props.isAdmin ?
                                <div>
                                    <button className='btn-change-some change-description'
                                            onClick={() => this.props.dispatch(Actions.changeEditingImg())}>
                                        {!this.props.editingImg ? 'Изменить' : "Сохранить"}
                                    </button>
                                </div> : ''
                            }
                        </div>
                        <div className={cn('some-info', {
                            'border-for-dark': this.props.isDark,
                            'border-for-white': !this.props.isDark
                        })}>
                            <div className={cn({
                                'movie-name-dark': this.props.isDark,
                                'movie-name-white': !this.props.isDark
                            })}>{this.state.movieInfo.name}</div>
                            {!this.props.editingDescription ?
                                <div ref={this.refDescription}
                                     className={cn('description', {
                                         'text-color-main-dark': this.props.isDark,
                                         'text-color-main-white': !this.props.isDark
                                     })}>
                                    {!this.state.description ? this.state.movieInfo.description : this.state.description}
                                </div> :
                                <textarea
                                    ref={this.refTextArea}
                                    className='description-textarea '
                                    defaultValue={!this.state.description ? this.state.movieInfo.description : this.state.description}>
                                </textarea>
                            }
                            {this.props.isAdmin ?
                                <div>
                                    <button className='btn-change-some change-description'
                                            onClick={this.changeEditingDescription}>
                                        {!this.props.editingDescription ? 'Изменить' : "Сохранить"}
                                    </button>
                                </div> : ''
                            }
                            <div className='end'>
                                <div className={cn('where-watch', {
                                    'text-color-main-dark': this.props.isDark,
                                    'text-color-main-white': !this.props.isDark
                                })}>Когда планируем смотреть?
                                </div>
                                <ChoseTimes movieInfo={this.state.movieInfo} showMessage={this.props.showMessage}/>
                            </div>
                        </div>
                    </div>
                    : (this.state.movieInfo === null) ?
                        <div className={cn({
                            'text-color-main-dark': this.props.isDark,
                            'text-color-main-white': !this.props.isDark
                        })}>Подождите немного</div>
                        : <div className={cn({
                            'text-color-main-dark': this.props.isDark,
                            'text-color-main-white': !this.props.isDark
                        })}>Такой страницы нет</div>}
            </Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        isChoseTime: Selectors.checkChoseTime(state),
        movieInfo: Selectors.getMovieInfo(state),
        routing: routerReducer,
        isAdmin: Selectors.checkIsAdmin(state),
        editingDescription: Selectors.checkEditingDescription(state),
        editingImg: Selectors.checkEditingImg(state),
        isDark: Selectors.checkIsDark(state),
    };
}

export default withRouter(connect(mapStateToProps)(MovieInfo));






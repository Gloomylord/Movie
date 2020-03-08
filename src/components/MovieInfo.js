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
import {checkEditingDescription} from "../store/MoviesInfo/reducer";


class MovieInfo extends Component {
    refDescription = React.createRef();
    refTextArea = React.createRef();

    state = {
        movieInfo: null,
        description: null,
    };

    changeEditingDescription = () => {
        this.props.dispatch(Actions.changeEditingDescription());
        if(this.props.editingDescription && this.state.movieInfo){
            this.setState({
                description: this.refTextArea.current.value
            })
        }
    };

    componentDidMount() {
        this.props.dispatch(Actions.changeMovie(this.props.match.params.topicId));
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.movieInfo !== this.props.movieInfo || nextProps.movieInfo !== this.state.movieInfo) {
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
                        <div className='img-background'>
                            <img className='img-style-info img'
                                 src={this.state.movieInfo.url}
                            />
                        </div>
                        <div className='some-info'>
                            <div className='text-color-main movie-name'>{this.state.movieInfo.name}</div>
                            {!this.props.editingDescription ?
                                <div ref={this.refDescription}
                                     className='text-color-main description'>
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
                                    <button className='btn-time change-description'
                                            onClick={this.changeEditingDescription}>
                                        {!this.props.editingDescription ? 'Изменить' : "Сохранить"}
                                    </button>
                                </div> : ''
                            }
                            <div className='end'>
                                <div className='text-color-main where-watch'>Когда планируем смотреть?</div>
                                <ChoseTimes movieInfo={this.state.movieInfo}/>
                            </div>
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
        isAdmin: Selectors.checkIsAdmin(state),
        showMsg: state.movieInfo.showMsg,
        editingDescription: checkEditingDescription(state),
    };
}

export default withRouter(connect(mapStateToProps)(MovieInfo));






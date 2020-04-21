import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import * as Selectors from '../store/MoviesInfo/reducer';
import * as Actions from "../store/MoviesInfo/actions";
import './styleFiles/MovieInfo.css'
import ChoseDate from "./EditingSessions/ChoseDate";
import {
    Link,
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

    changeEditingDescription = async () => {
        this.props.dispatch(Actions.changeEditingDescription());
        if (this.props.editingDescription && this.state.movieInfo) {
            this.setState({
                description: this.refTextArea.current.value
            });
            try {
                document.body.style.cursor = 'progress';
                let response = await fetch('/api/description', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify({
                        id: this.props.match.params.topicId,
                        description: this.refTextArea.current.value
                    })
                });
                let resalt = await response.json();
                document.body.style.cursor = 'default';
            } catch (e) {
                console.log('error: ', e);
            }
        }
    };

    async componentDidMount() {
        try {
            document.body.style.cursor = 'progress';
            let response = await fetch('/api/movies', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({id: this.props.match.params.topicId})
            });
            let start = await response.json();
            document.body.style.cursor = 'default';
            if (start.movie[0]) {
                this.setState({
                    movieInfo: start.movie[0]
                })
            }
            this.props.dispatch(Actions.fetchSessions(this.props.match.params.topicId));
        } catch (e) {
            console.log(e);
        }
    }

    formElem = async (e) => {
        e.preventDefault();
        if (this.props.editingImg) {
            document.body.style.cursor = 'progress';
            let body = new FormData(document.getElementById('formElem'));
            body.append('id', this.props.match.params.topicId);
            let response = await fetch('/api/changeimg', {
                method: 'POST',
                body: body
            });
            try {
                let result = await response.json();
                if (result.message==="Файл загружен") {
                    this.props.showMessage(result.message);
                    try {
                        let response = await fetch('/api/movies', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json;charset=utf-8'
                            },
                            body: JSON.stringify({id: this.props.match.params.topicId})
                        });
                        let start = await response.json();
                        document.body.style.cursor = 'default';
                        if (start.movie[0]) {
                            this.setState({
                                movieInfo: start.movie[0]
                            })
                        }
                        this.props.dispatch(Actions.changeEditingImg());
                    } catch (e) {
                        console.log(e);
                    }
                } else {
                    this.props.showMessage('Файл не загружен');
                }
            } catch (err) {
                if (err.name === 'SyntaxError' || err.name === 'TypeError') {
                    this.props.showMessage('Тип файла не подходит, попробуйте jpg или png')
                }
            }
        } else {
            this.props.dispatch(Actions.changeEditingImg());
        }
    };

    render() {
        console.log(this.props.dateTime);
        return (
            <Fragment>
                {(this.state.movieInfo) ?
                    <div key={this.state.movieInfo.id} className='movie-style ' onClick={this.changeMovie}>
                        <div className='img-container'>
                            <div className='img-background'>
                                <Link to={'/movie/' + this.state.movieInfo.id}>
                                    <img className='img-style-info img'
                                         src={this.state.movieInfo.url}
                                    />
                                </Link>
                            </div>
                            {this.props.isAdmin ?
                                <form id="formElem"
                                      ref={this.mainElem}
                                      className='img-div-input'
                                      onSubmit={this.formElem}
                                >
                                    {this.props.editingImg &&
                                    <input className='change-img' type='file' name='img'/>
                                    }
                                    <button className='btn-change-some change-description'
                                            onClick={this.changeImg}
                                            type='submit'>
                                        {!this.props.editingImg ? 'Изменить' : "Сохранить"}
                                    </button>
                                </form> : ''
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
                                {this.props.dateTime && this.props.dateTime.length > 0 ?
                                    <>
                                        <div className={cn('where-watch', {
                                            'text-color-main-dark': this.props.isDark,
                                            'text-color-main-white': !this.props.isDark
                                        })}>Когда планируем смотреть?
                                        </div>
                                    </>
                                    : ''
                                }
                                < ChoseDate movieInfo={this.state.movieInfo}
                                            showMessage={this.props.showMessage}/>

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
        movieInfo: Selectors.getMovieInfo(state),
        routing: routerReducer,
        isAdmin: Selectors.checkIsAdmin(state),
        editingDescription: Selectors.checkEditingDescription(state),
        editingImg: Selectors.checkEditingImg(state),
        isDark: Selectors.checkIsDark(state),
        dateTime: Selectors.getTimesOneMovie(state),
    };
}

export default withRouter(connect(mapStateToProps)(MovieInfo));






import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as Selectors from '../../store/MoviesInfo/reducer';
import * as Actions from '../../store/MoviesInfo/actions'
import '../../iconmonstr-iconic-font-1.3.0/css/iconmonstr-iconic-font.css'
import '../../iconmonstr-iconic-font-1.3.0/css/iconmonstr-iconic-font.min.css'

import './AddMovie.css'
import AddDate from "./AddDate";
import cn from "classnames";


class AddMovie extends Component {

    state = {
        timetable: [],
    };

    addDate = (date) => {
        let start = true;
        this.state.timetable.forEach(value => {
            if (date === value.date) {
                start = false;
            }
        });
        let newTimetable;
        if (start) {
            newTimetable = this.state.timetable.concat([{date: date, times: []}]);
            this.setState({
                timetable: newTimetable
            });
        } else {
            this.props.showMessage('Такая дата уже добавлена');
        }
    };

    deleteDate = (date) => {
        let newTimetable = [];
        this.state.timetable.forEach(value => {
            if (value.date !== date) {
                newTimetable.push(value);
            }
        });
        this.setState({
            timetable: newTimetable
        })
    };

    addTime = (time, date) => {
        let newTimetable = this.state.timetable.map((value) => {
            if (value.date === date) {
                let a = value.times;
                a.push(time);
                return {date: date, times: a}
            } else {
                return value
            }
        });
        this.setState({
            timetable: newTimetable
        })
    };

    deleteTime = (time, date) => {
        let newTimetable = this.state.timetable.map((value) => {
            if (value.date === date) {
                let a = [];
                value.times.forEach((someTime) => {
                    if (time !== someTime) {
                        a.push(someTime);
                    }
                });
                return {date: date, times: a}
            } else {
                return value
            }
        });
        this.setState({
            timetable: newTimetable
        })
    };

    exitAddMovie = () => {
        this.props.dispatch(Actions.changeShowAddMovie());
    };

    formElem = async (e) => {
        e.preventDefault();
        let body = new FormData();
        body.append('timetable', JSON.stringify(this.state.timetable));
        document.body.style.cursor = 'progress';
        let response = await fetch('/api/addmovie', {
            method: 'POST',
            body: body
        });
        try {
            let result = await response.json();
            document.body.style.cursor = 'progress';
            if (result.message === "Файл загружен") {
                this.props.showMessage('Добавлено');
            } else {
                this.props.showMessage(result.message);
                this.props.dispatch(Actions.changeShowAddMovie());
                this.props.dispatch(Actions.fetchMovies());
            }
        } catch (err) {
            console.log(err);
            if (err.name === 'SyntaxError' || err.name === 'TypeError') {
                this.props.showMessage('Тип файла не подходит, попробуйте jpg или png')
            }
        }
    };

    render() {
        return (
            <>
                {this.props.isAdmin ? <form className='new-movie' id='addMovie'
                                            onSubmit={this.formElem}>
                        <i className={cn("im im-x-mark-circle-o x-mark-circle-o pointer", {
                            'text-color-main-dark': this.props.isDark,
                            'text-color-main-white': !this.props.isDark,
                        })}
                           onClick={this.exitAddMovie}/>
                        <div className={cn('title', {
                            'text-color-main-dark': this.props.isDark,
                            'text-color-main-white': !this.props.isDark,
                        })}>Добавление нового фильма
                        </div>
                        <div className='add-movie-div text-color-main'>
                            <div className={cn('input-name', {
                                'text-color-main-dark': this.props.isDark,
                                'text-color-main-white': !this.props.isDark,
                            })}>Название:
                            </div>
                            <input className='add-movie-input' name='name' required placeholder='Movie Name'/>
                        </div>
                        <div className='add-movie-div text-color-main'>
                            <div className={cn('input-name', {
                                'text-color-main-dark': this.props.isDark,
                                'text-color-main-white': !this.props.isDark,
                            })}>Описание:
                            </div>
                            <textarea name='description' required className='description-textarea pad'
                                      placeholder='Description' maxLength='1000'/>
                        </div>
                        <div className='add-movie-div text-color-main'>
                            <div className={cn('input-name', {
                                'text-color-main-dark': this.props.isDark,
                                'text-color-main-white': !this.props.isDark,
                            })}>Загрузите картинку:
                            </div>
                            <input className='add-movie-input ' required name='img' type='file'/>
                        </div>
                        <AddDate addTime={this.addTime}
                                 addDate={this.addDate}
                                 timetable={this.state.timetable}
                                 showMessage={this.props.showMessage}
                                 deleteTime={this.deleteTime}
                                 deleteDate={this.deleteDate}
                        />
                        <div className='btn-add-movie'>
                            <button className="btn-time-admin">Добавить фильм</button>
                        </div>
                    </form> :
                    <div className={cn('title', {
                        'text-color-main-dark': this.props.isDark,
                        'text-color-main-white': !this.props.isDark,
                    })}>Для добавления фильма нужно включить редактирование</div>
                }
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
        addMovie: Selectors.checkAddMovie(state),
        isDark: Selectors.checkIsDark(state),
    };
}

export default connect(mapStateToProps)(AddMovie);

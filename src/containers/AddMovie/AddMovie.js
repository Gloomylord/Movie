import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as Selectors from '../../store/MoviesInfo/reducer';
import * as Actions from '../../store/MoviesInfo/actions'
import '../../iconmonstr-iconic-font-1.3.0/css/iconmonstr-iconic-font.css'
import '../../iconmonstr-iconic-font-1.3.0/css/iconmonstr-iconic-font.min.css'

import './AddMovie.css'
import AddTimetable from "./AddDate";
import SelectRoom from "../SelectRoom";


class AddMovie extends Component {

    state = {
        timetable: [],
    };

    addDate = (date) => {
        let newTimetable;
        newTimetable = this.state.timetable.concat([{date: date, times: []}]);
        this.setState({
            timetable: newTimetable
        })
    };

    deleteDate = (date) => {
        let newTimetable = [];
        this.state.timetable.forEach(value =>{
            if(value.date !== date){
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
                a.push(time)
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
        console.log(this.state.timetable);
        let newTimetable = this.state.timetable.map((value) => {
            if (value.date === date) {
                let a = [];
                value.times.forEach((someTime) => {
                    if (time !== someTime) {
                        a.push(someTime);
                    }
                })
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

    render() {
        return (
            <>
                {this.props.isAdmin ? <div className='new-movie'>
                        <i className="im im-x-mark-circle-o x-mark-circle-o text-color-main pointer"
                           onClick={this.exitAddMovie}/>
                        <div className='text-color-main title'>Добавление нового фильма</div>

                        <div className='add-movie-div text-color-main'>
                            <div className='text-color-main input-name'>Название:</div>
                            <input className='add-movie-input' name='movieName' placeholder='Movie Name'/>
                        </div>
                        <div className='add-movie-div text-color-main'>
                            <div className='text-color-main input-name'>Описание:</div>
                            <textarea className='description-textarea pad' placeholder='Description'/>
                        </div>
                        <div className='add-movie-div text-color-main'>
                            <div className='text-color-main input-name'>Загрузите картинку:</div>
                            <input className='add-movie-input ' type='file'/>
                        </div>
                        <SelectRoom/>
                        <AddTimetable addTime={this.addTime}
                                      addDate={this.addDate}
                                      timetable={this.state.timetable}
                                      showMessage={this.props.showMessage}
                                      deleteTime = {this.deleteTime}
                                      deleteDate = {this.deleteDate}
                        />
                    </div> :
                    <div className='text-color-main title'>Для добавления фильма нужно включить редактирование</div>
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

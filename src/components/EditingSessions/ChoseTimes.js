import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import * as Selectors from '../../store/MoviesInfo/reducer';
import * as Actions from "../../store/MoviesInfo/actions";
import './ChoseTime.css'
import '../../iconmonstr-iconic-font-1.3.0/css/iconmonstr-iconic-font.css'
import '../../iconmonstr-iconic-font-1.3.0/css/iconmonstr-iconic-font.min.css'
import cn from "classnames";
import TimeButton from "./TimeButton";

class ChoseTimes extends Component {
    state = {
        id: this.props.movieInfo.id,
        time: '00:00',
        date: this.props.date,
        editingTime: false,
    };

    onChange = (e) => {
        this.setState({time: e.target.value});
    };

    deleteTime = async () => {
        document.body.style.cursor = 'progress';
        let response = await fetch('/api/deletetime', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                id: this.state.id,
                time: this.state.time,
                date: this.state.date,
            })
        });
        let resalt = await response.json();
        document.body.style.cursor = 'default';
        this.props.dispatch(Actions.deleteDateTimeOneMovie(this.state.time, this.state.date))
    };

    addTime = async () => {
        let {time} = this.state;
        if (time) {
            let start = true;
            this.props.times.forEach((value) => {
                if (value.date === this.state.date && this.state.time === value.time + ':00') {
                    start = false;
                }
            });
            if (start) {
                this.props.dispatch(Actions.addDateTimeOneMovie(time + ':00', this.state.date));
                document.body.style.cursor = 'progress';
                let response = await fetch('/api/datetime', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify({
                        id: this.state.id,
                        time: this.state.time,
                        date: this.state.date,
                    })
                });
                this.setState({time: '00:00'});
                let resalt = await response.json();
                document.body.style.cursor = 'default';
                this.props.dispatch(Actions.fetchSessions(this.state.id));
            } else {
                this.props.showMessage('Такое время уже есть');
            }
        } else {
            this.props.showMessage('Введите данные');
        }
    };

    changeEditingTime = () => {
        this.setState({
            editingTime: !this.state.editingTime
        })
    };

    render() {
        let times;
        if (this.props.times.length>0) {
            times = this.props.times.map((value) => {
                if (value.date === this.state.date && !(value.time === null)) {
                    return <TimeButton time={value.time}
                                       date={value.date}
                                       id={this.state.id}
                    />
                } else {
                    return null
                }
            });
        } else {
            if(this.props.isAdmin) {
                times = <div className={cn({
                    'text-color-main-dark': this.props.isDark,
                    'text-color-main-white': !this.props.isDark
                })}>Добавьте время</div>
            }
        }

        return (<div className=' text-color-main data-time'>
                <div className={cn('date-style', {
                    'text-color-date-dark': this.props.isDark,
                    'text-color-main-white': !this.props.isDark
                })}>{'Дата ' + this.state.date}
                </div>
                <div className='time-div'>
                    {times}
                    {this.props.isAdmin ?
                        !this.state.editingTime ?
                            <button key='will add' className='btn-change-some  btn-time-add pointer'
                                    onClick={this.changeEditingTime}>
                                <i key='will add' className="im im-plus time-add"/>
                            </button> : <div className='div-change-time'>
                                <input type='time' key='hour' value={this.state.time} onChange={this.onChange}
                                       className='time-input'/>
                                <button className='btn-change-some pointer'
                                        onClick={this.addTime}>
                                    <i className="im im-check-mark check-mark"/>
                                </button>
                                <button key='will add' className='btn-time-add btn-change-some pointer'
                                        onClick={this.changeEditingTime}>
                                    <i key='will add' className="im im-minus time-add"/>
                                </button>
                            </div>
                        : ''
                    }
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        movies: Selectors.getMovies(state),
        isAdmin: Selectors.checkIsAdmin(state),
        editingTime: Selectors.checkEditingTime(state),
        isDark: Selectors.checkIsDark(state),
        times: Selectors.getTimesOneMovie(state),
    };
}

export default connect(mapStateToProps)(ChoseTimes);






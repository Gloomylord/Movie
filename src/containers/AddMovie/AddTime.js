import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import * as Selectors from '../../store/MoviesInfo/reducer';
import '../../iconmonstr-iconic-font-1.3.0/css/iconmonstr-iconic-font.min.css';
import '../../iconmonstr-iconic-font-1.3.0/css/iconmonstr-iconic-font.css';

import './AddMovie.css'
import cn from "classnames";



class AddTime extends Component {


    state = {
        date: this.props.date,
        times: this.props.times,
        time: '00:00'
    };

    onChange = (e) => {
        this.setState({time: e.target.value});
    };

    addTime = () => {
        let {time, date} = this.state;
        if (time) {
            this.props.addTime(time, date);
            this.setState({time: '00:00'});
        }
    };

    deleteDate = () => {
        this.props.deleteDate(this.state.date);
    };

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.times !== this.props.times || nextProps.times !== this.state.times) {
            this.setState({
                times: nextProps.times
            });
        }

    }

    render() {
        let times = this.state.times.map((time, index) => {
            if (time.movieName === this.state.movieName) {
                return <Fragment key={time + ' ' + index}>
                    <button className='btn-time-admin'
                            onClick={() => {
                                this.props.deleteTime(time, this.props.date)
                            }}
                    >{time}
                        <i className="im im-x-mark btn-delete-time pointer"/>
                    </button>
                </Fragment>
            } else {
                return null
            }
        });
        return (
            <>
                <div className='time-div-main'>
                    <div className='date mt-20'>
                        <div className={cn('input-name', {
                            'text-color-main-dark': this.props.isDark,
                            'text-color-main-white': !this.props.isDark,
                        })}>Расписание на {this.state.date}</div>
                        <button className='btn-change-some  btn-time-add pointer'
                                type='button'
                                onClick={this.deleteDate}>
                            <i className="im im-minus-circle time-add"/>
                        </button>
                    </div>
                    <div className='date'>
                        <div className={cn('input-name', {
                            'text-color-main-dark': this.props.isDark,
                            'text-color-main-white': !this.props.isDark,
                        })}>Добавить время сеанса</div>
                        <input value={this.state.time} onChange={this.onChange} className='add-movie-input time-pos'
                               type='time'/>
                        <button className='btn-change-some  btn-time-add pointer none-margin'
                                type='button'
                                onClick={this.addTime}>
                            <i className="im im-plus time-add"/>
                        </button>
                    </div>
                    <div className='date-times'>
                        {times}
                    </div>
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
        addMovie: Selectors.checkAddMovie(state),
        isDark: Selectors.checkIsDark(state),
    };
}

export default connect(mapStateToProps)(AddTime);

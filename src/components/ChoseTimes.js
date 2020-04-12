import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import * as Selectors from '../store/MoviesInfo/reducer';
import * as Actions from "../store/MoviesInfo/actions";
import './styleFiles/ChoseTime.css'
import '../iconmonstr-iconic-font-1.3.0/css/iconmonstr-iconic-font.css'
import '../iconmonstr-iconic-font-1.3.0/css/iconmonstr-iconic-font.min.css'
import {
    Link,
} from "react-router-dom";
import times from "../store/MoviesInfo/times";
import cn from "classnames";

class ChoseTimes extends Component {
    state = {
        movieName: this.props.movieInfo.name,
        id: this.props.movieInfo.id,
        time: '00:00'
    };

    onChange = (e) => {
        this.setState({time: e.target.value});
    };

    addTime = () => {
        let {time} = this.state;
        if (time) {
            console.log(time);
            this.props.dispatch(Actions.addTime(time, this.state.movieName));
            this.setState({time: '00:00'})
        } else {
            this.props.showMessage('Введите данные');
        }
    };

    changeEditingTime = () => {
        this.props.dispatch(Actions.changeEditingTime());
    };

    render() {


        let times = this.props.times.map((time) => {
            if (time.movieName === this.state.movieName) {
                return <Fragment key={time.time}>
                    {!this.props.isAdmin ?
                        <Link to={'reservation/' + this.state.id + '/' + time.time} key={time.time}>
                            <button className={cn({
                                'btn-time-dark': this.props.isDark,
                                'btn-time-white': !this.props.isDark,
                            })}
                            >{time.time}
                            </button>
                        </Link> :
                        <button className={cn({
                            'btn-time-dark-admin': this.props.isDark,
                            'btn-time-white-admin': !this.props.isDark,
                        })}
                                key={time.time}
                                onClick={() => this.props.dispatch(Actions.deleteTime(time.time))}
                        >{time.time}
                            {this.props.isAdmin ? <i className="im im-x-mark btn-delete-time pointer"/> : ''}
                        </button>
                    }
                </Fragment>
            } else {
                return null
            }
        });

        return (
            <div className='time-div'>
                {times}
                {this.props.isAdmin ?
                    !this.props.editingTime ?
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
                                    onClick={() => this.props.dispatch(Actions.changeEditingTime())}>
                                <i key='will add' className="im im-minus time-add"/>
                            </button>

                        </div>
                    : ''
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        times: Selectors.getTimes(state),
        movies: Selectors.getMovies(state),
        isAdmin: Selectors.checkIsAdmin(state),
        editingTime: Selectors.checkEditingTime(state),
        isDark: Selectors.checkIsDark(state),
    };
}

export default connect(mapStateToProps)(ChoseTimes);






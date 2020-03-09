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

class ChoseTimes extends Component {
    state = {
        movieName: this.props.movieInfo.name,
        id: this.props.movieInfo.id
    };

    refTime = React.createRef();

    addTime = () => {
        console.log('start:');
        let time = this.refTime.current.value;
        console.log(time);
        if (this.refTime.current.value) {
            console.log(time);
            this.props.dispatch(Actions.addTime(time, this.state.movieName));
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
                            <button className='btn-time'
                            >{time.time}
                            </button>
                        </Link> :
                        <button className='btn-time-admin' key={time.time}
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
        return (<div className='time-div'>
            {times}
            {this.props.isAdmin ?
                !this.props.editingTime ? <button key='will add' className='btn-time btn-time-add pointer'
                                                  onClick={this.changeEditingTime}>
                    <i key='will add' className="im im-plus text-color-main time-add"/>
                </button> : <div className='div-change-time'>
                    <input type='time' maxLength={'2'} key='hour' ref={this.refTime} className='time-input'/>
                    <button className='btn-change-some pointer'
                            onClick={this.addTime}>
                        <i className="im im-check-mark check-mark"/>
                    </button>

                    <button key='will add' className='btn-time-add btn-change-some pointer'
                            onClick={() => this.props.dispatch(Actions.changeEditingTime())}>
                        <i key='will add' className="im im-plus time-add"/>
                    </button>

                </div>
                : ''
            }
        </div>);
    }
}

function mapStateToProps(state) {
    return {
        times: Selectors.getTimes(state),
        movies: Selectors.getMovies(state),
        isAdmin: Selectors.checkIsAdmin(state),
        editingTime: Selectors.checkEditingTime(state),
    };
}

export default connect(mapStateToProps)(ChoseTimes);






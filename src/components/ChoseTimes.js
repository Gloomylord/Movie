import React, {Component} from 'react';
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

    render() {
        let times = this.props.times.map((time) => {
            if (time.movieName === this.state.movieName) {
                return <Link to={'reservation/' + this.state.id + '/' + time.time} key={time.time}>
                    <button className='btn-time'
                            onClick={() => this.props.dispatch(Actions.changeTimeChose(time.time))}
                    >{time.time}</button>
                </Link>
            } else {
                return ''
            }
        });
        return (<div className='time-div'>
            {times}
            { this.props.isAdmin ?
            <button className='btn-time btn-time-add'>
                <i className="im im-plus text-color-main time-add"/>
            </button> :''
            }
        </div>);
    }
}

function mapStateToProps(state) {
    return {
        times: Selectors.getTimes(state),
        movies: Selectors.getMovies(state),
        isAdmin: Selectors.checkIsAdmin(state),
        showMsg: state.movieInfo.showMsg
    };
}

export default connect(mapStateToProps)(ChoseTimes);






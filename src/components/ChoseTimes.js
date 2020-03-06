import React, {Component} from 'react';
import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import * as Selectors from '../store/MoviesInfo/reducer';
import * as Actions from "../store/MoviesInfo/actions";

import './styleFiles/ChoseTime.css'
import './styleFiles/MovieInfo.css'

import {
    Link,
    withRouter,
} from "react-router-dom";

class ChoseTimes extends Component {
    state = {
        movieName: this.props.movieInfo.name,
        id: this.props.movieInfo.id
    };

    render() {
        let times = this.props.times.map((time) => {
            if (time.movieName === this.state.movieName) {
                return <Link to={'reservation/'+this.state.id}>
                    <button className='btn-time'
                            key={time.time}
                            onClick={() => this.props.dispatch(Actions.changeTimeChose())}
                    >{time.time}</button>
                </Link>
            } else {
                return ''
            }
        });
        return (<div className='time-div'>{times}</div>);
    }
}

function mapStateToProps(state) {
    return {
        times: Selectors.getTimes(state),
        movies: Selectors.getMovies(state),
        showMsg: state.movieInfo.showMsg
    };
}

export default connect(mapStateToProps)(ChoseTimes);






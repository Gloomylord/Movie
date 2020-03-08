import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as Selectors from '../store/MoviesInfo/reducer';
import * as Actions from "../store/MoviesInfo/actions";
import {
    withRouter,
} from "react-router-dom";
import {routerReducer} from 'react-router-redux';
import './styleFiles/Reservation.css';

class Reservation extends Component {
    state = {
        movieInfo: null
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
        console.log(`it's me`, this.state.movieInfo);
        return (
            <div className='reservation'>
                {(this.state.movieInfo) ?

                    <div className='reservation-img-background'>
                        <img className='reservation-img'
                             src={this.state.movieInfo.url}
                        />
                    </div> : <div className='text-color-main'>Подождите немного</div>}
                <div className='rows flex'>
                    {this.props.places.map((row) =>
                        <div className='places flex'>
                            <div className='text-color-main center div-place'>Pяд: {row.namber} </div>
                            <div className='place-in-row flex'> {row.placeInRow.map(
                                place => <button key={'place:' + place + '. row:' + row.namber}
                                                 className='btn-place'
                                                 onClick=''
                                >
                                    {place}
                                </button>
                            )}</div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isChoseTime: Selectors.checkChoseTime(state),
        movieInfo: Selectors.getMovieInfo(state),
        routing: routerReducer,
        showMsg: state.movieInfo.showMsg,
        isAdmin: Selectors.checkIsAdmin(state),
        places: Selectors.getPlaces(state),
    };
}

export default withRouter(connect(mapStateToProps)(Reservation));





